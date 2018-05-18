<template>
    <b-nav pills class="d-flex justify-content-center p-2 m-2">
        <b-nav-item exact-active-class="active" :to="{ name: 'infos' }" exact>Chain Info</b-nav-item>
        <b-nav-item exact-active-class="active" :to="{ name: 'blocks' }">Blocks</b-nav-item>
        <b-nav-item exact-active-class="active" :to="{ name: 'producers' }">Producers</b-nav-item>
    </b-nav>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    /**
     * Bootstrap-vue components
     */
    import bNav from 'bootstrap-vue/es/components/nav/nav';
    import bNavItem from 'bootstrap-vue/es/components/nav/nav-item';

    @Component({
        components: {
            bNav,
            bNavItem
        }
    })

    export default class ChainNavigation extends Vue {

    }
</script>

<style lang="scss">

</style>