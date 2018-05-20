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
            </section>
        </section>
    </nav>
</template>

