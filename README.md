# EOS Voting Portal - Frontend


This is the frontend for the EOS Voting Portal.

Here is the backend project: [eosportal-api](https://github.com/zrts/eosportal-api)

## Table of contents

* [Installation](#installation)
    * [Cloning and dependencies](#cloning-and-dependencies)
    * [Scripts](#scripts)
* [Contributing](https://github.com/EOSPortal/eosportal-front/blob/master/CONTRIBUTING.md)
* [Dependencies](#dependencies)


## Installation

### Cloning and Dependencies

**Clone the repo and install dependencies.**

`git clone https://github.com/EOSPortal/eosportal-front.git`

**Cd into the project.**

`cd eosportal-front`

**Install all it's dependencies.**

`npm i` or `npm install`

### Scripts

**Serve the development environment.**

`npm run serve`  this will start a development server.

**Production Build**

`npm run build`  this will build the package for production and activate the service worker.
To test the production build install [python](https://www.python.org/downloads/) and navigate into the `cd dist` folder.
to run the production version `python -m http.server` will start a server


## Dependencies

* [bootstrap 4.0](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
* [Vue-Bootstrap](https://bootstrap-vue.js.org/docs/)
* [Ramda](https://ramdajs.com/)
* [vue](https://vuejs.org/)
* [vue class component](https://github.com/vuejs/vue-class-component)
* [vue property decorator](https://github.com/kaorun343/vue-property-decorator)
* [vue router](https://router.vuejs.org/en/)
* [vuex](https://vuex.vuejs.org/en/)