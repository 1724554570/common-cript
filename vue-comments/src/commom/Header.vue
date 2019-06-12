<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../less/header.less";
</style>
<template>
  <div class="Nav-box">
    <div class="Nav-logo middle"></div>
    <div class="Nav-list middle">
      <a href="#" class="Nav-link middle active">首页</a>
    </div>
    <div class="Nav-right">
      <div class="user-info middle" v-if="login">
        <div class="avatar-img middle">
          <img
            src="https://img.xiaohongshu.com/avatar/5bc47b6138f791000156fc2d.jpg@80w_80h_90q_1e_1c_1x.jpg"
            alt="avatar"
          >
        </div>
        <div class="avatar-name middle">Machine</div>
      </div>
      <div class="user-option middle" v-if="!login">
        <div class="middle">登录</div>
        <div class="middle">注册</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      login: false
    };
  },
  created() {
    let users = window.sessionStorage.getItem("users");
    if (users) {
      this.login = true;
    }
    this.login = true;
  },
  mounted() {},
  methods: {}
};
</script>

