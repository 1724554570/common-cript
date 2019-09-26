<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.upload-image {
  max-width: 120px;
  margin-top: 20px;
}
</style>
<template>
  <div class="md-content">
    <div class="va md-left">
      <TopicList/>

      <div style="padding-top:50px;">
        <button @click="uploadImage('imgs1')">uploadImage</button>
        <br/>
        <img class="upload-image" :src="arrayImage.imgs1">
      </div>
      <div style="padding-top:50px;">
        <button @click="uploadImage('imgs2')">uploadImage</button>
        <br/>
        <img class="upload-image" :src="arrayImage.imgs2">
      </div>
      <div style="padding-top:50px;">
        <button @click="uploadImage('imgs3')">uploadImage</button>
        <br/>
        <img class="upload-image" :src="arrayImage.imgs3">
      </div>
    </div>
    <div class="va md-right">
      <input
        ref="uploadID"
        id="uploadID"
        type="file"
        accept="image/*"
        @change="onFileUpload"
        hidden
      >
    </div>
  </div>
</template>

<script>
import TopicList from "./topic_list.vue";
import lrz from "../../static/lib/lrz2.js";
import utils from '../utils';

let getUpImageBase64 = (path, callback) => {
  path = path || this.files[0];
  new lrz(path, {
    before: function() {
      console.log("压缩开始");
    },
    fail: function(err) {
      console.error(err);
    },
    always: function() {
      console.log("压缩结束");
    },
    done: function(results) {
      // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
      console.log(results);
      typeof callback === "function" && callback(results);
    }
  });
};
export default {
  name: "HelloWorld",
  components: {
    TopicList
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App！",
      imgPath: "",
      arrayImage: {},
      arrayImage2: {}
    };
  },
  created() {},
  mounted() {
    console.log(utils.regExp_az.test('v_yuxjiang;'));
    utils.aa({2:'fgh',1:'asd',a:'ccc',bb:'ccc'})
  },
  methods: {
    uploadImage(ele) {
      let self = this;
      this.imgPath = ele;
      this.$refs.uploadID.click();
    },
    onFileUpload: function() {
      let self = this;
      let path = this.$refs.uploadID.files[0];
      getUpImageBase64(path, function(res) {
        let base64 = res.base64;
        self.$set(self.arrayImage, self.imgPath, base64);
      });
    }
  }
};
</script>
