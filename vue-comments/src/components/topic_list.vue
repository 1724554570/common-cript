<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.topic-list {
  .item {
    position: relative;
    background: #fff;
    border-top: 1px solid #f0f0f0;
    padding: 10px;
    text-align: left;
  }
  .avatar {
    img {
      width: 100%;
      height: 100%;
    }
    width: 30px;
    height: 30px;
    border-radius: 3px;
    overflow: hidden;
  }
  .reply-count{
      //回复数
      .replys{color: #000;}
      //分割符
      .separs{color: #000;}
      //点击数
      .visits{color: #000;}
      max-width: 70px;
      margin-left: 6px;
      margin-right: 6px;
  }
  .title-wrap{
      .links{
          &:hover{
              text-decoration: underline;
          }
        color: #333;
        max-width: 86%;
        text-decoration: none;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 16px;
        line-height: 30px;
        overflow: hidden;
      }
    max-width: 70%;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  margin: 0;
}
.label{
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
}
.tp1{
    background-color: #e5e5e5;
    color: #999;
}
</style>
<template>
  <div class="topic-list">
    <div class="item">
      <a class="vm avatar">
        <img src="https://avatars3.githubusercontent.com/u/3118295?v=4&amp;s=120" title="i5ting">
      </a>
      <span class="vm reply-count">
          <span class="replys">0</span>
          <span class="separs">/</span>
          <span class="visits">0</span>
      </span>
      <div class="vm title-wrap">
          <span class="vm label tp1">JavaScript</span>
          <a class="vm links" href="//www/baidu.com">JavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScript</a>
      </div>
    </div>
    <div class="item">
      <a class="vm avatar">
        <img src="https://avatars3.githubusercontent.com/u/3118295?v=4&amp;s=120" title="i5ting">
      </a>
      <span class="vm reply-count">
          <span class="replys">0</span>
          <span class="separs">/</span>
          <span class="visits">0</span>
      </span>
      <div class="vm title-wrap">
          <span class="vm label tp1">JavaScript</span>
          <a class="vm links" href="//www/baidu.com">JavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScriptJavaScript</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
      getTopicList(pageIndex){
          
      }
  }
};
</script>

