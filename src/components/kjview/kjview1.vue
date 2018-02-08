<template>
  <div class="kjview">
    <div class="top-top">
      <span class="qishu1">第{{KJData.NewLottery.CurrentPeriod}}期开奖</span>
      <kjnum1 class="top-middle" v-if="count" :data="kjnum"></kjnum1>
    </div>

    <!-- <kjnum1 class="top-middle" :data="kjnum"></kjnum1> -->
    <kjnum1 class="top-middle1" v-if="!count" :data="kjnum"></kjnum1>

    <div class="top-bottom" v-if="time===0">
      <img style="width:15px;height:15px;padding-left:5px;padding-right:5px;padding-top:5px;" src="../../../static/images/clock.png" alt="">
      <span class="label1" style="color:#CD0C16;margin-right:30px;">开奖中...</span>
    </div>
    <div class="top-bottom" v-else>
      <img style="width:15px;height:15px;padding-left:5px;padding-right:5px;padding-top:5px;" src="../../../static/images/clock.png" alt="">
      <span v-show="shijianArr[1] > 0" class="sj">{{shijianArr[0]}}</span>
      <span v-show="shijianArr[1] > 0" class="sj">{{shijianArr[1]}}</span>
      <span v-show="shijianArr[1] > 0" style="color:#FF0000;margin-top:5px;">:</span>
      <span class="sj">{{shijianArr[2]}}</span>
      <span class="sj">{{shijianArr[3]}}</span>
      <span style="color:#FF0000;margin-top:5px;">:</span>
      <span class="sj">{{shijianArr[4]}}</span>
      <span class="sj">{{shijianArr[5]}}</span>
    </div>
  </div>
</template>

<script>
import kjnum1 from "./kjnum1";
// var data = require('../../../static/data/clock')
import axios from "axios";
import http from "../../util/http";
import sha256 from "../../util/sha256";

var time;

export default {
  components: {
    kjnum1
  },

  created() {
    this.KJData = this.kjdata;
    this.nextTime = this.Time;
  },
  watch: {
    Time: function(now, old) {
      this.nextTime = this.Time;
    },
    kjdata: function(now, old) {
      this.KJData = this.kjdata;
    }
  },
  props: ["kjdata", "Time"],
  data() {
    return {
      KJData: Object,
      nextTime: Number
    };
  },

  methods: {
    
  },
  
  mounted() {
    // this.getData();
  },
  computed: {
    shijian: {
      get() {
        return this.KJData.NewLottery.CurrentOpenTime.split(" ")[1];
      }
    },
    kjnum: {
      get() {
        return this.KJData.NewLottery.LotteryResult.split(",");
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
        var hour = parseInt(time / 3600);
        var minu = parseInt((time - hour * 3600) / 60);
        var second = time % 60;

        var num00 = parseInt(hour / 10) > 0 ? parseInt(hour / 10) : 0;
        var num01 = hour % 10;
        var num1 = parseInt(minu / 10) > 0 ? parseInt(minu / 10) : 0;
        var num2 = minu % 10;
        var num3 = parseInt(second / 10) > 0 ? parseInt(second / 10) : 0;
        var num4 = second % 10;

        var arr = [];
        arr.push(num00);
        arr.push(num01);
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
      }
    }
  }
};
</script>


<style lang="less" scoped>
.kjview {
  height: auto;
  width: 100%; 
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;

  .top-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    
    .qishu1 {
      margin-left: 10px;
      font-size: 12px; // padding: 6px 10px 6px 5px;
      color: #6e6e6e; // background-image: url('../../../static/images/qishubg.png');
      padding-bottom:20px;
    }
  }

  .top-middle {
    margin: 0px 5px 30px 5px;
  }
  .top-middle1 {
    margin: -15px 5px 30px 5px;
  }

  .top-bottom {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 10px;
    margin-right: 10px;
    .label1 {
      padding-top: 1px;
      color: black;
      font-weight: 900;
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
      margin: 2.5px 2.5px;
      background-color: #f7d90f;
      border-radius: 2.5px;
      line-height: 22px;
      height: 20px;
      width: 14px;
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      color: #ff0000;
    }
  }
}
</style>

