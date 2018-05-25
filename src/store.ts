import Vue from "vue";
import Vuex from "vuex";
import { getChains} from "./api";
import * as urlUtils from "@/utils/url.util";

import Eos from 'eosjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chains: [],
    chainData:null,
    theme:'dark',

    producers:[],

    // Scatter related
    network:null,
    scatter:null,
  },


  mutations: {
    setTheme(state:any, theme:string) {
      state.theme = theme;
    },
    setChainData(state:any, chainData:any){
      state.chainData = chainData;
    },
    setChains(state: any, chains: any[]) {
      state.chains = chains
    },
    setProducers(state: any, producers: any[]) {
      state.producers = producers
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
    setTheme({ commit }, theme:string) {
      commit("setTheme", theme);
    },
    async getChains({ commit, state }) {
      commit("setChains", await getChains());
    },
    setChainData({ commit, state }, chainData:any) {
      commit("setChainData", chainData);
    },
    setScatter({ commit, state }, scatter:any) {
      commit("setScatter", scatter);
    },
    setProducers({ commit, state }, producers:any[]) {
      commit("setProducers", producers);
    },

    // Scatter related
    // -----------------------------------------
    setNetwork({ commit }, networkString:string | null){
      if(networkString === null) return commit('setNetwork', null);
      const {host, port} = urlUtils.urlToHostPort(networkString);
      commit('setNetwork', { blockchain:'eos', host, port});
    },
    login({state}){
      if(!state.scatter) return false;
      if(!state.network) return false;
      return state.scatter.getIdentity({accounts:[state.network]});
    },
    logout({state}){
      if(!state.scatter) return false;
      if(!state.scatter.identity) return false;
      return state.scatter.forgetIdentity();
    },
    getScatterEos({ state }){
      if(!state.network) return null;
      return state.scatter.eos( state.network, Eos.Localnet, {} )
    },
  },

  getters:{
    identity:state => state.scatter.identity,
    account:state => state.scatter.identity.accounts.find((account: any) => account.blockchain === 'eos'),
    orderedProducers:state => state.producers.sort((a: any,b: any) => b.total_votes - a.total_votes),
  }
});
