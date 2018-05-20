<template>
    <section>
        <section class="contain">
            <router-link exact-active-class="active" :to="{ name: 'power' }">Voting Power</router-link>
            <router-link exact-active-class="active" :to="{ name: 'producers' }">Producers</router-link>
            <router-link exact-active-class="active" :to="{ name: 'info' }" exact>Chain Info</router-link>
            <router-link exact-active-class="active" :to="{ name: 'blocks' }">Blocks</router-link>
        </section>
        <hr/>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    /**
     * Bootstrap-vue components
     */

    @Component({
        components: {
        	
        }
    })

    export default class ChainNavigation extends Vue {

    }
</script>

<style lang="scss">

</style>