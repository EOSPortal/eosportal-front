<template>
    <div class="container">
		<h1 class="text-center p-4 m-4">Producers</h1>
        <p>Chain: {{chainName}}</p>
        <table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Name</th>
					<th>Organization</th>
					<th>Contact</th>
					<th>Location</th>
					<th>p2p</th>
					<th>api</th>
				</tr>
			</thead>

			<tbody>
	            <tr v-bind:key="producer.id" v-for="producer in producers">
	                <td>{{producer.name}}</td>
	                <td>{{producer.organization}}</td>
	                <td>{{producer.contact}}</td>
	                <td>{{producer.location}}</td>
	                <td>{{producer.p2p_url}}</td>
	                <td>{{producer.api_url}}</td>
	            </tr>
			</tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState, mapActions } from "vuex";
import { getAllProducers } from "../api";

@Component({
  components: {},
  props: {},
  computed: mapState(["chainName", "producers"]),
  methods: mapActions(["getProducers"])
})
export default class Producers extends Vue {
  producers: Array<any>;
  chainName: string;
  getProducers: () => void;

  created() {
    this.getProducers();
  }
}
</script>

<style lang="scss">

</style>
