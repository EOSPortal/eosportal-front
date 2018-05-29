<template>
    <section>
        <section class="contain chain-nav">
            <router-link exact-active-class="active" tag="button" :to="{ name: 'power' }">Voting Power</router-link>
            <router-link exact-active-class="active" tag="button" :to="{ name: 'producers' }">Producers</router-link>
            <router-link exact-active-class="active" tag="button" :class="{'full':!canShowScatterButton()}" :to="{ name: 'info' }" exact>Chain Info</router-link>
            <button v-if="canShowScatterButton()" @click="loginWithScatter">Scatter</button>
        </section>
        <hr/>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {mapActions, mapGetters, mapState} from "vuex";
    /**
     * Bootstrap-vue components
     */

    @Component({
        components: {

        },
        computed:{
            ...mapState(["scatter"]),
            ...mapGetters(['identity', 'account']),
        },
        methods:{
            ...mapActions(['login'])
        }
    })

    export default class ChainNavigation extends Vue {
        scatter!:any;
        identity!:any;
        account!:any;
        login!:() => void;

        canShowScatterButton(){
        	if(!this.scatter) return true;
        	if(!this.identity) return true;
        	if(!this.account) return true;
//        	if(this.account) return true;
            return false;
        }

    	loginWithScatter(){
    		//TODO: Forward to Scatter help
            // User does not have Scatter.
    		if(!this.scatter) return false;

    		this.login();
        }
    }
</script>

<style lang="scss">

</style>