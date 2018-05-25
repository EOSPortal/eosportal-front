<template>
    <div class="container">
        <h1 class="text-center p-4 m-4">Producer</h1>
        <p>{{producer}}</p>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
      ...mapGetters(["getProducerByOwner"]),
      producer() {
          return this.getProducerByOwner(this.$route.params.producer)
      }
  },
  components: {}
})
export default class Producer extends Vue {
}
</script>

<style lang="scss">
</style>