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
                <li class="head"><a href="#the-basics">Voting on Producers</a></li>
                <ul>
                    <li class="link"><a href="#selecting-a-chain">Selecting a Chain</a></li>
                    <li class="link"><a href="#setting-up-scatter">Setting up Scatter</a></li>
                    <li class="link"><a href="#voting-power">Modifying Voting Power</a></li>
                    <li class="link"><a href="#selecting-producers">Selecting Producers</a></li>
                    <li class="link"><a href="#applying-votes">Applying Votes</a></li>
                </ul>
                <li class="head"><a href="#the-basics">For Producers</a></li>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <section class="contain">
                <h1 id="what-is-voting">What is voting?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>

            <section class="contain">
                <h1 id="who-should-vote">Who should vote?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </section>

            <section class="contain">
                <h1 id="what-to-know">What should I know before voting?</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                margin:60px auto;
            }

            .contain {
                padding:20px 0 20px 20px;
                border-left:30px solid rgba(0,0,0,0.1);
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

</style>
