<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.Footer-box {
  a {
    text-decoration: none;
  }
  width: 100%;
  max-width: 1200px;
  margin: auto;
  padding: 10px 0;
  border-top: 1px solid #d1d1d1;
}
.Footer-right {
  a {
    font-size: 14px;
    color: #000;
  }
}
</style>
<template>
  <div class="Footer-box">
    <div class="Footer-right">Copyright © 2018.
      <a href="//wwww.apiyux.com">apiyux.com</a> All rights reserved.
      <a href="http://www.miitbeian.gov.cn">粤ICP备18046099号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

