<template>
  <div @touchmove.prevent>
    <m-header :title="title"></m-header>
    <div class="btnview">
      <el-button :class="{ 'btnDefault' : isA, 'btnEnable': !isA}" type="text" @click="btnClick">手机注册</el-button>
      <div class="line"></div>
      <el-button :class="{ 'btnEnable' : isA, 'btnDefault': !isA}" type="text" @click="btnClick">用户名注册</el-button>
    </div>

    <leftRegist v-show="!isA"></leftRegist>
    <rightRegist v-show="isA"></rightRegist>

  </div>
</template>

<style lang="less" scoped>

.line{
  margin:10px 0px 10px 0px;
  background:#efefef;
  width: 2px;
}
.btnview {
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  
  .btnDefault {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    width: 50%;
    height: 100%;
    background-color: RGB(255, 255, 255);
    // border-bottom:2px solid #efefef;
    color: black;
    font-size: 15px;
    padding: 15px 0px;
  }
  .btnEnable {
    margin-left: 0;
    margin-right: 0;
    border-radius: 0;
    width: 50%;
    height: 100%;
    background-color: white;
    // background-image: url(../../static/images/login/Register-02.png);
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    border-bottom:2px solid #D63138;
    color: #D63138;
    font-size: 15px;
    padding: 15px 0px;
  }
}
</style>


<script>
import mHeader from '../components/hearder/Hearder';
import leftRegist from '../components/regist/leftregist'
import rightRegist from '../components/regist/rightregist'

export default {
  name: 'registVC',
  data() {
    return {
      title: {
        text: "注册",
        showBack: true,
      },
      isA: false,
    };
  },
  created() {
    if (localStorage.sid) {

    } else {
      // this.$router.push({
      //   path: '/XZcaizhong'
      // })
      localStorage.sid = '2';
      localStorage.czname = '北京pk10'
    }
  },
  components: {
    mHeader,
    leftRegist,
    rightRegist
  },
  methods: {
    btnClick(event) {
      this.isA = !this.isA;
    }
  },


}
</script>
