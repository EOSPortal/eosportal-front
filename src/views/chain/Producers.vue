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
				<router-link tag="tr" :to="producer.owner" append v-for="producer in orderedProducers()">
					<td>{{producerName(producer)}}</td>
					<td>{{producer.owner}}</td>
					<!--<td>{{producer.location}}</td>-->
					<td>{{producer.total_votes}}</td>
					<td>{{new Date(producer.time_became_active * 1000).toLocaleDateString()}}</td>
					<td>{{producer.url}}</td>
					<td><button>View Producer</button></td>
				</router-link>
				</tbody>
			</table>
		</section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {mapState, mapActions, mapMutations, mapGetters} from "vuex";

@Component({
	components: {},
	props: {},
	computed: mapState(["producers"]),
	methods: {
		producerName({url, owner}){
			if(!url.length) return owner;
			const baseUrl = url
				.replace('http://','')
				.replace('https://','')
				.replace('www.','').split('/')[0]
				.split('.');
			baseUrl.pop();
			return baseUrl.join('.');
		},
		...mapActions(["getProducers"]),
		...mapGetters(['orderedProducers']),
		...mapMutations(["setChain"])
	}
})
export default class Producers extends Vue {
	producers: Array<any>;
}
</script>

<style lang="scss">

</style>
