<template>

    <div id="app" :class="theme">
        <section class="app-container">
            <Menu></Menu>
            <router-view/>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Menu from './components/Menu.vue';
    import {mapState} from "vuex";

    @Component({
        components: {
            Menu
        },
        computed: mapState(["theme"]),
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
	@import 'assets/sass/app';
</style>
