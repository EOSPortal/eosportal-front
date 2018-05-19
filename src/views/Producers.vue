<template>
    <div class="container">
		<h1 class="text-center p-4 m-4">Producers</h1>
        <p>Chain: {{chainId}}</p>
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
	            <tr v-for="producer in producers">
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
import { mapState, mapActions, mapMutations } from "vuex";

@Component({
  components: {},
  props: {},
  computed: mapState(["chainId", "producers"]),
  methods: {
    ...mapActions(["getProducers"]),
    ...mapMutations(["setChain"])
  },
  watch: {
    "$route.params.chainId": () => {
      this.setNewChain(parseInt(this.$route.params.chainId));
    }
  }
})
export default class Producers extends Vue {
  producers: Array<any>;
  getProducers: () => void;
  setChain: (chainId: number) => void;

  created() {
    this.setNewChain(parseInt(this.$route.params.chainId));
  }

  setNewChain(_chainId: number) {
    this.setChain(_chainId);
    this.getProducers();
  }
}
</script>

<style lang="scss">

</style>
