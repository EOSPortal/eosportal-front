<template>
    <div class="container">
        <section class="contain">
            <h3>Delegating Bandwidth</h3>
            <p>
                In order to vote you will need to stake some of your tokens for CPU and Bandwidth. This will allow you to use those
                same staked tokens for voting as well.
            </p>
        </section>
        <hr/>
        <section class="contain" v-if="!scatter || !identity">
            <section v-if="!scatter">
                <h2 class="flashy">It looks like you don't have <b>Scatter</b></h2>
                <p>
                    In order to vote using this portal you will have to first install Scatter.
                    Visit the <a href=""><u class="flashy">Chrome Store</u></a> to grab the latest version.
                    <br><br>
                    [IMAGES]
                </p>
            </section>
            <section v-if="scatter && !identity">
                <h2 class="flashy">We need an <b>Identity</b> to use</h2>
                <p>
                    Before you can use <b>EOS</b>Portal with Scatter you need to pair an Identity.
                    <br><br>
                </p>
                <section class="cta">
                    <button @click="pair">Use Identity</button>
                </section>
            </section>
        </section>
        <section v-else class="contain">
            Scatter ready
        </section>
        <hr/>
        <section class="contain">
            <!--<p>-->
                <!--{{percentage}}% ( {{voter}} )-->
            <!--</p>-->
            <!--<br>-->
            <!--<input type="range" v-model="percentage" />-->


        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {mapState, mapActions, mapMutations, mapGetters} from "vuex";


    @Component({
        components: {

        },
        computed:{
            ...mapState(["scatter", "voter"]),
            ...mapGetters(['identity']),
        },
        methods:{
            ...mapActions(['login'])
        }
    })
    export default class VotingPower extends Vue {
        login!:() => void;
        percentage:number = 0;

        pair(){
            this.login();
        }
    }
</script>

<style lang="scss">

</style>