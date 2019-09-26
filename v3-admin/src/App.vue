<template>
<!-- Container -->
<div id="container">
    <!-- Header -->
    <div id="header">
        <div class="box">
            <div id="branding">
                <h1>Apiyux.com</h1>
            </div>
            <div id="user-tools" v-if="loginUser">
                <strong>{{loginUser}}</strong>.
                <a href="/logout">退出</a>
            </div>
            <div id="user-tools" v-else><a href="/login">登录</a></div>
        </div>
    </div>
    <!-- END Header -->

    <div class="breadcrumbs">
        <div class="box">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
    </div>
    <!-- <ul class="messagelist"><li></li></ul> -->

    <!-- Content -->
    <div id="content" class="{% block coltype %}{% endblock %}">
        <div id="app">
            <div id="nav">
                <router-link to="/">Home</router-link> |
                <router-link to="/about">About</router-link>
            </div>
            <router-view />
        </div>
        <br class="clear">
    </div>
    <!-- END Content -->

</div>
</template>

<style lang="scss">
@font-face {
    font-family: "Roboto";
    src: url("./assets/fonts/Roboto-Bold-webfont.woff");
    font-weight: 700;
    font-style: normal;
}

@font-face {
    font-family: "Roboto";
    src: url("./assets/fonts/Roboto-Regular-webfont.woff");
    font-weight: 400;
    font-style: normal;
}

@font-face {
    font-family: "Roboto";
    src: url("./assets/fonts/Roboto-Light-webfont.woff");
    font-weight: 300;
    font-style: normal;
}

@import "assets/styles/common.scss";
@import "assets/styles/base.scss";
@import "assets/styles/reset.scss";
</style>

<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component({})
export default class Application extends Vue {

    private loginUser: string = '';

    private created() {
        const user = localStorage.getItem('user');
        if (user) {
            this.loginUser = user;
        }
    }
}
</script>
