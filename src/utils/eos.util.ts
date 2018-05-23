import store from '@/store';
import Eos from 'eosjs';
import { prop, path } from 'ramda'

export const getEos = () => {
	if(!store.state.network) return null;
	return Eos.Localnet({
		httpEndpoint:`http://${store.state.network.host}:${store.state.network.port}`
	});
};

const getEosioTable = (table: any, limit = 500) => {
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
		.then(path(['rows', 0]))
		.catch(() => null);
};

export const getChainProducers = () => {
	return getEosioTable('producers')
		.then(prop('rows'))
		.catch(() => []);
};
