<template>
    <div class="container">
        <section class="contain">
            <h3>Delegating Bandwidth</h3>
            <p>
                In order to vote you will need to stake some of your tokens for CPU and Bandwidth. This will allow you to use those
                same staked tokens for voting as well.
            </p>
        </section>
        <hr/>
        <section class="contain" v-if="!scatter || !identity">
            <section v-if="!scatter">
                <h2 class="flashy">It looks like you don't have <b>Scatter</b></h2>
                <p>
                    In order to vote using this portal you will have to first install Scatter.
                    Visit the <a href=""><u class="flashy">Chrome Store</u></a> to grab the latest version.
                    <br><br>
                    [IMAGES]
                </p>
            </section>
            <section v-if="scatter && !identity">
                <h2 class="flashy">We need an <b>Identity</b> to use</h2>
                <p>
                    Before you can use <b>EOS</b>Portal with Scatter you need to pair an Identity.
                    <br><br>
                </p>
                <section class="cta">
                    <button @click="pair">Use Identity</button>
                </section>
            </section>
        </section>
        <section v-else class="contain">
            Scatter ready
        </section>
        <hr/>
        <section class="contain" v-if="voter">

            <section class="stake-controller">
                <figure class="total-stake">
                    <input :max="totalBalance" min="0" v-model="toStake" type="range" />
                    <h2>Power: {{toStake}} of {{totalBalance}} {{symbol}}</h2><br>
                </figure>

                <figure class="cpu">
                    <input type="range" v-model="forBandwidth" max="100" min="0" />
                    <h2>CPU: {{forBandwidth}}%</h2><br>
                </figure>

                <figure class="bandwidth">
                    <input type="range" style="opacity:0.2;" :value="forCPU()" disabled />
                    <h2>Bandwidth: {{forCPU()}}%</h2><br>
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
        forBandwidth:number = 50;

        forCPU(){
        	return 100 - this.forBandwidth;
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
//                this.forBandwidth = this.voter.
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
        	console.log('delegating', this.totalBalance, this.forBandwidth);
        	const fix = n => n.toFixed(this.decimals.toString().length);
        	const symbolWrap = n => `${n} ${this.symbol}`;
            const net:number = fix(this.toStake * (this.forBandwidth/100));
        	const cpu:number = fix(this.toStake - net);
        	console.log('netcpu', net, cpu);
        	await delegate(this.voter.owner, symbolWrap(net), symbolWrap(cpu));
        }

        @Watch('voter')
        voterChanged(){
            this.initialize();
        }
    }
</script>

<style lang="scss">

</style>