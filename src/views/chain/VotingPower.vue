<template>
    <div class="container">
        <section class="contain">
            <h3>Delegating Bandwidth</h3>
            <p>
                In order to vote you will need to stake some of your tokens for CPU and Net. This will allow you to use those
                same staked tokens for voting as well.
            </p>
        </section>
        <hr/>
        <section class="contain" v-if="!scatter || !identity">
            <section v-if="!scatter">
                <h1>It looks like you don't have <b>Scatter</b></h1>
                <h2>
                    In order to vote using this portal you will have to first install Scatter.
                    <br><br>
                    <b>Visit the <router-link to="/help#setting-up-scatter"><u>Help</u></router-link> page to find out more about installing and setting up Scatter.</b>
                </h2>
                <!--<ul>-->
                    <!--<li><a href="https://chrome.google.com/webstore/detail/ammjpmhgckkpcamddpolhchgomcojkle" target="_blank"><u>Chrome Store</u></a></li>-->
                    <!--<li><a href="https://addons.mozilla.org/en-US/firefox/addon/scatter/" target="_blank"><u>Mozilla Addons</u></a></li>-->
                <!--</ul>-->
            </section>
            <section v-if="scatter && !identity">
                <h1>We need an <b>Identity</b> to use</h1>
                <h2>
                    Before you can use <b>EOS</b>Portal with Scatter you need to pair an Identity.
                    <br><br>
                    Click the <b>"Scatter"</b> button on this chain's sub-menu.
                </h2>
            </section>
        </section>
        <section class="contain" v-if="voter">

            <section class="stake-controller">
                <figure class="total-stake">
                    <input :max="totalBalance" min="0" v-model="toStake" type="range" />
                    <h2>Power: {{toStake}} of {{totalBalance}} {{symbol}}</h2><br>
                </figure>

                <section class="radial-power">

                </section>

                <figure class="cpu">
                    <input type="range" v-model="forNet" max="100" min="0" />
                    <h2>CPU: {{forNet}}%</h2><br>
                </figure>

                <figure class="net">
                    <input type="range" style="opacity:0.2;" :value="forCPU()" disabled />
                    <h2>Net: {{forCPU()}}%</h2><br>
                </figure>

                <button @click="delegateBW">Commit Stake</button>
            </section>
            <!--<p>-->
                <!--{{percentage}}% ( {{voter}} )-->
            <!--</p>-->
            <!--<br>-->
            <!--<input type="range" v-model="percentage" />-->


        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
    import {getAccount, getSystemTokenStats, stakableTokenBalance, delegate} from "@/utils/eos.util";


    @Component({
        components: {

        },
        computed:{
            ...mapState(["scatter", "voter", 'chainState']),
            ...mapGetters(['identity']),
        },
        methods:{
            ...mapActions(['login'])
        }
    })
    export default class VotingPower extends Vue {
        login!:() => void;
        voter!:any;
        symbol:string = 'SYS';
        decimals:number = 0;
        percentage:number = 0;
        eosAccount:any = null;
        totalBalance:number | null = null;
        toStake:number = 0;
        forNet:number = 50;

        forCPU(){
        	return 100 - this.forNet;
        }

        pair(){
            this.login();
        }

        mounted(){
            this.initialize();
        }

        async initialize(){
            if(this.voter) {

                this.eosAccount = await getAccount(this.voter.owner);
                console.log(this.eosAccount);
//                this.forNet = this.voter.
                this.symbol = this.voter.unstaking.split(' ')[1];
                this.toStake = this.voter.staked/10000;
                this.totalBalance = (await stakableTokenBalance(this.voter.owner, this.symbol)
                    .then(bal => bal ? parseFloat(bal.split(' ')[0]) : 0)
                    .catch(() => 0)) + (this.voter.staked / 10000);

                const stats = await getSystemTokenStats(this.symbol);
                if(!stats) return false;
                const zeroes = stats[this.symbol].max_supply.split(' ')[0].split('.')[1].length;
                this.decimals = parseInt(`1${[...Array(zeroes).keys()].map(() => 0).join('')}`);

            }
        }

        async delegateBW(){
        	console.log('delegating', this.totalBalance, this.forNet);
        	const fix = (n:number) => parseFloat(n.toFixed(this.decimals.toString().length));
        	const symbolWrap = (n:number) => `${n} ${this.symbol}`;
            const net:number = this.toStake * (this.forNet/100);
        	const cpu:number = this.toStake - net;
        	console.log('netcpu', net, cpu);
        	await delegate(this.voter.owner, symbolWrap(fix(net)), symbolWrap(fix(cpu)));
        }

        @Watch('voter')
        voterChanged(){
            this.initialize();
        }
    }
</script>

<style lang="scss">

</style>