<template>

    <div id="app">
        <Header></Header>
        <router-view/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Header from './components/Header';

    @Component({
        components: {
            Header
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">

</style>
