<template>
  <div class="kjview">
    <div class="top-top">
      <img style="width:15px;height:15px;padding-left:5px;padding-right:5px;padding-bottom:10px" src="../../../static/images/sj1.png" alt="">
      <span class="qishu1">第{{KJData.NewLottery.CurrentPeriod}}期开奖</span>
      <kjnum class="top-middle" v-if="count" :data="kjnum"></kjnum>
    </div>

    <!-- <kjnum class="top-middle" :data="kjnum"></kjnum> -->
    <kjnum class="top-middle" v-if="!count" :data="kjnum"></kjnum>

    <div class="top-bottom" v-if="time===0">
      <img style="width:15px;height:15px;padding-left:5px;padding-right:5px;padding-top:5px;" src="../../../static/images/sj2.png" alt="">
      <span class="label1">第{{KJData.NewLottery.NextPeriod}}期正在开奖...</span>
    </div>
    <div class="top-bottom" v-else>
      <img style="width:15px;height:15px;padding-left:5px;padding-right:5px;padding-top:5px;" src="../../../static/images/sj2.png" alt="">
      <span class="label1">第{{KJData.NewLottery.NextPeriod}}期开奖倒计时</span>
      <div class="img"> </div>
      <span class="sj">{{shijianArr[0]}}</span>
      <span class="sj">{{shijianArr[1]}}</span>
      <span style="color:yellow;margin-top:5px;">:</span>
      <span class="sj">{{shijianArr[2]}}</span>
      <span class="sj">{{shijianArr[3]}}</span>
    </div>
  </div>
</template>

<script>
import kjnum from './kjnum'
// var data = require('../../../static/data/clock')
import axios from 'axios';
import http from '../../util/http'
import sha256 from '../../util/sha256'

var time;
var tiemInterval;
var run;
export default {
  components: {
    kjnum,
  },

  created() {

  },
  data() {
    return {
      KJData: "",
      nextTime: "",
    }
  },

  methods: {
    getData1() {
      let tokenCode = localStorage.tokenCode;
      let signStr = 'Action=Clock' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + '&CurrentLottery=0' + tokenCode;
      let data = new FormData();
      data.append('Action', 'Clock');
      data.append('SID', localStorage.sid);
      data.append('Token', localStorage.Token);
      data.append('CurrentLottery', '0');
      data.append('Sign', sha256.sha256(signStr).toUpperCase());
      this.$http.post(localStorage.SiteUrl, data).then(res => {
        if (res.data.Data.NewLottery.NextPeriodTime > 0) {
          clearInterval(run);
          this.$router.push({
            path: '/routerPush'
          });
        } else {

        }
      }).catch(error => {
        console.log(error);
      })
    },
    getData() {
      clearInterval(run);
      let tokenCode = localStorage.tokenCode;
      let signStr = 'Action=Clock' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + '&CurrentLottery=0' + tokenCode;
      let data = new FormData();
      data.append('Action', 'Clock');
      data.append('SID', localStorage.sid);
      data.append('Token', localStorage.Token);
      data.append('CurrentLottery', '0');
      data.append('Sign', sha256.sha256(signStr).toUpperCase());

      //getClock握手
      this.$http.post(localStorage.SiteUrl, data).then(res => {
        this.KJData = res.data.Data
        this.nextTime = res.data.Data.NewLottery.NextPeriodTime;
        // this.nextTime = 5;
        // console.log("mounted" + this.time);

        //设置定时器，每1秒刷新一次
        var self = this;
        tiemInterval = setInterval(getTotelNumber, 1000)
        function getTotelNumber() {

          if (self.nextTime > 0) {
            self.nextTime--;

          } else {
            clearInterval(tiemInterval)
            var i = 0;
            run = setInterval(function() {
              // self.$router.push({
              //     path: '/routerPush'
              // });
              if (localStorage.isLogin == 'true') {
                self.getData1();
              } else {
                clearInterval(tiemInterval)
              }
            }, 5000);
          }
          // console.log(self.nextTime);
        }

      }).catch(error => {
        console.log(error);
      })
    }
  },
  beforeDestroy() {
    clearInterval(tiemInterval)
  },
  mounted() {
    this.getData();

  },
  computed: {
    shijian: {
      get() {
        return this.KJData.NewLottery.CurrentOpenTime.split(" ")[1];
      }
    },
    kjnum: {
      get() {
        return this.KJData.NewLottery.LotteryResult.split(',');
      }
    },
    count:{
      get() {
        if(this.KJData.NewLottery.LotteryResult.split(',').length <= 5)
        {
          return true;
        }else{
          return false;
        }
      }
    },
    shijianArr: {
      get() {
        time = parseInt(this.nextTime);
        // console.log('time')
        // console.log(time);
        var minu = parseInt(time / 60);
        var second = time % 60;

        var num1 = parseInt(minu / 10) > 0 ? parseInt(minu / 10) : 0;
        var num2 = minu % 10;
        var num3 = parseInt(second / 10) > 0 ? parseInt(second / 10) : 0;
        var num4 = second % 10;

        var arr = [];
        arr.push(num1);
        arr.push(num2);
        arr.push(num3);
        arr.push(num4);
        return arr;

      },

    },
    time: {
      get() {
        return parseInt(this.nextTime);
      },

    }
  }

}
</script>


<style lang="less" scoped>
.kjview {
  height: auto;
  width: 100%; // background-color: red; 
  background-color: rgb(219, 60, 62); // background: url(../../../static/images/shouyebg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  .top-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 10px;
    margin-left: 5px;
    .qishu1 {
      // font-weight: 900;
      padding-bottom: 10px;
      font-size: 12px; // padding: 6px 10px 6px 5px;
      color: yellow; // background-image: url('../../../static/images/qishubg.png');
    }
  }

  .top-middle {
    margin: 0px 5px 10px 5px;
  }

  .top-bottom {
    display: flex;
    flex-direction: row;
    height: 25px;
    margin-bottom: 10px;
    margin-left: 5px;
    .label1 {
      padding-top: 1px;
      color: yellow;
      // font-weight: 900;
      font-size: 12px;
      line-height: 25px;
      height: 25px;
    }
    .img {
      width: 10px;
      height: 10px;
      margin-top: 3px;
      margin-right: 5px;
      padding-top: 2.5px; // background: url(../../../static/images/shouyeicon.png);
      -moz-background-size: 70% 70%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .sj {
      margin: 2px 2px;
      background-color: #F7D90F;
      border-radius: 2px;
      line-height: 22px;
      height: 20px;
      padding: 0 3px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: #FF0000;
    }
  }
}
</style>

