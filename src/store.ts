import Vue from "vue";
import Vuex from "vuex";
import { getAllProducers } from "./api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chainName: "prototype",
    producers: []
  },
  mutations: {
    setChain(state: any, chainName: string) {
      state.chainName = chainName;
    },
    setProducers(state: any, producers: Array<any>) {
      state.producers = producers;
    }
  },
  actions: {
    async getProducers({ commit, state }) {
      commit("setProducers", (await getAllProducers(state.chainName)).data);
    }
  }
});
