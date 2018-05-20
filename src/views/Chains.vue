<template>
    <section>
		<section class="box contain w640 add-new-chain">
			<h2 class="center-text" style="width:100%;">Index a new Chain</h2>

			<section class="input-container">
				<input placeholder="http://chaindomain.com/" />
				<button>Add Chain</button>
			</section>

		</section>
		<hr/>
		<section class="contain">
			<h2>Select a chain to start <b>Voting</b></h2>
			<p>
				You can vote for 30 producers on each chain for as many chains as you'd like.<br>
				Once you select a chain you'll see a list of producers for that chain and will be able to vote for them.
			</p>
		</section>
		<hr/>

		<section class="contain">
			<table>
				<thead>
				<tr>
					<th>Chain ID</th>
					<th>Chain URL</th>
					<th>Booted Date</th>
					<th>Total Voters</th>
					<th>Vote Percentage</th>
					<th>Connected BPs</th>
				</tr>
				</thead>

				<tbody>
				<router-link :to="'chain/'+chain.id.toString()" tag="tr" :key="chain.id" v-for="chain in chains" style="cursor:pointer;">
					<td>{{chain.chain_id || Math.round(Math.random() * 10000000000 + 1)}}</td>
					<td>{{chain.api_url.replace('http://', '').replace('https://','')}}</td>
					<td>{{chain.booted || '2/6/2018'}}</td>
					<td>{{chain.voters || Math.round(Math.random() * 300000 + 1) | humanNum}}</td>
					<td>{{chain.percentage || (Math.random() * 100 + 0.1).toFixed(2) + '%'}}</td>
					<td>{{chain.bp_count || Math.round(Math.random() * 100 + 1)}}</td>
				</router-link>
				<router-link :to="'chain/'+chain.id.toString()" tag="tr" :key="chain.id" v-for="chain in chains" style="cursor:pointer;">
					<td>{{chain.chain_id || Math.round(Math.random() * 10000000000 + 1)}}</td>
					<td>{{chain.api_url.replace('http://', '').replace('https://','')}}</td>
					<td>{{chain.booted || '2/6/2018'}}</td>
					<td>{{chain.voters || Math.round(Math.random() * 300000 + 1) | humanNum}}</td>
					<td>{{chain.percentage || (Math.random() * 100 + 0.1).toFixed(2) + '%'}}</td>
					<td>{{chain.bp_count || Math.round(Math.random() * 100 + 1)}}</td>
				</router-link>
				</tbody>
			</table>
		</section>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";

@Component({
  components: {},
  computed: mapState(["chains"]),
  methods: mapActions(["getChains"])
})
export default class Chains extends Vue {
  chains: any[];
  getChains: () => void;

  created() {
    this.getChains();
  }
}
</script>

<style lang="scss">
	.add-new-chain {
		margin:50px auto;
		box-shadow: inset 0 0 150px rgba(0,0,0,0.3);

		.input-container {
			margin-top:15px;
		}
	}
</style>
