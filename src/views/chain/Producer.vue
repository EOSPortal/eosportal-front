<template>
<div class="container">
  <section class="contain">
		<h3>{{producer.owner}}</h3>
    <div v-if="bpStandardInfo === false" class="alert alert-warning" role="alert">
      This block producer is not following the standard <a href="https://github.com/EOSPortal/bp-info-standard">EOS BP Information Standard. Therefor, only the data from chain is avalible.</a>
    </div>
		<p>
			{{bpStandardInfo.description}}
		</p>
	</section>
  <hr/>
	<section class="contain">
		<table class="table table-striped table-hover" style="text-align: left; max-width:400px;">
			<tr>
				<th>Account</th>
				<td>{{producer.owner}}</td>
      </tr>
      <tr>
				<th>URL</th>
				<td><a :href="'//' + producer.url" >{{producer.url}}</a></td>
        </tr>
        <tr>
					<th>Location</th>
					<td>{{producer.location}}</td>
        </tr>
        <tr>
					<th>Total Votes %</th>
					<td>{{(producer.total_votes / chainData.total_producer_vote_weight * 100).toFixed(5)}}%</td>
        </tr>
				<tr>
          <th>Number of Votes</th>
					<td>{{parseInt(producer.total_votes)}}</td>
				</tr>
        <tr>
          <th>Last Produced Block</th>
					<td>{{(new Date(producer.last_produced_block_time*1000)).toLocaleDateString()}}</td>
        </tr>
        <tr>
					<th>Active Since</th>
					<td>{{new Date(producer.time_became_active * 1000).toLocaleDateString()}}</td>
        </tr>
		</table>
  </section>
</div>
        <!--
      <section style="margin-top:40px;">
        <h3>Debuging</h3>
         <h5>BP Chain Info:</h5>
        <pre>{{JSON.stringify(producer, null, " ")}}</pre>
        <h5>BP Standard Info:</h5>
        <pre>{{JSON.stringify(bpStandardInfo, null, " ")}}</pre>
      </section>
      -->
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { fetchJson } from "@/utils/api.util";
import { validateBpInfo } from "@/utils/bp-json-validation.util";
import { getTimeSince } from "@/utils/date.util";
@Component({
  computed: {
    ...mapGetters(["getProducerByOwner"]),
    ...mapState(["chainData"]),
    producer() {
      return (this as any).getProducerByOwner(this.$route.params.producer);
    },
    timeSinceLastBlock() {
      return getTimeSince((this as any).producer.last_produced_block_time);
    },
    becameActive() {
      return getTimeSince((this as any).producer.time_became_active);
    }
  },
  methods: {
    getBpStandardInfo() {
      console.log("url: " + (this as any).producer.url);
      fetchJson("//" + (this as any).producer.url + "/bp.json")
        .then(validateBpInfo)
        .catch(error => {
          console.log(
            "this BP does not have a avalibe valide bp.json at it's url root. Error: "
          );
          console.log(error);
          return false;
        })
        .then(_ => {
          console.log("result " + _);
          (this as any).bpStandardInfo = _;
        });
    }
  },
  components: {}
})
export default class Producer extends Vue {
  bpStandardInfo: any = {};

  mounted() {
    (this as any).getBpStandardInfo();
  }
}
</script>

<style lang="scss">
</style>
