<template>
<div class="container block-producer">
	<section class="contain">
		<h3>{{ $t('lang.blockProducer') }}</h3>
		<table class="table table-striped table-hover" style="text-align: left; max-width:400px;" v-if="producer != null">
			<tr>
				<th>{{ $t('lang.account') }}</th>
				<td>{{producer.owner}}</td>
      </tr>
      <tr>
				<th>{{ $t('lang.url') }}</th>
				<td><a :href="producer.url" target="_blank">{{producer.url}}</a></td>
      </tr>
      <tr>
				<th>{{ $t('lang.location') }}</th>
				<td>{{producer.location}}</td>
      </tr>
      <tr>
				<th>{{ $t('lang.totalVotes') }} %</th>
				<td>{{(producer.total_votes / chainState.total_producer_vote_weight * 100).toFixed(5)}}%</td>
      </tr>
			<tr>
        <th>{{ $t('lang.numberOfVotes') }}</th>
				<td>{{parseInt(producer.total_votes)}}</td>
			</tr>
		</table>
  </section>
  
  <hr/>
  
  <section v-if="!loadingbBStandardInfo && !bpStandardInfo" class="contain">
    <small  role="alert" v-html="$t('lang.notStandard')"></small>
  </section>
  
  <section v-if="!loadingbBStandardInfo && bpStandardInfo" class="contain">
    <small>{{ $t('lang.informationProvidedBp') }}</small>
    <div>
      <img v-if="hasProp('org.branding.logo_256', bpStandardInfo)" class="logo" alt="" :src="bpStandardInfo.org.branding.logo_256"/>
		  <h3 v-if="hasProp('org.candidate_name', bpStandardInfo)">{{bpStandardInfo.org.candidate_name}}</h3>
    </div>
    <a v-if="hasProp('org.email', bpStandardInfo)" :href="'mailto:' + bpStandardInfo.org.email">{{ $t('lang.email') }}</a>
    <h5>{{ $t('lang.location') }}</h5>
    <p v-if="hasProp('org.location.name', bpStandardInfo)">
      {{bpStandardInfo.org.location.name}}, {{bpStandardInfo.org.location.country}}
    </p>
    <p v-if="!hasProp('org.location.name', bpStandardInfo)">
	    {{ $t('lang.noLocation') }}
    </p>
    <h5>{{ $t('lang.codeConduct') }}</h5>
    <p v-if="hasProp('org.code_of_conduct', bpStandardInfo)">
      {{bpStandardInfo.org.code_of_conduct}}
    </p>
    <p v-if="!hasProp('org.code_of_conduct', bpStandardInfo)">
	    {{ $t('lang.noConduct') }}
    </p>
    <h5>{{ $t('lang.social') }}</h5>
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
      if ((this as any).producer == null) {
        return;
      }
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
          (this as any).loadingbBStandardInfo = false;
        });
    },
    hasProp(path: string, data: any) {
      return !isEmpty(pathOr("", split(".", path))(data));
    }
  },
  watch: {
    producer() {
      (this as any).getBpStandardInfo();
    }
  },
  components: {}
})
export default class Producer extends Vue {
  bpStandardInfo: any = {};
  loadingbBStandardInfo = true;

  mounted() {
    (this as any).getBpStandardInfo();
  }
}
</script>

<style lang="scss">
</style>
