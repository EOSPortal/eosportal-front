<template>
    <div class="container">
		<section class="contain">
			<h3>{{ $t('lang.votingProducers') }}</h3>
			<p>
				{{ $t('lang.votingProducersInfo') }}
			</p>
			<br>
			<p>
				Actual EOS Votes: <b>{{numberWithCommas((chainState.total_activated_stake/10000).toFixed(0))}}</b> EOS (<b>{{(chainState.total_activated_stake/10000/1000011818*100).toFixed(3)}} %</b>)
			</p>

			<figure style="border:1px solid red; padding:20px; margin:20px 0; clear:both;">
				<b style="font-size:20px; color:red;">
					By voting you are accepting the
					<a href="https://github.com/EOS-Mainnet/governance/blob/master/eosio.system/eosio.system-clause-constitution-rc.md" target="_blank"><u>EOS Constitution</u></a>
					. Make sure you have read it!
				</b>
			</figure>
		</section>
		<br><br>
		<br><br>
		<section class="contain" v-if="filteredProducers().length">

			<section class="input-container big" style="margin-bottom:20px;">
				<input class="alone" placeholder="Search..." v-model="searchTerms" />
			</section>

			<section class="chain-nav" id="votebutton" v-if="account" style="margin-bottom:20px; width:100%; text-align:right;">
				<button class="mobile-full" @click="vote">{{ $t('lang.voteSelectedProducers') }} ( {{votedFor.length}} / 30 )</button>
			</section>

			<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th>#</th>
					<th>{{ $t('lang.account') }}</th>
					<th class="desktop-only">{{ $t('lang.location') }}</th>
					<th>Votes %</th>
					<th>Votes</th>
					<th class="desktop-only">{{ $t('lang.url') }}</th>
					<th></th>
				</tr>
				</thead>


				<tbody>
					<tr v-for="(producer, key) in filteredProducers()">
						<td>{{key + 1}}</td>
						<td>
							<img v-if="producerImage(producer)" class="bp-logo" :src="producerImage(producer)" />
							<router-link tag="a" style="cursor:pointer;" :to="producer.owner" append>
								<b>{{producer.owner}}</b>
							</router-link>
						</td>
							<td class="desktop-only">{{producer.country_code}}</td>
						<td>{{(producer.total_votes / chainState.total_producer_vote_weight * 100).toFixed(3)}}%</td>
						<td>{{numberWithCommas((producer.total_votes  / calculateVoteWeight() / 10000).toFixed(0))}}</td>
						<td class="desktop-only">{{producer.url}}</td>
						<td>
							<button @click="toggleVoteFor(producer.owner)" v-if="account" :class="{'active':hasVotedFor(producer.owner)}">{{ $t('lang.vote') }}</button>
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="contain" v-if="chainLoaded && !filteredProducers().length">
			<h1>{{ $t('lang.chainNoProducers') }}</h1>
			<h2>
				{{ $t('lang.chainNoProducersInfo') }}
			</h2>
		</section>

		<section class="floater" :class="{'show':floatMenu}">
			<section class="box">
				<figure class="num">{{votedFor.length}}</figure>
				<figure class="label">{{ $t('lang.bps') }}</figure>
			</section>
			<section class="box">
				<figure class="num">{{countryCount()}}</figure>
				<figure class="label">{{ $t('lang.countries') }}</figure>
			</section>
		</section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { delegateAll, getAccount, voteFor } from "@/utils/eos.util";
import { pathOr } from "ramda";

@Component({
  components: {},
  props: {},
  computed: {
    ...mapState(["producers", "chainState", "voter", "chainLoaded", 'network']),
    ...mapGetters(["orderedProducers", "account"])
  },
  methods: {
    ...mapActions(["setVoter"])
  }
})
export default class Producers extends Vue {
  producers!: Array<any>;
  chainState!: any;
  voter!: any;
  network!: any;
  orderedProducers!: Array<string>;
  account!: any;
  setVoter!: (voter: any) => void;
  floatMenu: boolean = false;

  searchTerms: string = "";
  votedFor: Array<string> = [];

  producerImage(producer: any) {
    try {
      return producer.bpStandardInfo.org.branding.logo_256;
    } catch (e) {
      return false;
    }
  }

  filteredProducers() {
    return this.orderedProducers.filter(
      (bp: any) =>
        JSON.stringify(bp)
          .toLowerCase()
          .indexOf(this.searchTerms.toLowerCase().trim()) > -1
    );
  }

  toggleVoteFor(producerName: string) {
    if (this.votedFor.length >= 30 && !this.votedFor.includes(producerName))
      return false;
    if (this.votedFor.includes(producerName))
      this.votedFor.splice(this.votedFor.indexOf(producerName), 1);
    else this.votedFor.push(producerName);
  }

  hasVotedFor(producerName: string) {
    return this.votedFor.includes(producerName);
  }

  // Kudos to CryptoLions
  calculateVoteWeight() {

    //time epoch:
    //https://github.com/EOSIO/eos/blob/master/contracts/eosiolib/time.hpp#L160

    //stake to vote
    //https://github.com/EOSIO/eos/blob/master/contracts/eosio.system/voting.cpp#L105-L109

    let timestamp_epoch:number = 946684800000;
    let dates_:number = (Date.now() / 1000) - (timestamp_epoch / 1000);
    let weight_:number = (dates_ / (86400 * 7)) / 52;  //86400 = seconds per day 24*3600
    return Math.pow(2, weight_);
  }

  numberWithCommas(x: any) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1,$2");
    return x;
  }

  async vote() {
    console.log("call vote!");
    //		const delegated = await delegateAll(this.account.name);
    await voteFor(this.account.name, this.votedFor)
      .catch(error => {
        let errorJson = error;
        try {
          errorJson = JSON.parse(error);
        } catch (e) {}
        console.log("error: " + errorJson);
        (this as any).$toasted.error(
          "Voting failed: " +
            pathOr(
              pathOr("unknown errror", ["message"], errorJson),
              ["error", "what"],
              errorJson
            ),
          {
            theme: "primary",
            position: "top-center",
            duration: 5000
          }
        );
        throw Error("Voting failed");
      })
      .then(responds => {
        console.log("sucsess: " + JSON.stringify(responds));
        (this as any).$toasted.success("Voting succesfull", {
          theme: "primary",
          position: "top-center",
          duration: 3000
        });
      });

    await this.setVoter(await getAccount(this.account.name));
  }

  producerName(url: string, owner: string) {
    if (!url || !url.length) return owner;
    const baseUrl = url
      .replace("http://", "")
      .replace("https://", "")
      .replace("www.", "")
      .split("/")[0]
      .split(".");
    baseUrl.pop();
    return baseUrl.join(".");
  }

  countryCount() {
    let locations: Array<string> = [];
    this.votedFor.map(owner => {
      const producer = this.producers
        .filter(
          p =>
            p.hasOwnProperty("country_code") &&
            p.country_code &&
            p.country_code.length &&
            p.country_code !== "???"
        )
        .find(p => p.owner === owner);
      if (producer && !locations.includes(producer.country_code.toUpperCase()))
        locations.push(producer.country_code.toUpperCase());
    });
    return locations.length;
  }

  created() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.voter)
      this.votedFor = JSON.parse(
        JSON.stringify(this.voter.voter_info.producers)
      );
  }
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  mounted() {
    setTimeout(() => this.handleScroll(), 50);
  }
  handleScroll() {
    if (!this.account) return;

    const votebutton = document.getElementById("votebutton");
    if (!votebutton) return;

    const scroll = window.scrollY;
    this.floatMenu = !this.floatMenu
      ? votebutton.offsetTop - 20 < scroll
      : votebutton.offsetTop + 20 < scroll;
  }

  setVotedFor(attempts:number = 0):any{
  	if(attempts > 10) return null;
  	if(!this.network) {
  		setTimeout(() => this.setVotedFor(attempts+1), 500);
		return null;
	}
    if (this.voter) this.votedFor = JSON.parse(
  	  JSON.stringify(this.voter.voter_info.producers)
    );

  }

  @Watch("voter")
  voterChanged() {
    this.setVotedFor();
  }
}
</script>

<style lang="scss">
.bp-logo {
  width: 50px;
  height: 50px;
  vertical-align: middle;
  padding-right: 20px;
}
</style>
