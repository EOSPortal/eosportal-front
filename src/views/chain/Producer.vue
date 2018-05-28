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
    
    <a class="btn btn-primary" :href="'//' + producer.url" role="button" target="_blank">Website</a>
	</section>
  <hr/>
	<section class="contain">
    <ul style="list-style: none;">
      <li>
        <h5 class="mb-1">Number of votes</h5>
        <p>{{parseInt(producer.total_votes)}}</p>
      </li>
      <l
        <h5 class="mb-1">Location</h5>
        <p>{{producer.location}}</p>
      </li>
      <li>
        <h5 class="mb-1">Last produced block</h5>
        <p>{{timeSinceLastBlock}} ago</p>
        <small>at {{new Date(producer.last_produced_block_time*1000)}}</small>
      </li>
      <li>
        <h5>Became active</h5>
        <p>{{becameActive}} ago</p>
        <small>at {{new Date(producer.time_became_active*1000)}}</small>
      </li>
	  </ul>
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
import { mapGetters } from "vuex";
import { fetchJson } from "@/utils/api.util";
import { validateBpInfo } from "@/utils/bp-json-validation.util";
import { getTimeSince } from "@/utils/date.util";
@Component({
  computed: {
    ...mapGetters(["getProducerByOwner"]),
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
