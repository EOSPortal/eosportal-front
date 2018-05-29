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
    import {getAccount, getChainProducers, getChainState, getVoter} from "@/utils/eos.util";
    import {getChain} from "@/api";

    @Component({
        components: {
            ChainNavigation
        },
        props: {},
        computed: {
            ...mapState(['producers', 'voter', 'network']),
            ...mapGetters(['account', 'identity'])
        },
        methods: {
            ...mapActions(["setNetwork", "setProducers", "setChainData", "logout", "setVoter"])
        }
    })



    export default class Chain extends Vue {
        producers!: Array<any>;
        voter!:any;
        account!:any;
        identity!:any;
        setNetwork!: (networkString:string | null) => void;
        setProducers!: (producers:any[]) => void;
        setChainData!: (chainData:any) => void;
        logout!:() => void;
        setVoter!:(voter:any) => void;
        producerTimer:NodeJS.Timer | null = null;

        created() {
            this.initialize();
        }

        destroyed(){
            this.setNetwork(null);
            this.setChainData(null);
            this.setProducers([]);
            this.setVoter(null);
            this.logout();
        }

        async initialize(){
            //TODO: Get chain data from id, bind to state, use api url to build network for Scatter

            await this.bindNetwork();

            // No network found
            if(!this.network) return this.$router.push({path:'/'});
//
            await this.setChainData(await getChainState());
            this.recurseProducers();

        }

        async bindNetwork(chainData:any|null = null){
        	if(!chainData) chainData = await getChain(this.$route.params.chainId);
            if(!chainData) return this.$router.push({path:'/'});

            const originalLength:number = chainData.nodes.length;
            let network:null | string = null;
            while(!network && chainData.nodes.length){
                const node:string = chainData.nodes[0];
                network = await fetch(`${node}/v1/chain/get_info`).then(() => node).catch(() => null);
                if(!network) chainData.nodes.shift();
            }

            //TODO: Notify API of stale nodes.
            if(chainData.nodes.length !== originalLength){
            }

            //TODO: All networks are stale
            if(!network){
                return;
            }

            this.setNetwork(network);
        }

        async recurseProducers(){
        	if(!this.producerTimer) clearTimeout(this.producerTimer);
            await this.setProducers(await getChainProducers());
            this.producerTimer = setTimeout(() => this.recurseProducers(), 5000);
        }

        destroyed(){
        	clearTimeout(this.producerTimer);
        }

        @Watch('account')
        async accountChanged(){
            if(this.account) setTimeout(async () => {
                await this.setVoter(await getVoter(this.account.name))
            },1);
        }
    }
</script>

<style lang="scss">

</style>
