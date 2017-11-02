<template>
    <div class="main">
        <m-header :title="title"></m-header>
        <div class="main">
            <!-- <div class="line">
            </div> -->
            <span>标题</span>
            <div style="border:1px solid #ededed; margin:0px 10px;">
              <input class="input1" v-model="msg.title" placeholder="请输入标题" type="text" @input="inputFuction">
            </div>
            <!-- <div class="line">
            </div> -->
            <!-- <el-input class="input2" :rows="6" v-model="msg.content" placeholder="请输入反馈内容" type="textarea" @input="inputFuction"></el-input> -->
            <span>内容</span>

            <div style="border:1px solid #ededed; margin:0px 10px;">
              <textarea class="input2" name="" id="" cols="30" rows="6" v-model="msg.content" placeholder="请输入反馈内容" @input="inputFuction"></textarea>
            </div>
            <div>
                <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="text" @click="btnClick">提交</el-button>
                <el-button v-else :disabled="disabled" class="btnDefault" type="text" @click="btnClick">提交</el-button>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>

.main {
  display: flex;
  flex-direction: column;
  span{
    text-align: left;
    margin: 10px;
    color: #cdcdcd;
  }
  .line {
    background: #ededed;
    height: 10px;
  }
  .input1 {
    width: 100%;
    // margin: 10px 10px;
    height: 30px;
    border: none;
    outline:none;
  }
  .input2 {
    // margin: 0px 10px 0px 10px;
    // width: 90%;
    // border: none;
    outline:none;
    width: 100%;
  }
  .btnDefault {
    background: rgb(214, 49, 70);
    margin-top: 40px;
    margin-bottom: 20px;
    width: 70%;
    height: 40px;
    font-size: 16px;
    color: #fff;
  }

  .btnEnable {
   background: rgba(214, 49, 70, 0.5);
  margin-top: 40px;
  margin-bottom: 20px;
  width: 70%;
  height: 40px;
  font-size: 16px;
  color: #fff;
  }
}
</style>

<script>
import mHeader from "../../components/hearder/Hearder";
import sha256 from "../../util/sha256";
export default {
  data() {
    return {
      title: {
        text: "意见反馈",
        showBack: true
      },
      msg: {
        title: "",
        content: ""
      },
      disabled: true
    };
  },
  components: {
    mHeader
  },
  methods: {
    inputFuction() {
      if (this.msg.title.length > 0 && this.msg.content.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    btnClick() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Feedback" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&Title=" +
        this.msg.title +
        "&Message=" +
        this.msg.content +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Feedback");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Title", this.msg.title);
      data.append("Message", this.msg.content);
      data.append("Sign", sha256.sha256(signStr).toUpperCase());

      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          // this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
