import store from '@/store';
import Eos from 'eosjs';
const {format} = Eos.modules

export const getEos = () => {
	if(!store.state.network) return null;
	return Eos.Localnet({
		httpEndpoint:`http://${store.state.network.host}:${store.state.network.port}`
	});
};

export const getScatterEos = () => {
	if(!store.state.scatter || !store.state.network) return null;
	return store.state.scatter.eos( store.state.network, Eos.Localnet, {});
};

const getEosioTable = (table, limit = 500, index = '', table_key = '') => {
	const eos = getEos();
	if(!eos) return null;

	const bounds = index ? {lower_bound:index, upper_bound:typeof index === 'string' ? '' : index+limit} : {};

	return eos.getTableRows(Object.assign({
		json:true,
		code:'eosio',
		scope:'eosio',
		table,
		table_key,
		limit
	}, bounds))
};

export const getChainState = () => {
	return getEosioTable('global', 1)
		.then(res => res.rows[0])
		.catch(() => null);
};

export const getChainProducers = () => {
	return getEosioTable('producers')
		.then(res => res.rows)
		.catch(() => []);
};

export const getVoter = async accountName => {
	if(!accountName || !accountName.length) return null;
	return getEosioTable('voters', 1, format.encodeName(accountName))
		.then(x => x.rows[0] || null)
		.catch(null);
};

export const getAccount = async accountName => {
	if(!accountName || !accountName.length) return null;
	return getEos().getAccount(accountName);
};

export const getBalances = async accountName => {
	if(!accountName || !accountName.length) return null;
	return await getEos().getTableRows({
		json:true,
		code:'eosio.token',
		scope:accountName,
		table:'accounts',
	}).then(res => res.rows.map(b => b.balance)).catch([])
};

export const voteFor = async (userAccountName, producersArray) => {
	console.log('useracc', userAccountName);
	return getScatterEos().voteproducer(userAccountName, '', producersArray);
};

export const delegateAll = async (accountName, token = 'EOS') => {
	// const account = await getAccount(accountName);
	const balances = await getBalances(accountName);
	console.log('balances', balances);
	const stakableTokenBalance = balances.find(b => b.split(' ')[1] === token) || `0.0000 ${token}`;
	const division = stakableTokenBalance.replace(` ${token}`,'')/2;
	const half = `${division} ${token}`;
	return await getScatterEos().delegatebw(accountName, accountName, half, half, 0);
};
