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
					<th>Organization</th>
					<!--<th>Contact</th>-->
					<th>Location</th>
					<th>p2p</th>
					<th>api</th>
				</tr>
				</thead>

				<tbody>
				<router-link tag="tr" :to="producer.name" append v-for="producer in producers">
					<td>{{producer.name}}</td>
					<td>{{producer.organization}}</td>
					<!--<td>{{producer.contact}}</td>-->
					<td>{{producer.location}}</td>
					<td>{{producer.p2p_url}}</td>
					<td>{{producer.api_url}}</td>
				</router-link>
				</tbody>
			</table>
		</section>
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
