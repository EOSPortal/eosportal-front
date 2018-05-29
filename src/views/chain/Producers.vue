<template>
    <div class="container">
		<section class="contain">
			<h3>Voting on Producers</h3>
			<p>
				In order to vote you need to delegate tokens to Bandwidth and CPU resources. This allows you not only to
				use the EOS network, but also to vote on Producers.
			</p>
			<hr/>

			<h3>Geographical Vote Spread: <u>25%</u></h3>
			<p>
				You should keep decentralization in mind when voting. Don't vote for too many
				producers within the same countries.
			</p>
		</section>
		<hr/>
		<section class="contain">

			<section class="input-container big" style="margin-bottom:20px;">
				<input class="alone" placeholder="Search..." v-model="searchTerms" />
			</section>

			<section class="chain-nav" v-if="account" style="margin-bottom:20px; width:100%; text-align:right;">
				<button class="mobile-full" @click="vote">Vote For Selected Producers ( {{votedFor.length}} / 30 )</button>
			</section>

			<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th>Name</th>
					<th class="desktop-only">Account</th>
					<!--<th>Location</th>-->
					<th>Votes</th>
					<th class="desktop-only">Active Since</th>
					<th class="desktop-only">URL</th>
					<th></th>
				</tr>
				</thead>


				<tbody>
					<tr v-for="producer in filteredProducers()">
					<td>
						<router-link tag="b" style="cursor:pointer;" :to="producer.owner" append>
							<u>{{producerName(producer.url, producer.owner)}}</u>
						</router-link>
					</td>
					<td class="desktop-only">{{producer.owner}}</td>
					<!--<td>{{producer.location}}</td>-->
					<td>{{(producer.total_votes / chainData.total_producer_vote_weight * 100).toFixed(5)}}%</td>
					<td class="desktop-only">{{new Date(producer.time_became_active * 1000).toLocaleDateString()}}</td>
					<td class="desktop-only">{{producer.url}}</td>
					<td>
						<button @click="toggleVoteFor(producer.owner)" v-if="account" :class="{'active':hasVotedFor(producer.owner)}">Vote</button>
					</td>
				</tr>

				</tbody>
			</table>
		</section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {delegateAll, getVoter, voteFor} from "@/utils/eos.util";

@Component({
  components: {},
  props: {},
  computed: {
    ...mapState(["producers", "chainData", "voter"]),
    ...mapGetters(["orderedProducers", "account"])
  },
  methods: {
    ...mapActions(["setVoter"])
  }
})
export default class Producers extends Vue {
	producers!: Array<any>;
	chainData!: any;
	voter!: any;
	orderedProducers!: Array<string>;
	account!: any;
	setVoter!:(voter:any) => void;

	searchTerms: string = "";
	votedFor: Array<string> = [];

	filteredProducers() {
		return this.orderedProducers.filter(
				(bp: any) =>
				JSON.stringify(bp)
					.toLowerCase()
					.indexOf(this.searchTerms.toLowerCase().trim()) > -1
		);
	}

	toggleVoteFor(producerName: string) {
		if (this.votedFor.includes(producerName))
			this.votedFor.splice(this.votedFor.indexOf(producerName), 1);
		else this.votedFor.push(producerName);
	}

	hasVotedFor(producerName: string) {
		return this.votedFor.includes(producerName);
	}

	async vote() {
		const delegated = await delegateAll(this.account.name);
		const test = await voteFor(this.account.name, this.votedFor);
		console.log("test", test);
		await this.setVoter(await getVoter(this.account.name))
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

	@Watch("voter")
	voterChanged() {
		if (this.voter)
			this.votedFor = JSON.parse(JSON.stringify(this.voter.producers))
	}
}
</script>

<style lang="scss">
</style>
