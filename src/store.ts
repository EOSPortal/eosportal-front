import Vue from "vue";
import Vuex from "vuex";
import { getAllProducers , getChains} from "./api";

import Eos from 'eosjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chainId: "",
    producers: [],
    chains: [],
    chainData:null,

    // Scatter related
    network:null,
    scatter:null,
  },


  mutations: {
    setChain(state: any, chainId: number) {
      state.chainId = chainId;
    },
    setChainData(state:any, chainData:any){
      state.chainData = chainData;
    },
    setProducers(state: any, producers: Array<any>) {
      state.producers = producers;
    },
    setChains(state: any, chains: any[]) {
      state.chains = chains
    },

    // Scatter related
    // -----------------------------------------
    setNetwork(state: any, network: any) {
      state.network = network;
    },
    setScatter(state: any, scatter: any) {
      state.scatter = scatter;
    }
  },


  actions: {
    async getProducers({ commit, state }) {
      commit("setProducers", await getAllProducers(state.chainId));
    },
    async getChains({ commit, state }) {
      commit("setChains", await getChains());
    },
    async setChainData({ commit, state }, chainData:any) {
      commit("setChainData", chainData);
    },
    async setScatter({ commit, state }, scatter:any) {
      commit("setScatter", scatter);
    },

    // Scatter related
    // -----------------------------------------
    setNetwork({ commit }, networkString:string){
      if(networkString === null) return commit('setNetwork', null);

      const networkParts:Array<string> = networkString.replace('http://', '').replace('https://', '').split('/')[0].split(':');
      const host = networkParts[0];
      const port = networkParts[1] || 80;
      commit('setNetwork', { blockchain:'eos', host, port});
    },
    async login({state}){
      if(!state.scatter) return false;
      if(!state.network) return false;
      return state.scatter.getIdentity({accounts:[state.network]});
    },
    async logout({state}){
      if(!state.scatter) return false;
      if(!state.scatter.identity) return false;
      return scatter.forgetIdentity();
    },
    getScatterEos({ state }){
      if(!state.network) return null;
      return state.scatter.eos( state.network, Eos.Localnet, {} )
    },
  },

  getters:{
    identity:state => state.scatter.identity,
    account:state => state.scatter.identity.accounts.find(account => account.blockchain === 'eos'),
  }
});
