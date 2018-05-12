<template>
    <div class="l-header">
		<nav class="container navbar navbar-expand-lg">
			<div class="mx-auto">
				<router-link class="navbar-brand" to="/">EOSPortal</router-link>
			</div>

			<div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
	        	<Menu></Menu>
			</div>
		</nav>
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
