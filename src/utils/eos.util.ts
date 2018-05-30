import store from '@/store';
import Eos from 'eosjs';
const {format} = Eos.modules;
import { prop, path } from 'ramda'

export const getEos = () => {
	if(!store.state.network) return null;
	return Eos.Localnet({
		httpEndpoint:`http://${store.state.network.host}:${store.state.network.port}`
	});
};

export const getScatterEos = () => {
	console.log('chaind', store.getters.chainId);
	if(!store.state.scatter || !store.state.network) return null;
	return store.state.scatter.eos( store.state.network, Eos.Localnet, {
		chainId:store.getters.chainId
	});
};

const getEosioTable = (table:any, limit:number = 500, index:string = '', table_key:string = '') => {
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
		.then(path(['rows', 0]))
		.catch(() => null);
};

export const getChainProducers = () => {
	return getEosioTable('producers')
		.then(prop('rows'))
		.catch(() => []);
};

export const getVoter = async (accountName:string) => {
	if(!accountName || !accountName.length) return null;
	return getEosioTable('voters', 1, format.encodeName(accountName, false))
		.then((res:any) => res.rows[0] || null)
		.catch(null);
};

export const getAccount = async (accountName:string) => {
	if(!accountName || !accountName.length) return null;
	return getEos().getAccount(accountName);
};

export const getBalances = async (accountName:string) => {
	if(!accountName || !accountName.length) return null;
	return await getEos().getTableRows({
		json:true,
		code:'eosio.token',
		scope:accountName,
		table:'accounts',
	}).then((res:any) => res.rows.map((b:any) => b.balance)).catch([])
};

export const voteFor = async (userAccountName:string, producersArray:Array<string>) => {
	const sorted:Array<string> = producersArray.sort((a:any, b:any) => parseInt(format.encodeName(a, false)) - parseInt(format.encodeName(b, false)));
	return getScatterEos().voteproducer(userAccountName, '', sorted);
};

export const delegateAll = async (accountName:string, token:string = 'EOS') => {
	const balances = await getBalances(accountName);
	const stakableTokenBalance = balances.find((b:any) => b.split(' ')[1] === token) || `0.0000 ${token}`;
	const decimals = stakableTokenBalance.replace(` ${token}`,'').split('.')[1].length;
	const division = (stakableTokenBalance.replace(` ${token}`,'')/2).toFixed(decimals);
	const half = `${division} ${token}`;
	return await getScatterEos().delegatebw(accountName, accountName, half, half, 0);
};

export const getBlock = (blockNumber: number) => getEos().getBlock({block_num_or_id: blockNumber})

export const getInfo = () => getEos().getInfo({})
