<template>
    <div @touchmove.prevent>
        <m-header :title="title"></m-header>

        <!-- <div class="maincontainer">
            <div class="content">
                <form @submit.prevent="submit">
                    <div class="bottom">
                        <input class="input" v-model="user.username" type="text" maxlength="20" placeholder="请输入账号" @input="inputFuction">
                        <div style="display:flex; align-items: middle;">
                            <input style="width:50%,margin-top:0px;" class="input" v-model="user.verify" type="text" maxlength="4" placeholder="验证码" @input="inputFuction">
                            <img style="margin-top:20px;margin-left:10px;" :src="user.imgurl" alt="" @click="getData()">
                        </div>
                    </div>
                    <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" native-type="submit">下一步</el-button>
                    <el-button v-else :disabled="disabled" class="btnDefault" type="primary" native-type="submit">下一步</el-button>
                </form>
            </div>
        </div> -->

        <div class="top">
            <form @submit.prevent="submit">
                <div class="cell">
                    <img src="../../static/images/yonghu.png" alt="">
                    <input v-model="user.username" type="text" maxlength="20" placeholder="请输入账号" @input="inputFuction">
                </div>
                <div class="cell" style="border-top:0px;">
                    <img src="../../static/images/mima.png" alt="">
                    <input style="width:40%,margin-top:0px;border-top:0px;" class="input" v-model="user.verify" type="text" maxlength="4" placeholder="验证码" @input="inputFuction">
                    <img style="margin-top:0px;margin-bottom:0px;height:50px;margin-right:0px;" :src="user.imgurl" alt="" @click="getData()">
                </div>
        
                <div>
                    <el-button v-if="disabled" class="btnEnable" type="text" native-type="submit">下一步</el-button>
                    <el-button v-else class="btnDefault" type="text" native-type="submit">下一步</el-button>
                </div>
            </form>
        </div>
    </div>
</template>

<style lang="less" scoped>
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgb(199, 199, 205);
  font-size: 14px;
}

.top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin-top: 60px;

  .cell {
    display: flex;
    flex-direction: row;
    border: 1px solid #efefef;
    height: 50px;
    span {
      font-size: 14px;
      font-weight: 320;
      color: black;
      width: 20%;
      margin: 3% 1%;
      text-align: right;
    }
    img {
      height: 20px;
      margin: 15px;
    }
    input {
      width: 70%;
      outline: none;
    }
  }
}

.btnDefault {
  background: rgb(214, 49, 70);
  margin-top: 40px;
  margin-bottom: 20px;
  width: 70%;
  height: 40px;
  font-size: 16px;
  color: #fff;
  border: 0px;
}

.btnEnable {
  background: rgba(214, 49, 70, 0.5);
  margin-top: 40px;
  margin-bottom: 20px;
  width: 70%;
  height: 40px;
  font-size: 16px;
  color: #fff;
  border: 0px;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
export default {
  name: "lossPwdVC",
  data() {
    return {
      title: {
        text: "忘记密码",
        showBack: true
      },
      user: {
        username: "",
        verify: "",
        vcode: "",
        imgurl: ""
      },
      disabled: true
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append("Action", "GetImgVCode");
      this.$http
        .post("https://idx.camew.com", data)
        .then(res => {
          console.log(res);
          this.user.vcode = res.data.Data.token;
          this.user.imgurl = "https://idx.camew.com" + res.data.Data.imgpath;
        })
        .catch(error => {
          console.log(error);
        });
    },
    inputFuction() {
      if (this.user.username.length > 0 && this.user.verify.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    submit: function(event) {
      // 请求数据
      let data = new FormData();
      data.append("Action", "QueryUserByAccount");
      data.append("Account", this.user.username);
      data.append("ImgCode", this.user.vcode + this.user.verify);
      localStorage.Username = this.user.username;
      this.$http
        .post("https://idx.camew.com", data)
        .then(res => {
          console.log(res);
          if (res.data.Code == "Suc") {
            localStorage.phoneNum = res.data.Data;
            this.$router.push({
              path: "/lossPwd"
            });
          } else {
            localStorage.removeItem("phoneNum");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  components: {
    mHeader
  }
};
</script>