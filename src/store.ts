import Vue from "vue";
import Vuex from "vuex";
import { getAllProducers , getChains} from "./api";
import * as urlUtils from "@/utils/url.util";

import Eos from 'eosjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chainId: "",
    chains: [],
    chainData:null,
    theme:'dark',

    voter:null,
    producers:[],

    // Scatter related
    network:null,
    scatter:null,
  },


  mutations: {
    async setTheme(state:any, theme:string) {
      state.theme = theme;
    },
    setChain(state: any, chainId: number) {
      state.chainId = chainId;
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
    setVoter(state: any, voter: any) {
      state.voter = voter
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
    async setTheme({ commit }, theme:string) {
      commit("setTheme", theme);
    },
    async setChain({ commit, state }, chain:any) {
      commit("setChain", chain);
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
    async setProducers({ commit, state }, producers:any[]) {
      commit("setProducers", producers);
    },
    async setVoter({ commit, state }, voter:any) {
      commit("setVoter", voter);
    },

    // Scatter related
    // -----------------------------------------
    setNetwork({ commit }, networkString:string | null){
      if(networkString === null) return commit('setNetwork', null);
      const {host, port} = urlUtils.urlToHostPort(networkString);
      commit('setNetwork', { blockchain:'eos', host, port});
    },
    async login({state}){
      if(!state.scatter) return false;
      if(!state.network) return false;
      await state.scatter.suggestNetwork(state.network);
      return state.scatter.getIdentity({accounts:[state.network]});
    },
    async logout({state}){
      if(!state.scatter) return false;
      if(!state.scatter.identity) return false;
      return state.scatter.forgetIdentity();
    },
  },

  getters:{
    identity:state => state.scatter ? state.scatter.identity : null,
    account:state => state.scatter && state.scatter.identity ? state.scatter.identity.accounts.find(account => account.blockchain === 'eos') : null,
    orderedProducers:state => state.producers.sort((a,b) => b.total_votes - a.total_votes),
  }
});
