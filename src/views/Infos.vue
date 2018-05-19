<template>
    <div class="container">
        <h1 class="text-center p-4 m-4">Chain Information</h1>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import { mapState } from "vuex";

    @Component({
        components: {

        },
        computed: mapState([""]),
    })
    export default class Infos extends Vue {}
</script>

<style lang="scss">

</style>