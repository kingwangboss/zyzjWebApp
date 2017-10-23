<template>
  <div class="maincontainer">
    <div class="userinfo">
      <img class="userinfo-avatar" src="../../static/images/me/User-104.png" background-size="cover"></img>
      <span class="userinfo-nickname">{{nickname}}</span>
    </div>

    <div class="line">
    </div>
    <div class="cell">
      <img src="../../static/images/me/gm.png" alt="">
      <span>购买授权</span>
    </div>
    <div class="line">
    </div>

    <div class="cell">
      <img src="../../static/images/me/kf.png" alt="">
      <span>在线客服</span>
    </div>
    <div class="line">
    </div>

    <div class="cell">
      <img src="../../static/images/me/sq.png" alt="">
      <span>我的授权</span>
    </div>
    <div class="line">
    </div>

    <div class="cell">
      <img src="../../static/images/me/mmgl.png" alt="">
      <span>密码管理</span>
    </div>
    <div class="line">
    </div>

    <div class="cell">
      <img src="../../static/images/me/yjfk.png" alt="">
      <span>意见反馈</span>
    </div>
    <div class="line">
    </div>

    <div class="cell">
      <img src="../../static/images/me/gywm.png" alt="">
      <span>关于我们</span>
    </div>
    <div class="line">
    </div>
    
    <div class="bottom-btndiv">
      <el-button type="text" class="bottom-btn" @click="loginOut">退出登录</el-button>
    </div>

  </div>
</template>


<style lang="less" scoped>
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
  background: gray;
  height: 1px;
}

.cell {
  width: auto;
  height: 64px; // border: 1px solid gray; 
  // border-style: none solid solid none;
  flex-direction: row; // background: red;
  display: -webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: flex-start;
  img {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }
  span {
    text-align: center;
    font-size: 20px; // color: gray;
  }
}
</style>


<script>
export default {
  data() {
    return {
      screenWidth: document.body.clientWidth,
      nickname: localStorage.Username
    }
  },
}
</script>
