<style lang="less">
@import "./less/basic.less";
@import "./less/main.less";
</style>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <div class="header">
      <Header/>
    </div>
    <div class="min-header"></div>
    <div class="content">
      <router-view/>
    </div>
    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from "./commom/Header.vue";
import Footer from "./commom/Footer.vue";
export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>
