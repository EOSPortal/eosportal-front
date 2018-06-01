<template>
    <div class="container">
		<section class="contain">
			<h3>Voting on Producers</h3>
			<p>
				In order to vote you need to delegate tokens to Bandwidth and CPU resources. This allows you not only to
				use the EOS network, but also to vote on Producers.
			</p>
		</section>
		<br><br>
		<br><br>
		<section class="contain" v-if="filteredProducers().length">

			<section class="input-container big" style="margin-bottom:20px;">
				<input class="alone" placeholder="Search..." v-model="searchTerms" />
			</section>

			<section class="chain-nav" id="votebutton" v-if="account" style="margin-bottom:20px; width:100%; text-align:right;">
				<button class="mobile-full" @click="vote">Vote For Selected Producers ( {{votedFor.length}} / 30 )</button>
			</section>

			<table>
				<thead>
				<tr>
					<th>Name</th>
					<th class="desktop-only">Account</th>
					<th class="desktop-only">Location</th>
					<th>Votes</th>
					<th class="desktop-only">URL</th>
					<th></th>
				</tr>
				</thead>


				<tbody>
					<tr v-for="producer in filteredProducers()">
						<td>
							<img v-if="producerImage(producer)" class="bp-logo" :src="producerImage(producer)" />
							<router-link tag="a" style="cursor:pointer;" :to="producer.owner" append>
								<b><u>{{producerName(producer.url, producer.owner)}}</u></b>
							</router-link>
						</td>
						<td class="desktop-only">{{producer.owner}}</td>
							<td class="desktop-only">{{producer.country_code}}</td>
						<td>{{(producer.total_votes / chainState.total_producer_vote_weight * 100).toFixed(5)}}%</td>
						<td class="desktop-only">{{producer.url}}</td>
						<td>
							<button @click="toggleVoteFor(producer.owner)" v-if="account" :class="{'active':hasVotedFor(producer.owner)}">Vote</button>
						</td>
					</tr>
				</tbody>
			</table>
		</section>

		<section class="contain" v-if="chainLoaded && !filteredProducers().length">
			<h1>This chain doesn't have any producers registered yet.</h1>
			<h2>
				Some chain launching groups decide to go through a validation period to make sure that the chain is stable and proper before allowing producers to be
				registered and then voted on. Though this chain is live and you can see your balances, it is not ready to be voted on yet and accepts no transactions.
			</h2>
		</section>

		<section class="floater" :class="{'show':floatMenu}">
			<section class="box">
				<figure class="num">{{votedFor.length}}</figure>
				<figure class="label">BPs</figure>
			</section>
			<section class="box">
				<figure class="num">{{countryCount()}}</figure>
				<figure class="label">Countries</figure>
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
    ...mapState(["producers", "chainState", "voter", "chainLoaded"]),
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

  @Watch("voter")
  voterChanged() {
    if (this.voter)
      this.votedFor = JSON.parse(
        JSON.stringify(this.voter.voter_info.producers)
      );
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
