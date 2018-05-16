<template>
    <div class="container">
		<h1 class="text-center p-4 m-4">Chains</h1>
        <table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Name</th>
                    <th>API URL</th>
                    <th>Created at</th>
                    <th>Uploaded at</th>
				</tr>
			</thead

			<tbody>
	            <router-link :to="chain.name + '/producers'" tag="tr" v-bind:key="chain.id" v-for="chain in chains" style="cursor:pointer;">
	                <td>{{chain.name}}</td>
                    <td>{{chain.api_url}}</td>
                    <td>{{chain.created_at}}</td>
                    <td>{{chain.updated_at}}</td>
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

</style>
