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
            ...mapActions(["setNetwork", "setProducers", "setChainData", "setChainState", "logout", "setVoter"])
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

        async created() {
            this.initialize();
        }

        beforeDestroy(){
            this.logout();
            this.setNetwork(null);
            this.setChainData(null);
            this.setProducers([]);
            this.setVoter(null);
        }

        async initialize(){
            await this.bindNetwork();
            if(!this.network) return this.$router.push({path:'/'});
            this.setChainState(await getChainState());
            await this.regenVoter();
            await this.recurseProducers();
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
        	if(!this.producerTimer) clearTimeout(this.producerTimer);
            await this.setProducers(await getChainProducers());
            await this.fillProducerData();
            this.producerTimer = setTimeout(() => this.recurseProducers(), 5000);
        }

        async fillProducerData(){
        	const producer = this.producers.filter(p => !p.hasOwnProperty('country_code'))[0] || null;
        	if(producer){
                if(!producer.url.length) { producer.country_code = '???';  producer.json = {}; }
                else {
                    //TODO: Switch to use BP json's location
                    const url = producer.url.replace('http://', '').replace('https://', '').split('/')[0];
                    const location = await fetch(`http://ip.kitpes.com/?id=${Math.round(Math.random() * 10000+1)}&ip=${url}`)
						.then((res: any) => res.json()).catch(() => null);
                    producer.country_code = location ? location.country_code : '???';

//                const bpJson = await fetch(producer.url.replace(/\/$/, "")+'/bp.json');
                }
            }

            if(this.producers.filter(p => !p.hasOwnProperty('country_code')).length)
            	setTimeout(async () => await this.fillProducerData(), 5);
        }

        destroyed(){
        	clearTimeout(this.producerTimer);
        }

        async regenVoter(){
            if(this.account) setTimeout(async () => {
                await this.setVoter(await getVoter(this.account.name))
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
