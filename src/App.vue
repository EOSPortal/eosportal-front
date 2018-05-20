<template>

    <div id="app">
        <section class="app-container">
            <Menu></Menu>
            <router-view/>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Menu from './components/Menu';

    @Component({
        components: {
            Menu
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
	@import 'assets/sass/app';
</style>
