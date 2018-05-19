<template>
    <div class="container">
		<h1 class="text-center p-4 m-4">Chains</h1>
		<hr/>
		<section class="input-group padded-group">
			<h3 style="width:100%;">Add New Chain</h3>
			<p>
				When you add a new chain we will pull all relevant data automatically.
			</p>

			<section class="input-group-prepend">
				<label class="input-group-text">Hostname or IP</label>
			</section>
			<input class="form-control" placeholder="http://chaindomain.com/" />
			<section class="input-group-append">
				<button class="btn btn-outline-secondary">Add Chain</button>
			</section>
		</section>
		<hr/>
		<h3>Selecting a Chain</h3>
		<p>
			You can vote for 30 producers on each chain for as many chains as you'd like.<br>
			Once you select a chain you'll see a list of producers for that chain and will be able to vote for them.
		</p>
        <table class="table table-striped table-hover">
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
			</tbody>
        </table>
    </div>
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
	.padded-group {
		width:600px;
		padding:30px;
		border:1px solid rgba(0,0,0,0.1);
		margin:40px auto;
	}
</style>
