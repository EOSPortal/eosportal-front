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
        computed: mapState(["chainName", "producers"]),
        methods: {
            ...mapActions(["getProducers"]),
            ...mapMutations(["setChain"])
        }
    })
    export default class Chain extends Vue {
        producers: Array<any>;
        chainName: string;
        getProducers: () => void;
        setChain: (chainName: string) => void;

        created() {
            this.setNewChain(this.$route.params.chainName);
        }

        setNewChain(newChain: string) {
            this.setChain(newChain);
            this.getProducers();
        }
    }
</script>

<style lang="scss">

</style>
