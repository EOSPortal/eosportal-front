import Vue from 'vue';
import Router from 'vue-router';

/**
 * importing home view
 */
import Home from './views/Home.vue';

/**
 * Importing all block related views
 */
import Blocks from './views/Blocks.vue';
import Block from './views/Block.vue';

/**
 * Importing all producers related views
 */
import Producers from './views/Producers.vue';
import Producer from './views/Producer.vue';

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
       * @description blocks component route with child route to an individual block
       */
      {
          path: '/blocks',
          name: 'blocks',
          component: Blocks,
          children: [
              {
                  path: 'block/:id',
                  component: Block
              }
          ]
      },
      /**
       * @description producers component route with child route to an individual producers
       */
      {
          path: '/producers',
          name: 'producers',
          component: Producers,
          children: [
              {
                  path: 'producer/:id',
                  component: Producer,
                  /**
                   * @description route to all blocks by this producer
                   */
                  children: [
                      {
                          path: '/blocks',
                          component: Blocks
                      }
                  ]
              }
          ]
      },
      /**
       * @description infos component route
       */
      {
          path: '/infos',
          name: 'infos',
          component: Infos
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
