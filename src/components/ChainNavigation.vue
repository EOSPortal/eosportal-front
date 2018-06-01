<template>
    <section>
        <section class="contain chain-nav">
            <!--<router-link exact-active-class="active" tag="button" :to="{ name: 'power' }">{{ $t('lang.votingPower') }}</router-link>-->
            <router-link exact-active-class="active" tag="button" :to="{ name: 'producers' }">{{ $t('lang.producers') }}</router-link>
            <router-link exact-active-class="active" tag="button" :class="{'full':!canShowScatterButton()}" :to="{ name: 'info' }" exact>{{ $t('lang.chainInfo') }}</router-link>
            <button v-if="canShowScatterButton()" @click="loginWithScatter">{{ suggestingNetwork ? 'Use Chain' : $t('lang.scatter') }}</button>

            <!-- ACTIVATED STAKE ( I think? ) -->
            <!--<br><br>-->
            <!--{{(((chainState.total_activated_stake/10000) / '1000000000.0000') * 100).toFixed(4)}}%-->
        </section>
        <hr/>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {mapActions, mapGetters, mapState} from "vuex";
    import {getAccount} from "@/utils/eos.util";
    /**
     * Bootstrap-vue components
     */

    @Component({
        components: {

        },
        computed:{
            ...mapState(["scatter", 'chainState', 'network']),
            ...mapGetters(['identity', 'account']),
        },
        methods:{
            ...mapActions(['login'])
        }
    })

    export default class ChainNavigation extends Vue {
        scatter!:any;
        identity!:any;
        network!:any;
        account!:any;
        login!:() => void;
        suggestingNetwork:boolean = true;

        canShowScatterButton(){
        	if(!this.scatter) return true;
        	if(!this.identity) return true;
        	if(!this.account) return true;
//        	if(this.account) return true;
            return false;
        }

    	async loginWithScatter(){
            // User does not have Scatter.
    		if(!this.scatter)
                return this.$router.push('/help#setting-up-scatter');

    		if(this.suggestingNetwork){
                this.suggestingNetwork = !await this.scatter.suggestNetwork(this.network).catch(() => false);
                return;
            }



    		await this.login();
            if(!this.account || !await getAccount(this.account.name)) {
                alert("There was an issue finding this account on the network. Perhaps it doesn't exist on this chain.");
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss">

</style>