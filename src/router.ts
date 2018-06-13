import Vue from 'vue';
import Router from 'vue-router';

import Help from './views/Help.vue';
import Chains from './views/Chains.vue';
import Chain from './views/Chain.vue';
import VotingPower from './views/chain/VotingPower.vue';
import Producer from './views/chain/Producer.vue';
import Producers from './views/chain/Producers.vue';
import Info from './views/chain/Info.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({ mode:'history',
  routes: [
      {
          path: '/',
          name: 'chains',
          redirect: '/chain/12/producers'
      },
      {
          path: '/help',
          name: 'help',
          component: Help
      },
      {
          path: '/chain/:chainId',
          component: Chain,
          children: [
              {
                  path: '',
                  name: '',
                  redirect: '/chain/:chainId/producers'
              },
              {
                  path: 'power',
                  name: 'power',
                  component: VotingPower
              },
              {
                  path: 'producers',
                  name: 'producers',
                  component: Producers
              },
              {
                  path: 'producers/:producer',
                  name: 'producer',
                  component: Producer
              },
              {
                  path: 'info',
                  name: 'info',
                  component: Info
              }
          ]
      },
      {
          path: '/about',
          name: 'about',
          component: About
      },
      {
          path: '*',
          redirect: '/' // might change this to a 404 page not found route
      }
  ]
})
