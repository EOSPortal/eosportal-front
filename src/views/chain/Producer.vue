<template>
    <div class="container">
        <section class="contain">
			<h3>{{producer.owner}}</h3>
			<p>
				
			</p>
		</section>
        <hr/>
		<section class="contain">
            <pre>{{JSON.stringify(producer, null, " ")}}</pre>
            <pre>{{JSON.stringify(bpInfo, null, " ")}}</pre>
		</section>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import { fetchJson } from "@/utils/api.util";

@Component({
  computed: {
    ...mapGetters(["getProducerByOwner"]),
    producer() {
      return this.getProducerByOwner(this.$route.params.producer);
    },
    bpInfo() {
      return fetchJson("//" + this.producer.url + "/bp.json");
    }
  },
  components: {}
})
export default class Producer extends Vue {
}
</script>

<style lang="scss">
</style>