<template>
  
  <div class="top">
    <form @submit.prevent="submit">
        <div class="line1"></div>
        <div class="cell">
          <img src="../../../static/images/shouji.png" alt="">
          <input class="input" v-model="mobile.num" type="text" maxlength="20" placeholder="请输入手机号码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/yanzhengma.png" alt="">
          <input type="number" class="input1" v-model="mobile.verify" maxlength="11" placeholder="请输入验证码" @input="inputFuction">
          <div class="line"></div>
          <el-button type="text" style="color:#61d571;margin-left:10px;margin-right:10px;" @click="getVcode">获取验证码</el-button>
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/mima.png" alt="">
          <input class="input" v-model="mobile.newpwd1" type="password" maxlength="18" placeholder="请输入密码" @input="inputFuction">
        </div>

        <div class="cell" style="border-top:0px;">
          <img src="../../../static/images/mima.png" alt="">
          <input class="input" v-model="mobile.newpwd2" type="password" maxlength="18" placeholder="确认密码" @input="inputFuction">
        </div>


        
        <div>
          <el-button v-if="disabled" class="btnEnable" type="text" native-type="submit">注册</el-button>
          <el-button v-else class="btnDefault" type="text" native-type="submit">注册</el-button>
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
}

.line{
  margin:2px 0px 2px 0px;
  background:#61d571;
  width: 2px;
}
.line1{
  height: 15px;
  border-top: 1px solid #efefef;
  border-bottom: 1px solid #efefef;
  background: #fafafa;
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
import sha256 from '../../util/sha256'
export default {
  data() {
    return {
      mobile: {
        num: '',
        verify: '',
        newpwd1: '',
        newpwd2: '',
        vcode: '',
      },
      disabled: true,
    };
  },
  methods: {
    inputFuction() {
      if (this.mobile.num.length > 0 && this.mobile.verify.length > 0 && this.mobile.newpwd1.length > 0 && this.mobile.newpwd2.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },

    getVcode() {

      var that = this;
      let data = new FormData();
      data.append('Action', 'GetVCode');
      data.append('SID', localStorage.sid);
      this.$http.post("https://idx.camew.com", data).then(res => {
        console.log(res);
        this.mobile.vcode = res.data.Data;

        let data1 = new FormData();
        data1.append('Action', 'SendRegSMS');
        data1.append('SID', localStorage.sid);
        data1.append('Mobile', that.mobile.num);
        data1.append('AppType', '4');
        data1.append('VCode', that.mobile.vcode);
        that.$http.post('https://idx.camew.com', data1).then(res => {
          console.log(res);
        }).catch(error => {
          console.log(error);
        });
      })
    },

    submit: function(event) {

      var formData = JSON.stringify(this.user); // 这里才是你的表单数据
      console.log(formData);

      let data = new FormData();
      data.append('Action', 'MobileReg');
      data.append('SID', localStorage.sid);
      data.append('AppVersion', '1.0');
      data.append('Mobile', this.mobile.num);
      data.append('AppType', '4')
      data.append('Pwd',  sha256.sha256(this.mobile.newpwd2).toUpperCase());
      data.append('SMSCode', this.mobile.verify)
      data.append('AppCode', 'ZYZJ');
      localStorage.pwd = sha256.sha256(this.mobile.newpwd2).toUpperCase();
      this.$http.post('https://idx.camew.com', data).then(res => {

        if (res) {
          localStorage.isLogin = true;

          localStorage.uid = res.data.Data.UID;
          localStorage.AuthTypeName = res.data.Data.AuthTypeName;
          localStorage.SiteUrl = res.data.Data.SiteUrl;
          localStorage.AuthType = res.data.Data.AuthType;
          localStorage.Username = res.data.Data.NickName;
          localStorage.Token = res.data.Data.Token;
          localStorage.PayType = res.data.Data.PayType;
          localStorage.tokenCode = sha256.sha256(res.data.Data.Token + sha256.sha256(this.mobile.newpwd2).toUpperCase()).toUpperCase()

          localStorage.user_name = this.mobile.num;
          localStorage.user_pwd = this.mobile.newpwd1;
          this.$router.push({
            path: "/"
          })
        }
      }).catch(error => {
        console.log(error);
      });

      // this.$http.post('/path/to', formData).then((response) => {
      //     // success callback
      // }, (response) => {
      //     // error callback
      // });

    }
  },
}
</script>
