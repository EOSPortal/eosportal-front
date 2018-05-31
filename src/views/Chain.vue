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
    import {getAccount, getChainProducers, getChainState} from "@/utils/eos.util";
    import {getChain} from "@/api";
    import {getBpStandardInfo } from "@/utils/api.util";
    import { validateBpInfo } from "@/utils/bp-json-validation.util";

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

        async created() {
            this.initialize();
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
        	if(!chainData) chainData = await getChain(this.$route.params.chainId);
            if(!chainData) return this.$router.push({path:'/'});
            this.setChainData(chainData);

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
            await this.setProducers(await getChainProducers());
            await this.fillProducerData();
        }

        async fillProducerData(){
            clearTimeout(this.producerTimer);
//        	const producer = this.producers.filter(p => !p.hasOwnProperty('bpStandardInfo'))[0] || null;
//        	if(producer){
//                if(!producer.url.length) producer.bpStandardInfo = false;
//                else {
//                    await getBpStandardInfo(producer.url)
//                        .then(res => producer.bpStandardInfo = validateBpInfo(res))
//                        .catch(error => producer.bpStandardInfo = false);
//
//                    if(producer.bpStandardInfo)
//                    	producer.country_code = producer.bpStandardInfo.org.location.country;
//
//                    console.log('producer', producer.bpStandardInfo);
//                }
//            }
//
//            if(this.producers.filter(p => !p.hasOwnProperty('bpStandardInfo')).length)
//            	setTimeout(async () => await this.fillProducerData(), 5);
//        	else
            this.producerTimer = setTimeout(() => this.recurseProducers(), 20000);
        }

        async regenVoter(){
            if(this.account) setTimeout(async () => {
                await this.setVoter(await getAccount(this.account.name))
            },1);
        }

        @Watch('account')
        async accountChanged(){
            await this.regenVoter();
        }
    }
</script>

<style lang="scss">

</style>
