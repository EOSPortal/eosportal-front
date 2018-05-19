<template>
    <div class="container">
        <ChainNavigation />
        <div class="row">
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import { mapState, mapActions, mapMutations } from "vuex";

    import ChainNavigation from '../components/ChainNavigation';

    @Component({
        components: {
            ChainNavigation
        },
        props: {},
        computed: mapState(["producers"]),
        methods: {
            ...mapActions(["getProducers"]),
            ...mapMutations(["setChain"])
        }
    })
    export default class Chain extends Vue {
        producers: Array<any>;
        chainId: number;
        getProducers: () => void;
        setChain: (chainId: number) => void;

        created() {
            this.setNewChain(this.$route.params.chainId);
        }

        setNewChain(_chainId: number) {
            this.setChain(_chainId);
            this.getProducers();
        }
    }
</script>

<style lang="scss">

</style>
