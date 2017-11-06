<template>
  <div class="maincontainer">
    <div class="userinfo">
      <img class="userinfo-avatar" src="../../static/images/me/User-104.png" background-size="cover"></img>
      <span class="userinfo-nickname">{{nickname}}</span>
    </div>

    <div class="line">
    </div>
    <div class="cell" @click="buyClick">

      <div class="cell-left">
         <img src="../../static/images/me/gm.png" alt="">
         <span>购买授权</span>
      </div>
     
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <div class="cell" @click="kefuClick">

      <div class="cell-left">
         <img src="../../static/images/me/kf.png" alt="">
         <span>在线客服</span>
      </div>
      
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <div class="cell" @click="shouquanClick">
      <div class="cell-left">
         <img src="../../static/images/me/sq.png" alt="">
         <span>我的授权</span>
      </div>
      
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <div class="cell" @click="XGpwdClick">
      <div class="cell-left">
        <img src="../../static/images/me/mmgl.png" alt="">
        <span>密码管理</span>
      </div>
      
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <div class="cell" @click="feedbackClick">
      <div class="cell-left">
        <img src="../../static/images/me/yjfk.png" alt="">
        <span>意见反馈</span>
      </div>
      
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <div class="cell" @click="aboutClick">
      <div class="cell-left">
        <img src="../../static/images/me/gywm.png" alt="">
        <span>关于我们</span>
      </div>
      
      <!-- <img class="right-img" src="../../static/images/jt.png" alt=""> -->
      <div class="iv-arrow"></div>
    </div>
    <div class="line">
    </div>

    <el-button type="text" class="bottom-btn" @click="loginOut">退出登录</el-button>

  </div>
</template>


<style lang="less" scoped>
.iv-arrow {
    // vertical-align: center;
    // position: absolute;
    margin-right: 15px;
    border-top: 1px solid #c7c7c7;
    border-right: 1px solid #c7c7c7;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    // margin-top: -2px;
}
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center; // background: rgb(229, 87, 77);
  background: url(../../static/images/me/bg.png);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.userinfo-avatar {
  width: 64px;
  height: 64px;
  margin: 10px;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #fff;
  font-size: 18px;
  padding-bottom: 10px;
}

.line {
  background: #efefef;
  height: 1px;
}

.cell {
  width: auto;
  height: 54px; // border: 1px solid gray;
  // border-style: none solid solid none;
  flex-direction: row; // background: red;
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: space-between;
  .cell-left {
    width: auto;
    height: 54px; // border: 1px solid gray;
    // border-style: none solid solid none;
    flex-direction: row; // background: red;
    display: -webkit-flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: flex-start;
  }
  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }
  span {
    text-align: center;
    font-size: 15px; // color: gray;
  }

  .right-img {
    width: 8px;
    height: 16px;
  }
}

.bottom-btn {
  // background-image: url('../../static/images/me/User-12.png');
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  background: rgb(214, 49, 70);
  margin-top: 40px;
  margin-bottom: 20px;
  width: 70%;
  height: 40px;
  font-size: 16px;
  color: #fff;
}
</style>


<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      nickname: localStorage.Username
    };
  },

  methods: {
    loginOut() {
      // localStorage.clear();
      localStorage.isLogin = false;
      // localStorage.removeItem('isLogin');
      // localStorage.removeItem('sid');
      localStorage.removeItem("uid");
      localStorage.removeItem("AuthTypeName");
      localStorage.removeItem("SiteUrl");
      localStorage.removeItem("AuthType");
      localStorage.removeItem("Username");
      localStorage.removeItem("Token");
      localStorage.removeItem("PayType");
      localStorage.removeItem("QQUrl");
      localStorage.removeItem("tokenCode");
      localStorage.removeItem("OfficialUrl");
      localStorage.removeItem("tab");
      localStorage.removeItem("shujufenxi");
      localStorage.removeItem("activeName2");

      this.$router.push({
        path: "/"
      });
    },
    kefuClick() {
      window.location.href = localStorage.QQUrl;
      // window.open();
    },
    shouquanClick() {
      this.$router.push({
        path: "/wo/shouquan"
      });
    },
    XGpwdClick() {
      this.$router.push({
        path: "/wo/XGpwd"
      });
    },
    feedbackClick() {
      this.$router.push({
        path: "/wo/feeback"
      });
    },
    aboutClick() {
      this.$router.push({
        path: "/wo/about"
      });
    },
    buyClick() {
      this.$router.push({
        path: "/buy"
      });
    }
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>
