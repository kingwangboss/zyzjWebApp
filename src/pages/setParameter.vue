<template>
  <div>
      <m-header :title="title"></m-header>

      <div class="maincontainer">

          <div class="top">
              <div class="cell">
                  <span class="txt">
                      定码个数：
                  </span>
                  <el-input-number class="elinput" v-model="input1" @change="change1" :min="1" :max="dataDuringValue.length - 1" label="描述文字"></el-input-number>
              </div>

              <div class="cell">
                  <span class="txt">
                      计划周期：
                  </span>
                  <el-input-number class="elinput" v-model="input2" @change="change2" :min="1" :max="9" label="描述文字"></el-input-number>
              </div>

              <div class="cell1">
                  <span class="txt1">成绩</span>
                  <vue-slider class="slider" :piecewise="true" :min="0" :max="100" formatter="{value}%" :interval='10' :lazy="true" v-model="value1" :tooltipDir="tooltipDir" :sliderStyle="sliderStyle" :bgStyle="bgStyle" :processStyle="processStyle"></vue-slider>
                    
              </div>

              <div class="cell1">
                  <span class="txt1">最大连对</span>
                  <vue-slider class="slider" :piecewise="true" :min="0" :max="10" :interval='1' :lazy="true" v-model="value2" :tooltipDir="tooltipDir" :sliderStyle="sliderStyle" :bgStyle="bgStyle" :processStyle="processStyle"></vue-slider>
              </div>

              <div class="cell1">
                  <span class="txt1">最大连错</span>
                  <vue-slider class="slider" :piecewise="true" :min="0" :max="10" :interval='1' :lazy="true" v-model="value3" :tooltipDir="tooltipDir" :sliderStyle="sliderStyle" :bgStyle="bgStyle" :processStyle="processStyle"></vue-slider>

              </div>

              <div class="cell1">
                  <span class="txt1">当前连对/错</span>
                  <vue-slider class="slider" :piecewise="true" :min="-10" :max="10" :interval='1' :lazy="true" v-model="value4" :tooltipDir="tooltipDir" :sliderStyle="sliderStyle" :bgStyle="bgStyle" :processStyle="processStyle"></vue-slider>

              </div>

          </div>

          <div style="dispaly:flex;flex-direction:row;width:100px;margin-top:15px;">
              <img style="height:12px;width:15px;" src="../../static/images/sjsx.png" ></img>
              <span style="font-size:15px;font-weight:900;color:#007AFF">数据筛选</span>
          </div>

          <button >

          </button>

          <div class="bottom">
            <button :class="{'bottom-btn-select':selectNameArr.indexOf(item) >  -1}" :style="{width:ojwidth+'px',height:ojwidth+'px',}" @click="addBtn(index,item)" type="text" v-for="(item,index) in dataDuringValue" :key="item" class="bottom-btn">
                    {{item}}
                </button>
          </div>

      </div>

  </div>
</template>

<style lang="less" scoped>
.maincontainer {
  display: flex;
  flex-direction: column;
}

.top {
  display: flex;
  flex-direction: column;
}

.cell {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
  border-bottom: 1.5px solid #f6f6f6;
}
.cell1 {
    
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-wrap: nowrap;
  border-bottom: 1.5px solid #f6f6f6;
  .slider {
    margin: 0px 10px 30px 10px;
  }
}

.txt {
  margin: 20px 0px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  align-content: left;
  width: 18%;
}
.txt1 {
  margin: 10px 0px;
  height: 9px;
  line-height: 9px;
  font-size: 12px;
  align-content: left;
  width: 18%;
}
.elinput {
  margin: 10px 0px;
}

.bottom {
    display: flex;
    flex-direction: row; // margin-left: 10px;
    flex-wrap: wrap;
    margin-bottom: 40px;
    .bottom-btn {
        outline: none;
        font-size: 13px;
        line-height: 25px; // margin: 10px 5px;
        margin-left: 4px;
        margin-right: 4px;
        margin-top: 4px;
        padding: 0px;
        border: 1px solid gray;
        color: black;
        background: white;
        
    }

    .bottom-btn-select {
        // width: 20px;
        // height: 20px;
        outline: none;
        font-size: 13px;
        line-height: 25px; // margin: 10px 5px;
        margin-left: 4px;
        margin-right: 4px;
        margin-top: 4px;
        padding: 0px;
        color: white;
        border: 1px solid #007AFF;
        background: #007AFF;
    }
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
import vueSlider from "vue-slider-component";
export default {
  data() {
    return {
      title: {
        text: "搜索公式",
        showBack: true,
        setok: true
      },
      input1: "",
      input2: "",
      input31: "0%",
      input32: "100%",
      input41: "0",
      input42: "10",
      input51: "0",
      input52: "10",
      input61: "-10",
      input62: "10",
      value1: [0, 100],
      value2: [0, 10],
      value3: [0, 10],
      value4: [-10, 10],
      dataDuringValue: [],
      dataDuringIndex: [],
      planName: "",
      selectNameArr: [],
      selectIndexArr:[],
      screenWidth: document.body.clientWidth, // 这里是给到了一个默认值 （这个很重要）
      tooltipDir: ["bottom", "bottom"],
      sliderStyle: [
        {
          backgroundColor: "rgb(68,76,89)"
        },
        {
          backgroundColor: "rgb(89,196,212)"
        }
      ],
      bgStyle: {
        backgroundColor: "#fff",
        boxShadow: "inset 0.5px 0.5px 3px 1px rgba(0,0,0,.36)"
      },
      processStyle: {
        backgroundColor: "#999"
      },
    };
  },
  created() {
    this.planName = localStorage.selectNameArr.split(",")[
      localStorage.detailID
    ];
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      })();
    };
    this.getData();
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
    },
    value1(val) {
      console.log(val);
      localStorage.value1 = val;
    },
    value2(val) {
      console.log(val);
      localStorage.value2 = val;
    },
    value3(val) {
      console.log(val);
      localStorage.value3 = val;
    },
    value4(val) {
      console.log(val);
      localStorage.value4 = val;
    }
  },

  computed: {
    ojwidth: {
      // getter
      get: function() {
        var ojwidth;
        var margin;
        var colnum = 10; //列
        // colnum = this.dataDuringValue.length > colnum ? colnum : this.dataDuringValue.length;
        var rownum = this.dataDuringValue.length / colnum; //行
        margin = 4;
        ojwidth = (this.screenWidth - 2 * margin * colnum) / colnum; //格子的宽
        return ojwidth;
      },
      // setter
      set: function(newValue) {}
    }
  },

  components: {
    mHeader,
    vueSlider
  },

  methods: {
    getData() {
      console.log(this.planName);
      // 请求数据
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetPlanInfo" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanName=" +
        this.planName +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetPlanInfo");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanName", this.planName);
      data.append("Sign", sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.PlanData = res.data.Data;
          this.input1 = this.PlanData.DefaultDSCount;
          this.input2 = this.PlanData.DefaultCycle;
          var dataDuringArr = [];
          dataDuringArr = this.PlanData.DataDuring.split(",");
          console.log(dataDuringArr);
          this.dataDuringIndex = [];
          this.dataDuringValue = [];
          for (var i = 0; i < dataDuringArr.length; i++) {
            this.dataDuringIndex.push(dataDuringArr[i].split(":")[0]);
            this.dataDuringValue.push(dataDuringArr[i].split(":")[1]);
          }
          console.log(this.dataDuringIndex);
          console.log(this.dataDuringValue);
          localStorage.input1 = this.input1;
          localStorage.input2 = this.input2;
          this.selectNameArr = this.dataDuringValue;
          localStorage.selectNameArrs = this.selectNameArr;
          this.selectIndexArr = this.dataDuringIndex;
          localStorage.selectIndexArrs = this.selectIndexArr;
          // this.dataDuringValue = dataDuringValue;
          // this.dataDuringIndex = dataDuringIndex;
        })
        .catch(error => {
          console.log(error);
        });
    },
    isSelect(item) {
      if (this.selectNameArr.indexOf(item) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    remove(arr, item) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] != item) {
          result.push(arr[i]);
        }
      }
      return result;
    },
    addBtn(index,item) {
      // console.log(item);
      console.log(this.selectNameArr.indexOf(item));
      if (this.selectNameArr.indexOf(item) >= 0) {
        this.selectNameArr = this.remove(this.selectNameArr, item);
        this.selectIndexArr = this.remove(this.selectIndexArr,index);
      } else {
        this.selectNameArr.push(item);
        this.selectIndexArr.push(index);
      }
      console.log(this.selectNameArr.indexOf(item));
      console.log(this.selectNameArr);
      localStorage.selectNameArrs = this.selectNameArr;
      localStorage.selectIndexArrs = this.selectIndexArr;
    },

    ok() {
      console.log(this.input1);
      console.log(this.input2);
      console.log(this.input31);
      console.log(this.input32);
      console.log(this.input41);
      console.log(this.input42);
      console.log(this.input51);
      console.log(this.input52);
      console.log(this.input61);
      console.log(this.input62);
      console.log(this.selectNameArr);

      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=OptimizePlan" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanName=" +
        this.planName +
        "&PlanCycle=" +
        this.input2 +
        "&DMSMCount=" +
        this.input1 +
        "&Accuracy=" +
        parseFloat(this.input31) +
        ":" +
        parseFloat(this.input32) +
        "&CurrentLianDui=" +
        parseInt(this.input61) +
        ":" +
        parseInt(this.input62) +
        "&MaxLianDui=" +
        parseInt(this.input41) +
        ":" +
        parseInt(this.input42) +
        "&MaxLianCuo=" +
        parseInt(this.input51) +
        ":" +
        parseInt(this.input52) +
        "&DataDuring=" +
        this.selectNameArr.toString() +
        tokenCode;
      let data = new FormData();
      data.append("Action", "OptimizePlan");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanName", this.planName);
      data.append("PlanCycle", this.input2);
      data.append("DMSMCount", this.input1);
      data.append(
        "Accuracy",
        parseFloat(this.input31) + ":" + parseFloat(this.input32)
      );
      data.append(
        "CurrentLianDui",
        parseInt(this.input61) + ":" + parseInt(this.input62)
      );
      data.append(
        "MaxLianDui",
        parseInt(this.input41) + ":" + parseInt(this.input42)
      );
      data.append(
        "MaxLianCuo",
        parseInt(this.input51) + ":" + parseInt(this.input52)
      );
      data.append("DataDuring", this.selectNameArr.toString());
      data.append("Sign", sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          // this.planNameData = res.data.Data;
          this.$router.go(-1);
        })
        .catch(error => {
          console.log(error);
        });
    },

    
    change1(value) {
      
      console.log(value);
      localStorage.input1 = value;
    },
    
    change2(value) {
      
      console.log(value);
      localStorage.input2 = value;
       localStorage.vcname = "setParameter";
    },
   
  }
};
</script>
