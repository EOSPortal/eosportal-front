<template>
<div class="container block-producer">
	<section class="contain">
		<h3>Block Producer</h3>
		<table class="table table-striped table-hover" style="text-align: left; max-width:400px;">
			<tr>
				<th>Account</th>
				<td>{{producer.owner}}</td>
      </tr>
      <tr>
				<th>URL</th>
				<td><a :href="'//' + producer.url" target="_blank">{{producer.url}}</a></td>
      </tr>
      <tr>
				<th>Location</th>
				<td>{{producer.location}}</td>
      </tr>
      <tr>
				<th>Total Votes %</th>
				<td>{{(producer.total_votes / chainState.total_producer_vote_weight * 100).toFixed(5)}}%</td>
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
  
  <hr/>
  
  <section v-if="!bpStandardInfo" class="contain">
    <small  role="alert">
      This block producer is not following the standard <a href="https://github.com/EOSPortal/bp-info-standard">EOS BP Information Standard. Therefor, only the data from chain is avalible.</a>
    </small>
  </section>
  
  <section v-if="bpStandardInfo" class="contain">
    <small>The information below is provided by the Block Producer.</small>
    <div>
      <img v-if="hasProp('org.branding.logo_256', bpStandardInfo)" class="logo" alt="" :src="bpStandardInfo.org.branding.logo_256"/>
		  <h3 v-if="hasProp('org.candidate_name', bpStandardInfo)">{{bpStandardInfo.org.candidate_name}}</h3>
    </div>
    <a v-if="hasProp('org.email', bpStandardInfo)" :href="'mailto:' + bpStandardInfo.org.email">Email</a>
    <h5>Location</h5>
    <p v-if="hasProp('org.location.name', bpStandardInfo)">
      {{bpStandardInfo.org.location.name}}, {{bpStandardInfo.org.location.country}}
    </p>
    <p v-if="!hasProp('org.location.name', bpStandardInfo)">
      Unspecified location.
    </p>
    <h5>Code of Conduct</h5>
    <p v-if="hasProp('org.code_of_conduct', bpStandardInfo)">
      {{bpStandardInfo.org.code_of_conduct}}
    </p>
    <p v-if="!hasProp('org.code_of_conduct', bpStandardInfo)">
      Unspecified code of conduct.
    </p>
    <h5>Social</h5>
    <ul>
      <li v-if="hasProp('org.social.steemit', bpStandardInfo)"><a :href="'https://steemit.com/@' + bpStandardInfo.org.social.steemit" target="_blank">Steemit</a></li>
      <li v-if="hasProp('org.social.twitter', bpStandardInfo)"><a :href="'https://twitter.com/' + bpStandardInfo.org.social.twitter" target="_blank">Twitter</a></li>
      <li v-if="hasProp('org.social.youtube', bpStandardInfo)"><a :href="'https://www.youtube.com/' + bpStandardInfo.org.social.youtube" target="_blank">YouTube</a></li>
      <li v-if="hasProp('org.social.facebook', bpStandardInfo)"><a :href="'https://www.facebook.com/' + bpStandardInfo.org.social.facebook" target="_blank">Facebook</a></li>
      <li v-if="hasProp('org.social.github', bpStandardInfo)"><a :href="'https://github.com/' + bpStandardInfo.org.social.github" target="_blank">GitHub</a></li>
      <li v-if="hasProp('org.social.reddit', bpStandardInfo)"><a :href="'https://www.reddit.com/r/' + bpStandardInfo.org.social.reddit" target="_blank">Reddit</a></li>
      <li v-if="hasProp('org.social.keybase', bpStandardInfo)"><a :href="'https://keybase.io/' + bpStandardInfo.org.social.keybase" target="_blank">Keybase</a></li>
      <li v-if="hasProp('org.social.telegram', bpStandardInfo)"><a :href="'https://t.me/' + bpStandardInfo.org.social.telegram" target="_blank">Telegram</a></li>
      <li v-if="hasProp('org.social.wechat', bpStandardInfo)"><a :href="'weixin://dl/chat?' + bpStandardInfo.org.social.wechat" target="_blank">WeChat</a></li>
    </ul>
	</section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters, mapState } from "vuex";
import { fetchJson, getBpStandardInfo } from "@/utils/api.util";
import { validateBpInfo } from "@/utils/bp-json-validation.util";
import { getTimeSince } from "@/utils/date.util";
import { pathOr, split, isEmpty } from "ramda";

@Component({
  computed: {
    ...mapGetters(["getProducerByOwner"]),
    ...mapState(["chainState"]),
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
      let url = (this as any).producer.url;
      if (!url) {
        return;
      }
      getBpStandardInfo(url)
      .then(validateBpInfo)
        .catch(error => {
          console.log(
            "this BP does not have a available validated bp.json at it's url root. Error: "
          );
          console.log(error);
          return false;
        })
        .then(bpInfo => {
          (this as any).bpStandardInfo = bpInfo;
        });
    },
    hasProp(path: string, data: any) {
      return !isEmpty(pathOr('', split(".", path))(data));
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
