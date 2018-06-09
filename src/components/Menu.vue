<template>
    <nav>
        <section class="contain">
            <!-- HAMBURGER -->
            <!--<figure class="ham">-->
                <!--<hr/><hr/><hr/>-->
            <!--</figure>-->

            <!-- LOGO -->
            <router-link tag="figure" :to="{ name:'chains' }" class="logo">
                <img src="/img/logo.png" />
                <span><b>EOS</b>PORTAL</span>
            </router-link>

            <!-- LINKS -->
            <section class="links">
                <select @change="changeLanguage()" v-model="lang">
                    <option selected value="en">English</option>
                    <option value="kr">한국어</option>
                    <option value="cn">中文</option>
                    <option value="es">Español</option>
                    <option value="de">Deutsch</option>
                    <option value="no">Norsk</option>
                    <option value="se">Svenska</option>
					<option value="fr">French</option>
                </select>
                <!--<router-link class="link" :to="{ name: 'chains' }">{{ $t('lang.chains') }}</router-link>-->
                <router-link class="link important" :to="{ name: 'help' }">{{ $t('lang.help') }}</router-link>
                <section class="switcher" @click="toggleTheme()">
                    <figure class="switch" :class="{'selected':theme === 'dark'}"></figure>
                    <figure class="switch" :class="{'selected':theme === 'light'}"></figure>
                </section>
            </section>
        </section>
    </nav>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import {mapState, mapActions} from "vuex";

    @Component({
        components: {},
        props: {},
        computed: mapState(["theme"]),
        methods: {
            ...mapActions(['setTheme']),
        }
    })
    export default class Producers extends Vue {
        lang = "en";
    	theme!:string;
        setTheme!:(theme:string) => void;

        toggleTheme(){
            this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
        }

        changeLanguage(){
          this.$i18n.locale = this.lang;
        }
    }
</script>

<style lang="scss">

</style>
