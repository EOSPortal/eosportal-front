<template>
    <div class="producers">
        Chain: {{chainName}}
        <table>
            <tr v-bind:key="producer.id" v-for="producer in producers">
                <td>{{producer.name}}</td>
                <td>{{producer.organization}}</td>
                <td>{{producer.contact}}</td>
                <td>{{producer.location}}</td>
                <td>{{producer.p2p_url}}</td>
                <td>{{producer.api_url}}</td>
                <td>{{producer.organization}}</td>
                <td>{{producer.organization}}</td>
            </tr>
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