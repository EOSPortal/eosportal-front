<template>
    <div id="app" :class="theme">
        <section class="app-container">
            <Menu></Menu>
            <router-view class="content"/>
            <Footer></Footer>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Menu from './components/Menu.vue';
    import Footer from './components/Footer.vue';
    import {mapState} from "vuex";

    @Component({
        components: {
            Menu,
            Footer
        },
        computed: mapState(["theme"]),
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
	@import 'assets/sass/app';
</style>
