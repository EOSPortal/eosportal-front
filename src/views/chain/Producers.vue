<template>
    <div class="container">
		<section class="contain">
			<h3>Voting on Producers</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
		</section>
        <hr/>
		<section class="contain">

			<section class="input-container big" style="margin-bottom:20px;">
				<input placeholder="Search..." v-model="searchTerms" />
				<!--<button>Search</button>-->
			</section>

			<button @click="vote">Vote For Selected Producers</button>

			<table class="table table-striped table-hover">
				<thead>
				<tr>
					<th>Name</th>
					<th>Account</th>
					<!--<th>Location</th>-->
					<th>Total Votes</th>
					<th>Active Since</th>
					<th>URL</th>
					<th></th>
				</tr>
				</thead>


				<tbody>
				<tr v-for="producer in filteredProducers()">
					<td>{{producerName(producer.url, producer.owner)}}</td>
					<td>{{producer.owner}}</td>
					<!--<td>{{producer.location}}</td>-->
					<td>{{(producer.total_votes / chainData.total_producer_vote_weight * 100).toFixed(5)}}%</td>
					<td>{{new Date(producer.time_became_active * 1000).toLocaleDateString()}}</td>
					<td>{{producer.url}}</td>
					<td>
						<!--<router-link :to="producer.owner" tag="button" append>Vote</router-link>-->
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
import {mapState, mapActions, mapMutations, mapGetters} from "vuex";
import {delegateAll, voteFor} from "@/utils/eos.util";

@Component({
	components: {},
	props: {},
	computed: {
		...mapState(["producers", 'chainData', 'voter']),
		...mapGetters(['orderedProducers', 'account'])
	},
	mounted(){

	},
	methods: {
		...mapActions([])
	}
})
export default class Producers extends Vue {
	producers!: Array<any>;
	chainData!:any;
	voter!:any;
	orderedProducers!:Array<string>;
	account!:any;

	searchTerms:string = '';
	votedFor:Array<string> = [];

	filteredProducers(){
		return this.orderedProducers
			.filter((bp:any) => JSON.stringify(bp).toLowerCase().indexOf(this.searchTerms.toLowerCase().trim()) > -1);
	}

	toggleVoteFor(producerName:string){
		if(this.votedFor.includes(producerName))
			this.votedFor.splice(this.votedFor.indexOf(producerName),1);
		else this.votedFor.push(producerName);
	}

	hasVotedFor(producerName:string){
		return this.votedFor.includes(producerName);
	}

	async vote(){
		const delegated = await delegateAll(this.account.name);
		const test = await voteFor(this.account.name, this.votedFor);
		console.log('test', test);
	}

	producerName(url:string, owner:string){
		if(!url.length) return owner;
		const baseUrl = url
			.replace('http://','')
			.replace('https://','')
			.replace('www.','').split('/')[0]
			.split('.');
		baseUrl.pop();
		return baseUrl.join('.');
	}

	@Watch('voter')
	voterChanged(){
		if(this.voter)		// Breaking reference
			this.votedFor = JSON.parse(JSON.stringify(this.voter.producers));
	}
}
</script>

<style lang="scss">

</style>
