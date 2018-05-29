<template>
    <section>
		<!--<section class="contain center-text cta" style="margin-top:30px;">-->
			<!--<h1>Select a chain to start <b>Voting</b></h1>-->
			<!--<button>Or go to the top voted chain</button>-->

		<!--</section>-->
		<section class="box contain w640 add-new-chain">
			<h2 class="center-text" style="width:100%;">Submit a new Chain</h2>
			<section class="input-container">
				<input placeholder="http://chaindomain.com/" v-model="newChain" />
				<button @click="addChain">Add Chain</button>
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
					<th>Created Date</th>
					<th>Connected Nodes</th>
					<th></th>
				</tr>
				</thead>

				<tbody>
					<tr :key="chain.id" v-for="chain in chains">
						<td>{{chain.chainId}}</td>
						<td>{{chain.url.replace('http://', '').replace('https://','')}}</td>
						<td>{{new Date(chain.createdAt*1000)}}</td>
						<td>{{chain.nodes.length}}</td>
						<td><router-link :to="'chain/'+chain.id.toString()" tag="button">Select Chain</router-link></td>
					</tr>
				</tbody>
			</table>
		</section>
    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import Eos from 'eosjs';
import * as urlUtils from "@/utils/url.util";
import * as api from "@/api";

@Component({
	components: {},
	computed: mapState(["chains"]),
	methods: mapActions(["loadChains"]),
	data(){return {
		newChain:''
	}}
})
export default class Chains extends Vue {
	chains!: any[];
	loadChains!: () => void;

	newChain:string = '';

	created() {
		this.loadChains();
		this.newChain = '';
	}

	async addChain(){
		if(this.newChain.indexOf('http://') != 0 && this.newChain.indexOf('https://') != 0)
			return alert('Malformed EOSIO node URL');

		const {host, port} = urlUtils.urlToHostPort(this.newChain);

		const eos = Eos.Localnet({httpEndpoint:`http://${host}:${port}`});
		const info = await eos.getInfo({}).catch(() => null);

		if(!info || typeof info !== 'object' || !info.hasOwnProperty('head_block_num'))
			return alert('Could not get chain info');

		api.addChain(this.newChain);
	}
}
</script>

<style lang="scss">
	.add-new-chain {
		margin:50px auto;
		/*box-shadow: inset 0 0 150px rgba(0,0,0,0.3);*/

		.input-container {
			margin-top:15px;
		}
	}
</style>
