import Vue from 'vue';
import Router from 'vue-router';

/**
 * Importing all chains related views
 */
import Chains from './views/Chains.vue';

/**
 * Importing specific chain related view
 */
import Chain from './views/Chain.vue';

/**
 * importing home view
 */
import Home from './views/Home.vue';

/**
 * Importing all block related views
 */
import Blocks from './views/Blocks.vue';

/**
 * Importing all producers related views
 */
import Producers from './views/Producers.vue';

/**
 * importing infos related view
 */
import Infos from './views/Infos.vue';

/**
 * importing about view
 */
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  routes: [
      /**
       * @description home component route
       */
      {
          path: '/',
          name: 'home',
          component: Home
      },
      /**
       * @description chains component route
       */
      {
          path: '/chains',
          name: 'chains',
          component: Chains
      },
      {
          path: '/:chainName',
          component: Chain,
          children: [
              /**
               * loads as default view
               */
              {
                  path: '',
                  name: 'infos',
                  component: Infos
              },
              {
                  path: 'producers',
                  name: 'producers',
                  component: Producers
              },
              {
                  path: 'blocks',
                  name: 'blocks',
                  component: Blocks
              }
          ]
      },
      /**
       * @description about component route can be used to display information on how to vote.
       */
      {
          path: '/about',
          name: 'about',
          component: About
      },
      /**
       * @description if no route matched the user will be send back to the home page.
       */
      {
          path: '*',
          redirect: '/' // might change this to a 404 page not found route
      }
  ]
})
