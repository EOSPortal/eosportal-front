import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters'
import i18n from './locales'

Vue.config.productionTip = false;

declare global {
  interface Window { scatter: any; }
}

const lang = store.state.language;
if (lang) {
  i18n.locale = lang;
}

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

document.addEventListener('scatterLoaded', () => {

  window.scatter.requireVersion(4.0);
  store.dispatch('setScatter', window.scatter);
  window.scatter = null;

});
