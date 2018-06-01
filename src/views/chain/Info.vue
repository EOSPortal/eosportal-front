<template>
    <section>
        <section class="contain">
            <h3>Chain Information</h3>
        </section>
        <hr/>
        <section class="contain">
		<table class="table table-striped table-hover" style="text-align: left; max-width:600px;">
		   <tr>
				<th>Number of BPs connected (producing or not)</th>
				<td>{{producers.length}}</td>
           </tr>
           <tr>
				<th>Booted Date</th>
				<td>{{new Date(firstBlock.timestamp).toLocaleDateString()}}</td>
           </tr>
           <!--
           <tr>
				<th>Total Votes</th>
				<td>{{parseInt(chainState.total_producer_vote_weight)}}</td>
           </tr>
           <tr>
				<th>Voter Percentage</th>
				<td>??</td>
           </tr>
           -->
		   <tr>
                <th>Total blocks produced</th>
				<td>{{chainInfo.head_block_num}}</td>
		   </tr>
		</table>

        </section>


        <hr/>
         <section class="contain">
         <h3>Chain Health</h3>

		<table class="table table-striped table-hover" style="text-align: left; max-width:600px;">
		   <tr>
				<th>All time percentage of optimal number of blocks produced</th>
				<td>{{isNaN(allTimeChainHealth)? allTimeChainHealth: allTimeChainHealth.toFixed(2)}} %</td>
           </tr>
      		   <tr>
				<th>Last day percentage of optimal number of blocks produced</th>
				<td>{{isNaN(lastDayHelth) ? lastDayHelth: lastDayHelth.toFixed(2)}} %</td>
           </tr>
		</table>

        </section>

    </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";
import { getBlock, getInfo } from "@/utils/eos.util";
import { split, path } from "ramda";

@Component({
  components: {},
  computed: {
    ...mapState(["producers", "chainState", "chainData"])
  }
})
export default class Info extends Vue {
  firstBlock: any = {};
  chainInfo: any = {};
  allTimeChainHealth: number | string = "loading...";
  lastDayHelth: number | string = "loading...";

  async created() {
    await Promise.all([
      getBlock(1).then((block: any) => (this.firstBlock = block)),
      getInfo().then((info: any) => (this.chainInfo = info))
    ]);
    this.computeAllTimeChainHealth(
      Date.now(),
      new Date(this.firstBlock.timestamp).getTime(),
      this.chainInfo.head_block_num
    );
    this.chainHealth(Date.now(), 86400000, this.chainInfo.head_block_num);
  }

  computeAllTimeChainHealth(
    timestampNowMs: number,
    timestampBootMs: number,
    numberOfBlocksProduces: number
  ): void {
    const optimalNumberOfBlocks = (timestampNowMs - timestampBootMs) / 500;
    const missedBlocks = optimalNumberOfBlocks - numberOfBlocksProduces;
    this.allTimeChainHealth =
      100 / optimalNumberOfBlocks * numberOfBlocksProduces;
  }

  async chainHealth(
    timestampNowMs: number,
    durationMs: number,
    headBlockNumber: number
  ): Promise<void> {
    const optimalNumberOfBlocks = durationMs / 500;
    const blockNumber = headBlockNumber - optimalNumberOfBlocks;
    const optimalTimeOnBlock = timestampNowMs - durationMs;

    const block = await getBlock(blockNumber);
    const timeOnBlock = new Date(block.timestamp).getTime();
    const delay = optimalTimeOnBlock - timeOnBlock;
    this.lastDayHelth = 100 / durationMs * delay;
  }
}
</script>

<style lang="scss">
</style>