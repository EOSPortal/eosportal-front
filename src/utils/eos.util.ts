import store from '@/store';
import Eos from 'eosjs';

export const getEos = () => {
	if(!store.state.network) return null;
	return Eos.Localnet({
		httpEndpoint:`http://${store.state.network.host}:${store.state.network.port}`
	});
};

const getEosioTable = (table, limit = 500) => {
	const eos = getEos();
	if(!eos) return null;
	return eos.getTableRows({
		json:true,
		code:'eosio',
		scope:'eosio',
		table,
		limit
	})
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
