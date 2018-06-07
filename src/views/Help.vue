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
                    <li class="link"><a href="#choosing-producers">Choosing Producers</a></li>
                    <!--<li class="link"><a href="#understanding-voting-power">Understanding Voting Power</a></li>-->
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
                    The EOSIO software utilizes Delegated-proof-of-stake or DPoS as its consensus model. In this model 21 "Block Producers" are
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
                    <b>Your tokens will be "staked" for at least three days.</b><br><br>
                    To vote means staking your EOS tokens. Staking is the word used to describe locking-up your tokens for a specific purpose on the EOS network.
                    You will not be able to reclaim your tokens for at least three days from the moment you stake them.
                </section>
                <section class="contain">
                    <b>1 Token = up to 30 Votes</b><br><br>
                    You can vote for up to 30 block producers with each token that you own. If you own 10 EOS, then you can vote for 30 block producers 10 times each.
                    You cannot vote for a block producer more than once with each token. Why 30 votes?
                    <a href="https://medium.com/@thomas.cox_39839/why-30-stake-weighted-approval-votes-for-eosio-1402b994bf20" target="_blank"><u>Read one explanation here</u></a>
                </section>
                <section class="contain">
                    <b>You can't "set-it and forget-it"</b><br><br>
                    Your vote decays in weight steadily over time until it is phased out 2 years from the date you originally staked it.
                    This is to prevent "set-it and forget-it" situations where Block Producers can become complacent from vote totals.
                </section>
                <section class="contain">
                    <b>The Golden Rule of Voting</b><br><br>
                    In the EOS constitution sending or receiving anything of value in exchange for a vote is prohibited.
                    If the criteria for casting a vote is "who paid me the most" than it may not also be "I'm voting for this Block Producer because they are good".
                    Thoughtful voting leads to prosperity for all.
                </section>
            </section>
        </section>

        <hr/>

        <!-- USER VOTING -->
        <section class="contain">

            <h1 id="voting">Voting</h1>

            <h3>
                If you'd rather watch a video here is a short 5 minute video explaining the entire process.
            </h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/_hWRAjLKa8w" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

            <br><br>

            <section class="contain">
                <h1 id="selecting-a-chain">Selecting a Chain</h1>
                <p>
                    This voting portal supports any attempted chain launch. In most cases the Block Producers you're already voting for will have given you a link to the chain they are producing for.
                    If that is not the case however, you can see the amount of producers on the chain and within the chain itself you can search for your beloved block producer candidates.
                </p>
                <br>
                <br>
                <table>
                    <thead>
                        <tr>
                            <th>Chain ID</th>
                            <th></th>
                        </tr>
                    </thead>


                    <tbody>
                        <tr>
                            <td><b>id:4</b> - a628a5a6123d6ed...</td>
                            <td><button>Select</button></td>
                        </tr>
                    </tbody>
                </table>
            </section>



            <section class="contain">
                <h1 id="setting-up-scatter">Setting up Scatter</h1>
                <section class="contain">
                    <b>Downloading Scatter</b><br><br>
                    <b class="text-danger">It is extremely important that you download Scatter from only trusted resources, and validate that it has the correct extension id.</b>
                    <br><br>
                    Depending on your browser, click one of the links below and then follow the steps there for installing Scatter in Chrome or Firefox.
                    <br><br>
                    <ul>
                        <li><a href="https://chrome.google.com/webstore/detail/ammjpmhgckkpcamddpolhchgomcojkle" target="_blank"><u>Chrome Store</u></a></li>
                        <li><a href="https://addons.mozilla.org/en-US/firefox/addon/scatter/" target="_blank"><u>Mozilla Addons</u></a></li>
                    </ul>
                </section>
                <section class="contain">
                    <b>Validating your Scatter</b><br><br>

                    <section class="contain">
                        <b>Validating for Chrome</b><br><br>
                        <ul>
                            <li>Navigate to <u>chrome://extensions/</u> in your browser by copy pasting that URL into the URL bar.</li>
                            <li>On the top right side of the Extensions Page you should see a switch for "Developer Mode". Switch it on.</li>
                            <li>Find the Scatter extension among your installed extensions</li>
                            <li>There will be an <b>ID</b> property there. Make sure that it is exactly equal to: <u><b>ammjpmhgckkpcamddpolhchgomcojkle</b></u></li>
                        </ul>
                    </section>

                    <section class="contain">
                        <b>Validating for Firefox</b><br><br>
                        <p>
                            <b class="text-danger">
                                There is no easy way to validate the extension from within Firefox.<br>
                                If you are worried that you might have gotten the extension from a malicious vendor, please use Chrome instead.
                            </b>
                        </p>
                    </section>
                </section>

                <section class="contain">
                    <b>Importing your keypair</b><br><br>
                    To import a keypair into Scatter:
                    <ul>
                        <li>Copy your private key to your clipboard.</li>
                        <li>Open Scatter and click the <b>Key Pairs</b> option from the main menu</li>
                        <li>Then click the <b>New</b> button on the top-right.</li>
                        <li>Paste your private key into the private key input field.</li>
                        <li>Give this key a name so that you remember which it is.</li>
                        <li>Click the <b>Save</b> button to finish importing.</li>
                    </ul>

                    <br><br>

                    <img src="/img/scatter_keypair.gif" />
                </section>

                <section class="contain">
                    <b>Adding chains to your Scatter</b><br><br>

                    <p>
                        Before you can import your account into Scatter you will need to click the <b>Use Chain</b> button on the chain's sub-menu.
                        This will popup a prompt asking you to add one of the chain's networks so that Scatter will be able to search the chain for your account name base on the
                        keypair you imported.

                        <br><br>
                        <u>
                            <b>Note:</b> From time to time it might ask to you add a different network. This happens because there is no load balancer on top of the chain yet
                            and if a producer's node goes down we switch to the next available network.
                        </u>
                        <br>
                        <br>
                        <section class="chain-nav">
                            <button>Use Chain</button>
                        </section>
                        <br>

                        <img src="/img/scatter_add_network.jpg" />

                        <br>
                        <br>
                        You can then check that the network exists in Scatter like so:
                        <br>
                        <br>
                        <img src="/img/scatter_check_network.gif" />
                    </p>
                </section>

                <section class="contain">
                    <b>Importing your EOS account</b><br><br>

                    <p>
                        Now that you have your keypair as well as the chain's network inside of Scatter you can import your account.

                        <ul>
                            <li>Open Scatter and click the <b>Identities</b> option from the main menu</li>
                            <li>All Scatters start with a randomized Identity. Click the pencil icon to edit it.</li>
                            <li>Scroll down to the <b>Account</b> section and select the network you just added from the first drop down.</li>
                            <li>Select the keypair you want to use to search for accounts from the second drop down.</li>
                            <li>Click the <b>Import</b> button to tell Scatter to search for accounts.</li>
                            <li>If an account is found it will pop up a prompt allowing you to select the <i>EOS account permission</i>.</li>
                            <li>Since both your keys are the same right now you can select either, but you should make a habit of only using your <b>active</b> EOS permission.</li>
                            <li>Once you have selected an account click the <b>Use Selected Account</b> button.</li>
                            <li>Don't forget to click the <b>Save</b> button on the top-right.</li>
                        </ul>

                        <br><br>

                        <img src="/img/scatter_import_account.gif" />


                    </p>
                </section>

                <section class="contain">
                    <b>Pairing with Scatter</b><br><br>


                    <p>
                        Now that you have your actual EOS account imported into Scatter and linked to the chain's network you can go ahead and pair your Scatter with the
                        voting portal and the chain you wish to vote on by clicking the <b>Pair Scatter</b> button in the chain's sub-menu. This will pop up a prompt asking you
                        to allow <b>eosportal</b> to have access to one of your identities along with it's EOS account.

                        <br><br>
                        <section class="chain-nav">
                            <button>Pair Scatter</button>
                        </section>
                        <br>

                        <img src="/img/scatter_use_account.gif" />


                    </p>
                </section>

                <section class="contain">
                    <b>Understanding Scatter's Security</b><br><br>
                    <p>
                        Scatter's entire local storage is not accessible by web applications. The only way that an application can get any information out of it is by requesting it from you.
                        Private keys will <u>never</u> be given to applications. The only thing they get is signatures that have been created by using your private key to sign data.
                        <br><br>
                        For a much more elaborate explanation of Scatter's security please visit the link below:<br>
                        <a href="https://github.com/EOSEssentials/Scatter#security" target="_blank"><h2><u>Scatter's GitHub</u></h2></a>
                    </p>
                </section>
            </section>





            <section class="contain">
                <h1 id="choosing-producers">Choosing Producers</h1>
                <p>
                    There are a few things to always keep in mind when choosing producers to vote for.
                </p>

                <section class="contain">
                    <b>Remember, our aim is decentralization.</b><br><br>
                    Please refrain from voting for too many producers in the same countries. This voting portal will not explicitly prohibit you from voting in a centralized manner
                    so you must stay alert and aware of the locations that your favorite Block Producers are located in. If any EOS blockchain becomes centralized it will not be the Block Producers' faults,
                    but the voters'.
                </section>

                <section class="contain">
                    <b>Do your research!</b><br><br>
                    Make sure that the Block Producers that you are voting for have the community and the chain's best interests in mind.
                    If you click on a Block Producer you will be able to see Meta-Data they have added.
                </section>

                <section class="contain">
                    <b>How do I select a block producer to vote?</b><br><br>

                    After you have paired with Scatter a <b>Vote</b> button will appear next to each producer.
                    <br>
                    <br>

                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td><b><u>BlockProducerName</u></b></td>
                                <td><button>Vote</button></td>
                            </tr>
                        </tbody>
                    </table>

                    <br>
                    <br>


                    Select up to 30 block producers and then click the <b>Vote For Selected Producers</b> button at the top of the Block Producer table.

                    <br><br>
                    <section class="chain-nav">
                        <button>Vote For Selected Producers ( 30 / 30 )</button>
                    </section>
                    <br>

                    <img src="/img/scatter_sign_trx.jpg" />
                </section>
            </section>




            <!--<section class="contain">-->
                <!--<h1 id="understanding-voting-power">Understanding Voting Power</h1>-->
                <!--<p>-->
                    <!--Your voting power is based on the bandwidth ( CPU + Net ) you have delegated to yourself, along with any bandwidth others have delegated to you.-->
                    <!--Without bandwidth on the network/chain you can not use the network. Think of it like paying your ISP for bandwidth, but only paying once and you have the ability to -->
                    <!--retract your money when you no longer need the bandwidth.-->
                <!--</p>-->
                <!--<section class="contain">-->
                    <!--<b>How is my total bandwidth divided?</b><br><br>-->
                    <!---->
                <!--</section>-->
            <!--</section>-->



        </section>

        <hr/>

        <!-- USER VOTING -->
        <section class="contain">
            <h1 id="for-producers">For Producers</h1>
            <p>

            </p>

            <section class="contain">
                <h1 id="modifying-meta-data">Modifying your Meta-Data</h1>
                <p>
                    This voting portal uses a <b>bp.json</b> file to collect meta-data about producers.
                    <br><br>
                    To find out more about how to set it up for your producer visit our clone of the <a href="https://github.com/EOSPortal/bp-info-standard" target="_blank"><u>bp-info-standard</u></a>.
                </p>
            </section>



            <section class="contain">
                <h1 id="strengthening-chains">Strengthening the Chain</h1>
                <p>
                    As a Block Producer or group of block producers there's a few things you can do to help provide a stronger chain for this voting portal as well as a better user experience for voters.
                </p>


                <section class="contain">
                    <b>Add the chain under multiple endpoints.</b><br><br>
                    Every time you add a chain to this portal we check the chain_id and if it already exists in our database then we add that new endpoint as a fallback node.
                    Having multiple fallback nodes makes sure that if one Block Producer goes down, the voting portal isn't affected.
                </section>

                <section class="contain">
                    <b>Consider using a Load Balancer.</b><br><br>
                    Instead of adding one of the Block Producer's api-endpoint you can add the chain first under a Load Balancer and then add the individual endpoints as fallback nodes.
                    This makes it so that when a user adds that network to Scatter it has a better chance of not needing to be changed in the future and causing a bad user experience.
                    <br>
                    <br>
                    This is primarily an issue only for the boot stages as once there is a live and selected mainnet Scatter will be updated with an <i>endorsed network</i> which it can fall back to.
                </section>
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



</style>
