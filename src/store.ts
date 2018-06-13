import Vue from "vue";
import Vuex from "vuex";
import {getChains} from "./api";
import * as urlUtils from "@/utils/url.util";
import {findLast, propEq} from "ramda"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chains: [],
    chainData:null,
    chainState:null,
    theme:'light',

    voter:null,
    producers:[],

    // Scatter related
    network:null,
    scatter:null,

    chainLoaded:false,
  },


  mutations: {
    setTheme(state:any, theme:string) {
      state.theme = theme;
    },
    setChainLoaded(state:any, loaded:boolean){
      state.chainLoaded = loaded;
    },
    setChainData(state:any, chainData:any){
      state.chainData = chainData;
    },
    setChainState(state:any, chainState:any){
      state.chainState = chainState;
    },
    setChains(state: any, chains: any[]) {
      state.chains = chains
    },
    setProducers(state: any, producers: any[]) {
      state.producers = producers.map(producer => {
        const stateProducer:any = state.producers.find((p:any) => p.owner === producer.owner);
        if(stateProducer) {
          producer.bpStandardInfo = stateProducer.bpStandardInfo;
          producer.country_code = stateProducer.country_code;
        }
        return producer;
      });
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
    async getChains({ commit, state }) {
      commit("setChains", await getChains());
    },
    setChainLoaded({ commit, state }, loaded:boolean) {
      commit("setChainLoaded", loaded);
    },
    setChainData({ commit, state }, chainData:any) {
      commit("setChainData", chainData);
    },
    async setChainState({ commit, state }, chainState:any) {
      commit("setChainState", chainState);
    },
    async setScatter({ commit, state }, scatter:any) {
      commit("setScatter", scatter);
    },
    setProducers({ commit, state }, producers:any[]) {
      commit("setProducers", producers);
    },
    setVoter({ commit, state }, voter:any) {
      commit("setVoter", voter);
    },

    // Scatter related
    // -----------------------------------------
    setNetwork({ commit, state }, networkString:string | null){
      if(networkString === null) return commit('setNetwork', null);
      const {host, port} = urlUtils.urlToHostPort(networkString);
      commit('setNetwork', { blockchain:'eos', host, port, chainId:state.chainData.chainId});
    },
    async login({state}){
      if(!state.scatter) return false;
      if(!state.network) return false;
      return state.scatter.getIdentity({accounts:[state.network]})
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
    getProducerByOwner: state => (owner: string) => findLast(propEq('owner', owner))(state.producers),
    chainId:state => state.chainData ? state.chainData.chainId : null,
  }
});
