<template>
    <div @touchmove.prevent>
        <m-header :title="title"></m-header>

        <div class="maincontainer">
            <div class="content">
                <img class="topImg" src="../../static/images/login/topLog.png" alt="icon">

                <form @submit.prevent="submit">
                    <div>
                        <!-- <input class="input" v-model="user.name" type="text" maxlength="20" placeholder="请输入手机号/昵称" @input="inputFuction">
                            <input class="input" v-model="user.pwd" type="password" maxlength="20" placeholder="请输入密码" @input="inputFuction"> -->

                        <div class="div-bor">
                            <i class="icon-user"></i>
                            <input type="text" class="user" v-model="user.name" onKeyUp="value=value.replace(/[^\w\/]/ig,'')" maxlength="20" placeholder="请输入手机号/昵称" @input="inputFuction">
                        </div>

                        <div class="div-bor">
                            <i class="icon-user1"></i>
                            <input type="password" class="user" v-model="user.pwd" maxlength="20" placeholder="请输入密码" @input="inputFuction">
                        </div>

                        <div class="xuCZ" @click="XZcaizhongClick">
                            <img class="leftImg" src="../../static/images/login/Login-09.png" alt="">
                            <span>{{czname}}</span>
                            <div>
                                <img class="rightImg" src="../../static/images/login/Login-10.png" alt="">
                            </div>
                        </div>
                    </div>
                    <el-button v-if="disabled" :disabled="disabled" class="btnEnable" type="primary" native-type="submit">登陆</el-button>
                    <el-button v-else :disabled="disabled" class="btnDefault" type="primary" native-type="submit">登陆</el-button>
                </form>

                <div class="bottom">
                    <router-link class="bottom-left" to="/lossPwd1">忘记密码</router-link>
                    <router-link class="bottom-right" to="/regist">注册</router-link>
                </div>

            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
#bundle {
  .juzhong {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}

::-webkit-input-placeholder {
  /* WebKit browsers */
  color: red;
  font-size: 16px;
}

.maincontainer {
  background-image: url("../../static/images/login/Loginbg2.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  .content {
    #bundle > .juzhong;
    flex-direction: column;
    .topImg {
      width: 80px;
      height: 10%;
      margin-top: 120px;
      margin-bottom: 10px;
    }
    .div-bor {
      position: relative;
      width: 270px;
      margin-bottom: 10%;
      // background-image: url('../../static/images/login/a2.png');
      // background-repeat: no-repeat;
      background-size: 100% 100%;
      height: 44px;
      line-height: 44px;
    }
    .icon-user {
      position: absolute;
      left: 10px;
      top: 13px;
      z-index: 5;
      background-image: url("../../static/images/login/Login-03.png");
      background-size: 80% 80%;
      /*引入图片图片*/
      background-repeat: no-repeat;
      /*设置图片不重复*/
      background-position: 0px 0px;
      /*图片显示的位置*/
      width: 25px;
      /*设置图片显示的宽*/
      height: 28px;
      /*图片显示的高*/
    }
    .icon-user1 {
      position: absolute;
      left: 10px;
      top: 13px;
      z-index: 5;
      background-image: url("../../static/images/login/Login-02.png");
      background-size: 80% 90%;
      /*引入图片图片*/
      background-repeat: no-repeat;
      /*设置图片不重复*/
      background-position: 0px 0px;
      /*图片显示的位置*/
      width: 28px;
      /*设置图片显示的宽*/
      height: 28px;
      /*图片显示的高*/
    }
    .user {
      border: none;
      border-radius: 5px;
      height: 44px;
      outline: none;
      background-color: white;
      margin-top: 3px;
      width: 88%;
      padding-left: 40px;
      font-size: 16px;
      color: black;
    }

    // .input {
    //     outline: none;
    //     margin-top: 10%;
    //     background-color: transparent;
    //     background-image: url('../../static/images/login/a2.png');
    //     background-repeat: no-repeat;
    //     background-size: 100% 100%;
    //     height: 44px;
    //     line-height: 44px;
    //     width: 100%;
    //     padding-left: 10px;
    //     font-size: 12px;
    //     color: white;
    // }
    .xuCZ {
      margin-top: 10%;
      background-color: transparent;
      // background-image: url('../../static/images/login/a2.png');
      background: white;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border-radius: 5px;
      height: 44px;
      line-height: 44px;
      width: 100%;
      padding-left: 10px;
      display: flex;
      flex-direction: row;
      .leftImg {
        width: 20px;
        height: 20px;
        padding-top: 12px;
        padding-right: 7px;
      }
      span {
        color: red;
        font-size: 16px;
        width: 75%;
        margin-top: 2px;
        text-align: left;
      }
      div {
        // width: 40%;
        height: 100%;
        .rightImg {
          padding-top: 20px;
          float: right;
          height: 6px;
          width: 25px;
        }
      }
    }
    .btnDefault {
      margin-top: 30px;
      height: 40px;
      width: 103%;
      border-radius: 5px;
      background-color: RGB(248, 213, 70);
      border: 0;
      color: rgb(255, 27, 31);
      font-size: 18px;
    }
    .btnEnable {
      margin-top: 30px;
      height: 40px;
      width: 103%;
      border-radius: 5px;
      background-color: RGB(233, 228, 162);
      border: 0;
      color: rgb(214, 49, 56);
      font-size: 18px;
    }
  }
  .bottom {
    margin-top: 20px;
    width: 280px;
    .bottom-left {
      color: #fff;
      float: left;
    }
    .bottom-right {
      color: #fff;
      float: right;
    }
  }
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
import http from "../util/http";
import sha256 from "../util/sha256";

export default {
  name: "loginVC",
  data() {
    return {
      title: {
        text: "登陆",
        tabName: "loginVC",
        tabClass: "loginVC"
      },
      user: {
        name: localStorage.user_name == null ? "" : localStorage.user_name,
        pwd: localStorage.user_pwd == null ? "" : localStorage.user_pwd,
        sid: ""
      },
      // disabled: true,
      disabled: localStorage.user_name == null ? true : false,
      czname: localStorage.czname ? localStorage.czname : "北京PK拾"
    };
  },
  components: {
    mHeader
  },
  activated() {
    document.body.className = "main-body";
  },
  methods: {
    XZcaizhongClick() {
      this.$router.push({
        path: "/XZcaizhong"
      });
    },
    btnclick() {
      console.log("push");
      this.$router.push({
        path: "/regist"
      });
    },
    inputFuction() {
      if (this.user.name.length > 0 && this.user.pwd.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    submit: function(event) {
      if (this.user.sid) {
      } else {
        this.user.sid = "2";
        localStorage.czname = "北京PK10";
      }

      let signStr =
        this.user.sid +
        this.user.name +
        this.global.AppType +
        this.global.AppCode +
        this.global.AppVersion +
        sha256.sha256(this.user.pwd).toUpperCase();
      console.log(signStr);
      let data = new FormData();
      data.append("Action", "Login");
      data.append("SID", this.user.sid);
      data.append("Account", this.user.name);
      data.append("AppType", this.global.AppType);
      data.append("AppCode", this.global.AppCode);
      data.append("AppVersion", this.global.AppVersion);
      data.append("Sign", sha256.sha256(signStr).toUpperCase());

      localStorage.pwd = sha256.sha256(this.user.pwd).toUpperCase();
      this.$http
        .post(this.global.url, data)
        .then(res => {
          // console.log(res);
          // this.setCookie('UID', res.data.Data.UID, 1000 * 60 * 60 * 24 * 15)
          if (res) {
            // this.$store.commit('updateUid', res.data.Data.UID)
            // this.$store.commit('updateAuthtypename', res.data.Data.AuthTypeName)
            // this.$store.commit('updateUrl', res.data.Data.SiteUrl)
            // this.$store.commit('updateAuthtype', res.data.Data.AuthType)
            // this.$store.commit('updateUsername', res.data.Data.NickName)
            // this.$store.commit('updateToken', res.data.Data.Token)
            // this.$store.commit('updatePaytype', res.data.Data.PayType)
            localStorage.isLogin = true;
            localStorage.sid = this.user.sid;
            localStorage.uid = res.data.Data.UID;
            localStorage.AuthTypeName = res.data.Data.AuthTypeName;
            localStorage.SiteUrl = res.data.Data.SiteUrl;
            localStorage.AuthType = res.data.Data.AuthType;
            localStorage.Username = res.data.Data.NickName;
            localStorage.Token = res.data.Data.Token;
            localStorage.PayType = res.data.Data.PayType;
            localStorage.QQUrl = res.data.Data.QQUrl;
            localStorage.tokenCode = sha256
              .sha256(res.data.Data.Token + localStorage.pwd)
              .toUpperCase();
            localStorage.OfficialUrl = res.data.Data.OfficialUrl;

            localStorage.user_name = this.user.name;
            localStorage.user_pwd = this.user.pwd;
            this.$router.push({
              path: "/planVC"
            });
          }
        })
        .catch(error => {
          console.log(error);
        });

      // this.$http.post("",data).then(res=>{
      //     console.log(res);
      //     this.$store.commit('updateVcode',res.data.Data)
      // })

      // console.log(this.$store.getters.getVcode);
    }
  },

  created() {
    if (localStorage.sid) {
      this.user.sid = localStorage.sid;
    } else {
      this.$router.push("/XZcaizhong");
    }
    // let u = navigator.userAgent;
    // alert(u)
    // this.$store.dispatch('fetchOrderList')
    // this.$store.commit('updateParams',{
    //     key:'pid',
    //     val:'1'
    // })
    // console.log(this.$store)
  }
};
</script>

