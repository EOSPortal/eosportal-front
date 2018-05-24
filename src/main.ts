import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters'

Vue.config.productionTip = false;

declare global {
  interface Window { scatter: any; }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

document.addEventListener('scatterLoaded', () => {

  window.scatter.requireVersion(4.0);
  store.dispatch('setScatter', window.scatter);
  window.scatter = null;

});
