<template>
    <nav>
        <section class="contain">
            <!-- HAMBURGER -->
            <!--<figure class="ham">-->
                <!--<hr/><hr/><hr/>-->
            <!--</figure>-->

            <!-- LOGO -->
            <router-link tag="figure" :to="{ name:'chains' }" class="logo">
                <img src="img/logo.png" />
                <b>EOS</b>PORTAL
            </router-link>

            <!-- LINKS -->
            <section class="links">
                <router-link class="link" :to="{ name: 'chains' }">Chains</router-link>
                <router-link class="link" :to="{ name: 'help' }">Help</router-link>
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
        	toggleTheme(){
                this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
            },
            ...mapActions(['setTheme']),
        }
    })
    export default class Producers extends Vue {
    	theme!:string;
        setTheme!:(theme:string) => void;

        toggleTheme(){
            this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
        }
    }
</script>

<style lang="scss">
    .switcher {
        overflow: hidden;
        float:right;
        margin-left:10px;
        border-radius:5px;

        .switch {
            cursor: pointer;
            height:48px;
            background:rgba(0,0,0,0.2);
            float:left;
            box-shadow:inset 0 -15px 50px -10px rgba(0,0,0,0.2);
            transition: all 0.5s ease-in;
            transition-property: width;

            $small-width:8px;
            $long-width:40px;

            &:last-child {
                background:#fff;
                width:$small-width;

                &.selected {
                    width:$long-width;
                }
            }

            &:first-child {
                background:#666;
                width:$small-width;

                &.selected {
                    width:$long-width;
                }
            }
        }
    }
</style>

