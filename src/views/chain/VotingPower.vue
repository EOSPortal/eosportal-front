<template>
    <div class="container">
        <section class="contain">
            <h3>Delegating Bandwidth</h3>
            <p>
                In order to vote you will need to delegate some of your tokens to yourself for <u>CPU and Net</u>.
                This will allow you to use those same staked tokens for voting as well.
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
                    Click the <b>"Pair Scatter"</b> button on this chain's sub-menu.
                </h2>
            </section>
        </section>
        <section class="contain" v-if="voter">



            <section class="stake-controller">
                <figure class="total-stake" style="max-width:400px;">
                    <input :max="totalBalance" min="1" v-model="toStake" type="range" />
                    <h2>Power: {{toStake}} of {{totalBalance}} <b>{{symbol}}</b></h2><br>
                </figure>

                <section class="chain-nav" style="margin-top:0;">
                    <button @click="delegateBW">Set Voting Power</button>
                </section>
            </section>

            <hr />

            <h3>EOS Account Details</h3>
            <table class="account-details">
                <tr>
                    <th>Account</th>
                    <td>
                        <ul>
                            <li>name: {{voter.account_name}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>CPU Limits</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.cpu_limit)">{{key}}: {{voter.cpu_limit[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>Net Limits</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.net_limit)">{{key}}: {{voter.net_limit[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="voter.delegated_bandwidth">
                    <th>Delegated Bandwidth</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.delegated_bandwidth)">{{key}}: {{voter.delegated_bandwidth[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>RAM</th>
                    <td>
                        <ul>
                            <li>Quota - {{voter.ram_quota}}</li>
                            <li>Usage - {{voter.ram_usage}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>Total Resources</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.total_resources)">{{key}}: {{voter.total_resources[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>Voter Info</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.voter_info)">{{key}}: {{voter.voter_info[key]}}</li>
                        </ul>
                    </td>
                </tr>
            </table>

            <div style="height:200px;"></div>


        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator';
    import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
    import {
        getAccount,
        getSystemTokenStats,
        stakableTokenBalance,
        delegate,
        undelegate,
        refundRequest
    } from "@/utils/eos.util";


    @Component({
        components: {

        },
        computed:{
            ...mapState(["scatter", "voter", 'chainState']),
            ...mapGetters(['identity']),
        },
        methods:{
            ...mapActions(['login', 'setVoter'])
        }
    })
    export default class VotingPower extends Vue {
        login!:() => void;
        setVoter!:(voter:any) => void;
        voter!:any;
        symbol:string = 'SYS';
        decimals:number = 0;
        percentage:number = 0;
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
            	console.log('voter', this.voter);
                this.symbol = this.voter.total_resources.cpu_weight.split(' ')[1];
                this.toStake = this.voter.voter_info ? this.voter.voter_info.staked/10000 : 0;

                const tokens:string = await stakableTokenBalance(this.voter.account_name, this.symbol);
                const delegated = this.voter.delegated_bandwidth ?
                        parseFloat(this.voter.delegated_bandwidth.cpu_weight.split(' ')[0])
                        + parseFloat(this.voter.delegated_bandwidth.net_weight.split(' ')[0])
                        : 0;

                this.totalBalance = delegated + parseFloat(tokens.split(' ')[0]);

                const refunding:any = await refundRequest(this.voter.account_name);
                if(refunding){
                this.totalBalance +=
                          parseFloat(refunding.cpu_amount.split(' ')[0])
                        + parseFloat(refunding.net_amount.split(' ')[0])
                }

                const zeroes = this.voter.total_resources.cpu_weight.split(' ')[0].split('.')[1].length;
                this.decimals = parseInt(`1${[...Array(zeroes).keys()].map(() => 0).join('')}`);

            }
        }

        async delegateBW(){
        	const fix = (n:number) => parseFloat(n.toFixed(this.decimals.toString().length));
        	const symbolWrap = (n:number) => `${n} ${this.symbol}`;
            const previousStake = this.voter.voter_info ? this.voter.voter_info.staked/10000 : 0;
        	const delta = this.toStake - previousStake;
        	if(delta === 0) return false;

            if(delta > 0) await delegate(this.voter.account_name, symbolWrap(fix(delta/2)), symbolWrap(fix(delta/2)));
            else await undelegate(this.voter.account_name, symbolWrap(fix(Math.abs(delta)/2)), symbolWrap(fix(Math.abs(delta)/2)));
            await this.setVoter(await getAccount(this.voter.account_name));
        }

        @Watch('voter')
        voterChanged(){
            this.initialize();
        }
    }
</script>

<style lang="scss">
    .account-details {
        text-align: left;
        max-width:800px;
    }
</style>