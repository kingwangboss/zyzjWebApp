<template>
    <div class="main">
        <m-header :title="title"></m-header>
        <div class="top">
            <div class="cell">
                <!-- <span>原始密码:</span> -->
                <img src="../../../static/images/mima.png" alt="">
                <input v-model="pwd.oldpwd" placeholder="请输入原始密码" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div class="cell">
                <!-- <span>重设密码:</span> -->
                <img src="../../../static/images/mima.png" alt="">
                <input v-model="pwd.newpwd" placeholder="请输入6-20位数字或字母" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div class="cell" style="border-bottom: 1px solid #efefef;">
                <!-- <span>确认密码:</span> -->
                <img src="../../../static/images/mima.png" alt="">
                <input v-model="pwd.newpwd1" placeholder="请在此输入新密码" type="password" maxlength="20" @input="inputFuction">
            </div>
            <div>
                <el-button v-if="disabled" class="btnEnable" type="text" @click="btnClick">修改密码</el-button>
                <el-button v-else class="btnDefault" type="text" @click="btnClick">修改密码</el-button>
            </div>
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
  margin-top:60px;

  .cell {
    display: flex;
    flex-direction: row;
    border-top: 1px solid #efefef;
    background: white;
    span {
      font-size: 14px;
      font-weight: 320;
      color: black;
      width: 20%;
      margin: 3% 1%;
      text-align: right;
    }
    img{
      height: 18px;
      margin: 3% 2%;
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
</style>


<script>
import mHeader from "../../components/hearder/Hearder";
import sha256 from "../../util/sha256";
import { Toast, MessageBox } from "mint-ui";
export default {
  data() {
    return {
      title: {
        text: "修改密码",
        showBack: true
      },
      pwd: {
        oldpwd: "",
        newpwd: "",
        newpwd1: ""
      },
      disabled: true
    };
  },
  components: {
    mHeader
  },
  methods: {
    btnClick() {
      console.log(this.pwd.oldpwd);
      console.log(this.pwd.newpwd);
      console.log(this.pwd.newpwd1);
      if (
        this.pwd.oldpwd.length == 0 ||
        this.pwd.newpwd == 0 ||
        this.pwd.newpwd1 == 0
      ) {
        MessageBox({
          title: "提示",
          message: "输入未完全",
          showCancelButton: false
        });
      } else {
        if (this.pwd.newpwd === this.pwd.newpwd1) {
          let tokenCode = localStorage.tokenCode;
          let signStr =
            "Action=ChangePwd" +
            "&SID=" +
            localStorage.sid +
            "&Token=" +
            localStorage.Token +
            "&OldPwd=" +
            sha256.sha256(this.pwd.oldpwd).toUpperCase() +
            "&NewPwd=" +
            sha256.sha256(this.pwd.newpwd1).toUpperCase() +
            tokenCode;
          let data = new FormData();
          data.append("Action", "ChangePwd");
          data.append("SID", localStorage.sid);
          data.append("Token", localStorage.Token);
          data.append("OldPwd", sha256.sha256(this.pwd.oldpwd).toUpperCase());
          data.append("NewPwd", sha256.sha256(this.pwd.newpwd1).toUpperCase());
          data.append("Sign", sha256.sha256(signStr).toUpperCase());

          this.$http
            .post(localStorage.SiteUrl, data)
            .then(res => {
              localStorage.user_pwd = this.pwd.newpwd1;
              this.$router.go(-1);
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

    inputFuction() {
      if (
        this.pwd.oldpwd.length > 0 &&
        this.pwd.newpwd.length > 0 &&
        this.pwd.newpwd1.length > 0
      ) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>
