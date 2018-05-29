import Vue from "vue";
import Vuex from "vuex";
import {getChains} from "./api";
import * as urlUtils from "@/utils/url.util";
import {findLast, propEq} from "ramda"
import {getAccount, getChainProducers, getChainState, getVoter} from "@/utils/eos.util";

import Eos from 'eosjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chains: [],
    chainData:null,
    theme:'light',

    voter:null,
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
    setTheme({ commit }, theme:string) {
      commit("setTheme", theme);
    },
    async loadChains({ commit, state }) {
      commit("setChains", await getChains());
    },
    async loadChainData({ commit, state }) {
      commit("setChainData", await getChainState());
    },
    removeChainData({ commit, state }) {
      commit("setChainData", null);
    },
    setScatter({ commit, state }, scatter:any) {
      commit("setScatter", scatter);
    },
    async loadProducers({ commit, state }) {
      commit("setProducers", await getChainProducers());
    },
    removeProducers({ commit, state }) {
      commit("setProducers", []);
    },
    setVoter({ commit, state }, voter:any) {
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
    logout({state}){
      if(!state.scatter) return false;
      if(!state.scatter.identity) return false;
      return state.scatter.forgetIdentity();
    },
  },

  getters:{
    identity:(state:any) => state.scatter ? state.scatter.identity : null,
    account:(state:any) => state.scatter && state.scatter.identity ? state.scatter.identity.accounts.find((account:any) => account.blockchain === 'eos') : null,
    orderedProducers:(state:any) => state.producers.sort((a:any,b:any) => b.total_votes - a.total_votes),
    getProducerByOwner: state => (owner: string) => findLast(propEq('owner', owner))(state.producers) 
  }
});
