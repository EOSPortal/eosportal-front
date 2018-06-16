<template>
    <div class="container">
        <section class="contain">
            <h3>{{ $t('lang.delegatingBandwidth') }}</h3>
            <p v-html="$t('lang.delegatingBandwidthInfo')"></p>
        </section>
        <hr/>
        <section class="contain" v-if="!scatter || !identity">
            <section v-if="!scatter">
                <h1 v-html="$t('lang.noScatter')"></h1>
                <h2>
                    {{ $t('lang.noScatterInfo') }}
                    <br><br>
                    <b>Visit the <router-link to="/help#setting-up-scatter"><u>Help</u></router-link> page to find out more about installing and setting up Scatter.</b>
                </h2>
            </section>
            <section v-if="scatter && !identity">
                <h1 v-html="$t('lang.noIdentity')"></h1>
                <h2 v-html="$t('lang.noIdentityInfo')"></h2>
            </section>
        </section>
        <section class="contain" v-if="voter">

            <section class="stake-controller">
                <figure class="total-stake" style="max-width:400px;">
                    <input :max="totalBalance" min="1" v-model="toStake" type="range" />
                    <h2>{{ $t('lang.power') }}: {{toStake}} {{ $t('lang.of') }} {{totalBalance}} <b>{{symbol}}</b></h2><br>
                </figure>

                <section class="chain-nav" style="margin-top:0;">
                    <button @click="delegateBW">{{ $t('lang.setVotingPower') }}</button>
                </section>
            </section>

            <hr />

            <h3>{{ $t('lang.eosAccountDetails') }}</h3>
            <table class="account-details">
                <tr>
                    <th>{{ $t('lang.account') }}</th>
                    <td>
                        <ul>
                            <li>{{ $t('lang.name') }}: {{voter.account_name}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>{{ $t('lang.cpuLimits') }}</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.cpu_limit)">{{key}}: {{voter.cpu_limit[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>{{ $t('lang.netLimits') }}</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.net_limit)">{{key}}: {{voter.net_limit[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr v-if="voter.delegated_bandwidth">
                    <th>{{ $t('lang.delegatedBandwidth') }}</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.delegated_bandwidth)">{{key}}: {{voter.delegated_bandwidth[key]}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>{{ $t('lang.ram') }}</th>
                    <td>
                        <ul>
                            <li>{{ $t('lang.quota') }} - {{voter.ram_quota}}</li>
                            <li>{{ $t('lang.usage') }} - {{voter.ram_usage}}</li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <th>{{ $t('lang.totalResources') }}</th>
                    <td>
                        <ul>
                            <li v-for="key in Object.keys(voter.total_resources)">{{key}}: {{voter.total_resources[key]}}</li>
                        </ul>
                    </td>
                </tr>
            </table>

            <div style="height:200px;"></div>


        </section>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import {
  getAccount,
  getSystemTokenStats,
  stakableTokenBalance,
  delegate,
  undelegate,
  refundRequest
} from "@/utils/eos.util";
import { pathOr } from "ramda";

@Component({
  components: {},
  computed: {
    ...mapState(["scatter", "voter", "chainState"]),
    ...mapGetters(["identity"])
  },
  methods: {
    ...mapActions(["setVoter"])
  }
})
export default class VotingPower extends Vue {
  setVoter!: (voter: any) => void;
  voter!: any;
  symbol: string = "SYS";
  decimals: number = 0;
  percentage: number = 0;
  totalBalance: number | null = null;
  toStake: number = 0;
  forNet: number = 50;

  forCPU() {
    return 100 - this.forNet;
  }

  mounted() {
    this.initialize();
  }

  async initialize() {
    if (this.voter) {
      this.symbol = this.voter.total_resources.cpu_weight.split(" ")[1];
      this.toStake = this.voter.voter_info
        ? this.voter.voter_info.staked / 10000
        : 0;

      const tokens: string = await stakableTokenBalance(
        this.voter.account_name,
        this.symbol
      );

      const delegated = this.voter.self_delegated_bandwidth
        ? parseFloat(this.voter.self_delegated_bandwidth.cpu_weight.split(" ")[0]) +
          parseFloat(this.voter.self_delegated_bandwidth.net_weight.split(" ")[0])
        : 0;

      this.totalBalance = delegated + parseFloat(tokens.split(" ")[0]);

      const refunding: any = await refundRequest(this.voter.account_name);
      if (refunding) {
        this.totalBalance +=
          parseFloat(refunding.cpu_amount.split(" ")[0]) +
          parseFloat(refunding.net_amount.split(" ")[0]);
      }

      const zeroes = this.voter.total_resources.cpu_weight
        .split(" ")[0]
        .split(".")[1].length;
      this.decimals = parseInt(
        `1${[...Array(zeroes).keys()].map(() => 0).join("")}`
      );
    }
  }

  async delegateBW() {
    const fix = (n: number) =>
      parseFloat(n.toFixed(this.decimals.toString().length));
    const symbolWrap = (n: number) => `${n} ${this.symbol}`;
    const previousStake = this.voter.voter_info
      ? this.voter.voter_info.staked / 10000
      : 0;
    const delta = this.toStake - previousStake;
    if (delta === 0) return false;

    const delegationPromise =
      delta > 0
        ? delegate(
            this.voter.account_name,
            symbolWrap(fix(delta / 2)),
            symbolWrap(fix(delta / 2))
          )
        : undelegate(
            this.voter.account_name,
            symbolWrap(fix(Math.abs(delta) / 2)),
            symbolWrap(fix(Math.abs(delta) / 2))
          );

    await delegationPromise
      .catch(error => {
        let errorJson = error;
        try {
          errorJson = JSON.parse(error);
        } catch (e) {}
        console.log("error: " + errorJson);
        (this as any).$toasted.error(
          "Delegation failed: " +
            pathOr(
              pathOr("unknown errror", ["message"], errorJson),
              ["error", "what"],
              errorJson
            ),
          {
            theme: "primary",
            position: "top-center",
            duration: 5000
          }
        );
        throw Error("Delegation failed");
      })
      .then(responds => {
        console.log("sucsess: " + JSON.stringify(responds));
        (this as any).$toasted.success("Delagation succesfull", {
          theme: "primary",
          position: "top-center",
          duration: 3000
        });
      });
    await this.setVoter(await getAccount(this.voter.account_name));
  }

  @Watch("voter")
  voterChanged() {
    this.initialize();
  }
}
</script>

<style lang="scss">
.account-details {
  text-align: left;
  max-width: 800px;
}
</style>