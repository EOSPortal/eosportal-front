<template>
    <section class="help">
        <section class="contain">
            <ul>
                <li class="head"><a href="#the-basics">The Basics</a></li>
                <ul>
                    <li class="link"><a href="#what-is-voting">What is voting?</a></li>
                    <li class="link"><a href="#who-should-vote">Who should vote?</a></li>
                    <li class="link"><a href="#what-to-know">What should I know before voting?</a></li>
                </ul>


                <li class="head"><a href="#voting">Voting</a></li>
                <ul>
                    <li class="link"><a href="#selecting-a-chain">Selecting a Chain</a></li>
                    <li class="link"><a href="#setting-up-scatter">Setting up Scatter</a></li>
                    <li class="link"><a href="#understanding-voting-power">Understanding Voting Power</a></li>
                    <li class="link"><a href="#selecting-producers">Selecting Producers</a></li>
                    <li class="link"><a href="#applying-votes">Applying Votes</a></li>
                </ul>


                <li class="head"><a href="#for-producers">For Producers</a></li>
                <ul>
                    <li class="link"><a href="#modifying-meta-data">Modifying your Meta-Data</a></li>
                    <li class="link"><a href="#strengthening-chains">Strengthening the Chain</a></li>
                </ul>
            </ul>
        </section>

        <hr/>


        <!-- GETTING STARTED -->
        <section class="contain">
            <h1 id="the-basics">The Basics</h1>
            <p>
                These are things every voter and holder of EOSIO system tokens ( EOS ) should know.
            </p>

            <section class="contain">
                <h1 id="what-is-voting">What is voting?</h1>
                <p>
                    The EOSIO software utilizes Delegated-proof-of-stake or DPoS as its consensus model. In this model 21 “block producers” are
                    elected by token holders to validate transactions and secure the EOS public blockchain. In this way each token holder is a participant in the governance of the blockchain.
                </p>
            </section>

            <section class="contain">
                <h1 id="who-should-vote">Who should vote?</h1>
                <p>
                    Every token-holder who has the long-term interest of the EOS network in mind should vote. EOS is what we make it!
                </p>
            </section>

            <section class="contain">
                <h1 id="what-to-know">What should I know before voting?</h1>
                <section class="contain">
                    <b>Your tokens will be “staked” for at least three days.</b><br>
                    To vote it means “staking” your EOS tokens. “Staking” is the word used to describe locking-up your tokens for a specific purpose on the EOS network.
                    Whether it be for securing bandwidth, purchasing RAM, or in this case voting, you will not be able to reclaim your tokens for at least three days from the moment you stake them.
                    After three days you will be able to request they be unstaked and the full amount of EOS tokens will be returned you.
                </section>
                <section class="contain">
                    <b>1 Token = up to 30 Votes</b><br>
                    You can vote for up to 30 block producers with each token that you own. If you own 10 EOS, then you can vote for 30 block producers 10 times each.
                    You cannot vote for a block producer more than once with each token. Why 30 votes?
                    Read one explanation here(https://medium.com/@thomas.cox_39839/why-30-stake-weighted-approval-votes-for-eosio-1402b994bf20)
                </section>
                <section class="contain">
                    <b>You can’t “set-it and forget-it”</b><br>
                    Your vote decays in weight steadily over time until it is phased out 2 years from the date you originally staked it.
                    This is to prevent “set-it and forget-it” situations where Block Producers can become complacent from vote totals.
                </section>
                <section class="contain">
                    <b>The Golden Rule of Voting</b><br>
                    In the EOS constitution sending or receiving anything of value in exchange for a vote is prohibited.
                    If the criteria for casting a vote is “who paid me the most” than it may not also be “I’m voting for this BP because they are good”.
                    Thoughtful voting leads to prosperity for all.
                </section>
            </section>
        </section>

        <hr/>

        <!-- USER VOTING -->
        <section class="contain">
            <h1 id="voting">Voting</h1>
            <p>

            </p>

            <section class="contain">
                <h1 id="selecting-a-chain">Selecting a Chain</h1>
                <p>
                    The EOSIO software utilizes Delegated-proof-of-stake or DPoS as its consensus model. In this model 21 “block producers” are
                    elected by token holders to validate transactions and secure the EOS public blockchain. In this way each token holder is a participant in the governance of the blockchain.
                </p>
            </section>
        </section>

        <hr/>

    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {

        },
    })
    export default class Help extends Vue {}
</script>

<style lang="scss">

    .help {
        .contain {
            &:first-child {
                margin:40px auto;
            }

            &:not(:first-child){
                margin:20px auto;
            }

            .contain {
                padding:20px 0 20px 20px;
                border-left:10px solid rgba(0,0,0,0.1);
                border-bottom:1px solid rgba(0,0,0,0.05);
            }
        }

        ul {
            li {
                margin-bottom:5px;

                &.head {
                    font-size:24px;
                    font-weight:800;
                    text-decoration: underline;

                    &:not(:first-child){
                        margin-top:20px;
                    }
                }

                &.link {
                    font-size:18px;
                    font-weight:500;
                    text-decoration: underline;
                }
            }
        }
    }

    hr {
        margin-bottom:50px;
        margin-top:50px;
    }

</style>
