<template>
    <div class="header">
        <Menu></Menu>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Menu from './Menu';

    @Component({
        components: {
            Menu
        },
    })
    export default class Header extends Vue {}
</script>

<style lang="scss">

</style>