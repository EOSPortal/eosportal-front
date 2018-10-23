<template>
    <section>
        <ChainNavigation />
        <router-view v-if="initDone"></router-view>
    </section>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from "vue-property-decorator";
    import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
    import ChainNavigation from '@/components/ChainNavigation.vue';
    import {getAccount, getChainProducers, getChainState} from "@/utils/eos.util";
    import {getChain} from "@/api";
    import {getBpStandardInfo } from "@/utils/api.util";
    import { validateBpInfo } from "@/utils/bp-json-validation.util";
    import * as timezones from '@/timezones/country.json'

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
            ...mapActions(["setNetwork", "setProducers", "setChainData", "setChainState", "logout", "setVoter", "setChainLoaded"])
        }
    })



    export default class Chain extends Vue {
        producers!: Array<any>;
        voter!:any;
        account!:any;
        identity!:any;
        network!:any;
        setNetwork!: (networkString:string | null) => void;
        setProducers!: (producers:Array<any>) => void;
        setChainData!: (chainData:any) => void;
        setChainState!: (chainState:any) => void;
        setChainLoaded!: (loaded:boolean) => void;
        logout!:() => void;
        setVoter!:(voter:any) => void;
        producerTimer:NodeJS.Timer | any = null;
        initDone = false;

        async created() {
            await this.initialize();
            this.initDone = true;
        }

        beforeDestroy(){
            this.setChainLoaded(false);
            this.logout();
            this.setNetwork(null);
            this.setChainData(null);
            this.setProducers([]);
            this.setVoter(null);
            clearTimeout(this.producerTimer);
        }

        async initialize(){
            await this.bindNetwork();
            if(!this.network) return this.$router.push({path:'/'});
            this.setChainState(await getChainState());
            await this.regenVoter();
            await this.recurseProducers();
            this.setChainLoaded(true);
        }

        async bindNetwork(chainData:any|null = null){
            this.setChainData({ chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"});

            const protocol = location.protocol.substring(0, location.protocol.length - 1);

//            const originalLength:number = chainData.nodes.length;
//            let network:null | string = null;
//
//            // Discards slow networks. ( > 2 sec )
//            const raceNetwork = (endpoint:string) => Promise.race([
//            	new Promise((res, rej) => setTimeout(() => res(), 2000)).catch(() => null),
//                fetch(`${endpoint}/v1/chain/get_info`).then(() => endpoint).catch(() => null)
//            ]);
//
//            while(!network && chainData.nodes.length){
//                const node:string = chainData.nodes[0];
//                if (node.indexOf(protocol) === 0) network = (await raceNetwork(node)) as string | null;
//                if(!network) chainData.nodes.shift();
//            }
//
//            //TODO: Notify API of stale nodes.
//            if(chainData.nodes.length !== originalLength){
//            }
//
//            //TODO: All networks are stale
//            if(!network){
//                return;
//            }
//
//            this.setNetwork(network);
            this.setNetwork('https://proxy.eosnode.tools');
        }

        async recurseProducers(){
            await this.setProducers(await getChainProducers());
            await this.fillProducerData();
        }

        async fillProducerData(){
            clearTimeout(this.producerTimer);

            this.producers.map((producer:any) => {
              producer.country_code = (producer.location && timezones.default[producer.location.toString()]) ? timezones.default[producer.location.toString()] : '';
            })

            this.producerTimer = setTimeout(() => this.recurseProducers(), 20000);
        }

        async regenVoter(){
            if(this.account) setTimeout(async () => {
                await this.setVoter(await getAccount(this.account.name))
            },100);
        }

        @Watch('account')
        async accountChanged(){
            await this.regenVoter();
        }
    }
</script>

<style lang="scss">

</style>
