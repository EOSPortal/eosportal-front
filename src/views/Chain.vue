<template>
    <section>
        <ChainNavigation />
        <router-view></router-view>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";
    import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
    import ChainNavigation from '@/components/ChainNavigation.vue';
    import {getAccount, getVoter} from "@/utils/eos.util";

    @Component({
        components: {
            ChainNavigation
        },
        props: {},
        computed: {
            ...mapState(['producers', 'voter']),
            ...mapGetters(['account', 'identity'])
        },
        methods: {
            ...mapActions(["setNetwork", "loadProducers", "loadChainData", "removeProducers", "removeChainData", "logout", "setVoter"])
        }
    })



    export default class Chain extends Vue {
        producers!: Array<any>;
        voter!:any;
        account!:any;
        identity!:any;
        setNetwork!: (networkString:string | null) => void;
        loadProducers!: () => void;
        removeProducers!: () => void;
        loadChainData!: () => void;
        removeChainData!: () => void;
        logout!:() => void;
        setVoter!:(voter:any) => void;

        created() {
            this.initialize();
        }

        destroyed(){
            this.setNetwork(null);
            this.removeChainData();
            this.removeProducers();
            this.setVoter(null);
//            this.logout();
        }

        async initialize(){
            //TODO: Get chain data from id, bind to state, use api url to build network for Scatter

            //this.$route.params.chainId

//            this.setNetwork('http://test.eosys.io:8888/');
//            const test = await getAccount('eosportaltst');
            this.setNetwork('http://bp.blockgenic.io:8888/');
//            const test = await getAccount('lioninjungle');
//            console.log('test', test);
            this.loadChainData();
            this.loadProducers();
        }

        @Watch('account')
        async accountChanged(){
            if(this.account)
                await this.setVoter(await getVoter(this.account.name));
        }
    }
</script>

<style lang="scss">

</style>
