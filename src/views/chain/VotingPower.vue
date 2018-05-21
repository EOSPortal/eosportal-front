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
        <section class="contain">
            <h2 class="flashy">It looks like you don't have <b>Scatter</b></h2>
            <p>
                In order to vote using this portal you will have to first install Scatter.
                Visit the <a href=""><u class="flashy">Chrome Store</u></a> to grab the latest version.
                <br><br>
                [IMAGES]
            </p>
        </section>
        <hr/>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        components: {

        },
        mounted(){
        	setTimeout(() => {

            }, 1000);
        }
    })
    export default class Producer extends Vue {}
</script>

<style lang="scss">

</style>