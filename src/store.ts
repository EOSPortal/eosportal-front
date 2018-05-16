import Vue from "vue";
import Vuex from "vuex";
import { getAllProducers , getChains} from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chainName: "",
    producers: [],
    chains: []
  },
  mutations: {
    setChain(state: any, chainName: string) {
      state.chainName = chainName;
    },
    setProducers(state: any, producers: Array<any>) {
      state.producers = producers;
    },
    setChains(state: any, chains: any[]) {
      state.chains = chains
    }
  },
  actions: {
    async getProducers({ commit, state }) {
      commit("setProducers", await getAllProducers(state.chainName));
    },
    async getChains({ commit, state }) {
      commit("setChains", await getChains());
    }

  }
});
