<template>
    <section>
        <section class="contain">
            <h3>Chain Information</h3>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </section>
        <hr/>
        <section class="contain">

        </section>

    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { mapState } from "vuex";

    @Component({
        components: {

        },
        computed: mapState([""]),
    })
    export default class Info extends Vue {}
</script>

<style lang="scss">

</style>