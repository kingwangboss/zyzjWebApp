<template>
  <div @touchmove.prevent>
    <m-header :title="title"></m-header>

    <!-- <div class="maincontainer">
      <div class="content">
        <form @submit.prevent="submit">
          <div>
            <div class="top">
              <input type="text" disabled="disabled" style="color:#ccc;" class="input1" v-model="user.num1" maxlength="11" placeholder="请输入正确的手机号码" @input="inputFuction">
              <el-button class="btn" type="primary" @click="ResetPwdSMS">获取验证码</el-button>
            </div>
            <div class="bottom">
              <input class="input" v-model="user.verify" type="text" maxlength="20" placeholder="请输入验证码" @input="inputFuction">
              <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入6-18位新密码" @input="inputFuction">
              <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="确认输入" @input="inputFuction">
            </div>
          </div>
          <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" native-type="submit">确认修改</el-button>
          <el-button v-else :disabled="disabled" class="btnDefault" type="primary" native-type="submit">确认修改</el-button>
        </form>
      </div>
    </div> -->

    <div class="top">
      <form @submit.prevent="submit">
        <div class="cell">
          <img src="../../static/images/shouji.png" alt="">
          <input type="text" disabled="disabled" style="color:#ccc;" class="input1" v-model="user.num1" maxlength="11" placeholder="请输入正确的手机号码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../static/images/yanzhengma.png" alt="">
          <input class="input" v-model="user.verify" type="text" maxlength="20" placeholder="请输入验证码" @input="inputFuction">
          <div class="line"></div>
          <el-button type="text" style="color:#61d571;margin-left:10px;margin-right:10px;" @click="ResetPwdSMS">获取验证码</el-button>
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../static/images/mima.png" alt="">
          <input class="input" v-model="user.newpwd1" type="password" maxlength="18" placeholder="请输入6-18位新密码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../static/images/mima.png" alt="">
          <input class="input" v-model="user.newpwd2" type="password" maxlength="18" placeholder="确认输入" @input="inputFuction">
        </div>


        
        <div>
          <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" native-type="submit">确认修改</el-button>
          <el-button v-else :disabled="disabled" class="btnDefault" type="primary" native-type="submit">确认修改</el-button>
        </div>
      </form>
    </div>


  </div>
</template>

<style lang="less" scoped>
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

.line{
  margin:2px 0px 2px 0px;
  background:#61d571;
  width: 2px;
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
import sha256 from '../util/sha256'
export default {
  name: "lossPwdVC",
  data() {
    return {
      title: {
        text: "忘记密码",
        showBack: true
      },
      user: {
        num: localStorage.phoneNum,
        num1: "",
        verify: "",
        newpwd1: "",
        newpwd2: ""
      },
      disabled: true
    };
  },

  mounted() {
    var str = "*******";
    for (var i = 0; i < this.user.num.length; i++) {
      if (i > 6) {
        str = str + this.user.num[i];
      }
    }
    this.user.num1 = str;
  },

  methods: {
    inputFuction() {
      if (
        this.user.num.length > 0 &&
        this.user.verify.length > 0 &&
        this.user.newpwd1.length > 0 &&
        this.user.newpwd2.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    ResetPwdSMS() {
      let data = new FormData();
      data.append("Action", "GetVCode");
      data.append("SID", this.user.sid);

      this.$http
        .post("https://idx.camew.com", data)
        .then(res => {
          if (res) {
            console.log(res.data.Data);

            localStorage.vcode = res.data.Data;
            let data = new FormData();
            data.append("Action", "ResetPwdSMS");
            data.append("SID", localStorage.sid);
            data.append("Mobile", this.user.num);
            data.append("AppType", "4");
            data.append("VCode", res.data.Data);

            this.$http
              .post("https://idx.camew.com", data)
              .then(res1 => {
                if (res1) {
                  console.log(res1);
                }
              })
              .catch(error1 => {
                console.log(error1);
              });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    submit: function(event) {
      // var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      // console.log(formData);
      if (this.user.newpwd1 == this.user.newpwd2) {
        this.user.newpwd1 = sha256.sha256(this.user.newpwd1).toUpperCase();
        // 请求数据
        let data = new FormData();
        data.append("Action", "ResetPwd2");
        data.append("Account", localStorage.Username);
        data.append("SID", localStorage.sid);
        data.append("Mobile", this.user.num);
        data.append("SMSCode", this.user.verify);
        data.append("Pwd", this.user.newpwd1);
        data.append("AppType", "4");
        this.$http
          .post("https://idx.camew.com", data)
          .then(res => {
            console.log(res);
            if (res.data.Code == "Suc") {
              this.$router.push({
                path: "/login"
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
  },
  components: {
    mHeader
  }
};
</script>