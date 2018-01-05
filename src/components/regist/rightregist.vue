<template>
  <!-- <div class="maincontainer" >
    <div class="content">
      <form @submit.prevent="submit">
        <div>
          <input class="input" v-model="user.name" type="text" maxlength="20" placeholder="请输入用户名" @input="inputFuction">
          <input class="input" v-model="user.num" type="number" maxlength="11" placeholder="安全手机" @input="inputFuction">
          <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入密码" @input="inputFuction">
          <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="请确认密码" @input="inputFuction">
          <div style="display:flex; align-items: middle;">
            <input style="width:50%,margin-top:0px;" class="input" v-model="user.yanzhengma" type="text" maxlength="4" placeholder="验证码" @input="inputFuction">
            <img style="margin-top:20px;margin-left:10px;" :src="user.imgurl" alt="" @click="getData()">
          </div>
        </div>

        <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" native-type="submit">注册</el-button>
        <el-button v-else :disabled="disabled" class="btnDefault" type="primary" native-type="submit">注册</el-button>
      </form>
    </div>
  </div> -->
  <div class="top">
    <form @submit.prevent="submit">
        <div class="line1"></div>
        <div class="cell">
          <img src="../../../static/images/yonghu.png" alt="">
          <input class="input" v-model="user.name" type="text" maxlength="20" placeholder="请输入用户名" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/shouji.png" alt="">
          <input class="input" v-model="user.num" type="number" maxlength="11" onkeyup="this.value=this.value.replace(/\D/g,'')" placeholder="请输入安全手机" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/mima.png" alt="">
          <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入密码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/mima.png" alt="">
          <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="确认密码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/yanzhengma.png" alt="">
          <input style="width:40%,margin-top:0px;border-top:0px;" class="input" v-model="user.yanzhengma" type="text" maxlength="4" placeholder="请输入验证码" @input="inputFuction">
          <img style="margin-top:0px;margin-bottom:0px;height:50px;margin-right:0px;" :src="user.imgurl" alt="" @click="getData()">
        </div>


        
        <div style="display:flex; justify-content: center;">
          <div v-if="disabled" class="btnEnable" >注册</div>
          <div v-else class="btnDefault" @click="submit">注册</div>
        </div>
    </form>
  </div>
</template>

<style lang="less" scoped>
.top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  // margin-top: 60px;

  .cell {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #efefef;
    background: white;
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
  .btnDefault {
    background: rgb(214, 49, 70);
    margin-top: 40px;
    margin-bottom: 20px;
    width: 70%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    // border: 0px;
    border-radius: 5px;
  }

  .btnEnable {
    background: rgba(214, 49, 70, 0.5);
    margin-top: 40px;
    margin-bottom: 20px;
    width: 70%;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #fff;
    // border: 0px;
    border-radius: 5px;
  }
}

.line {
  margin: 2px 0px 2px 0px;
  background: #61d571;
  width: 2px;
}
.line1 {
  height: 15px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  background: #fafafa;
}
</style>


<script>
import sha256 from "../../util/sha256";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      user: {
        name: "",
        num: "",
        newpwd1: "",
        newpwd2: "",
        vcode: "",
        imgurl: "",
        yanzhengma: ""
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
        .post(this.global.url, data)
        .then(res => {
          console.log(res);
          this.user.vcode = res.data.Data.token;
          this.user.imgurl = this.global.url + res.data.Data.imgpath;
        })
        .catch(error => {
          console.log(error);
        });
    },

    inputFuction() {
      if (
        this.user.name.length > 0 &&
        this.user.newpwd1.length > 0 &&
        this.user.newpwd2.length > 0 &&
        this.user.num.length > 0 &&
        this.user.yanzhengma.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    submit: function(event) {
      this.getData();

      if (this.user.newpwd1 === this.user.newpwd2) {
        var formData = JSON.stringify(this.user); // 这里才是你的表单数据
        console.log(formData);

        var that = this;

        let data1 = new FormData();
        data1.append("Action", "UserNameReg2");
        data1.append("AppVersion", "1.0");
        data1.append("SID", localStorage.sid);
        data1.append("UserName", that.user.name);
        data1.append("Pwd", sha256.sha256(that.user.newpwd2).toUpperCase());
        data1.append("ImgCode", that.user.vcode + that.user.yanzhengma);
        data1.append("SafeMobile", that.user.num);
        data1.append("AppType", "4");
        data1.append("AppCode", "ZYZJ");
        localStorage.pwd = sha256.sha256(that.user.newpwd2).toUpperCase();
        that.$http
          .post(this.global.url, data1)
          .then(res => {
            console.log(res);
            if (res) {
              localStorage.isLogin = true;

              localStorage.uid = res.data.Data.UID;
              localStorage.AuthTypeName = res.data.Data.AuthTypeName;
              localStorage.SiteUrl = res.data.Data.SiteUrl;
              localStorage.AuthType = res.data.Data.AuthType;
              localStorage.Username = res.data.Data.NickName;
              localStorage.Token = res.data.Data.Token;
              localStorage.PayType = res.data.Data.PayType;
              localStorage.tokenCode = sha256
                .sha256(
                  res.data.Data.Token +
                    sha256.sha256(that.user.newpwd2).toUpperCase()
                )
                .toUpperCase();

              localStorage.user_name = this.user.name;
              localStorage.user_pwd = this.user.newpwd1;
              that.$router.push({
                path: "/"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        MessageBox({
          title: "提示",
          message: "两次输入密码不同，请重新输入",
          showCancelButton: false
        });
      }
    }
  }
};
</script>
