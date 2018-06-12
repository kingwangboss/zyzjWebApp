<template>
    <div class="page-container">
        <m-header :title="title"></m-header>
        <div class="page-wrap" :class="title.tabClass">
            <mt-tab-container class="page-tabbar-container" v-model="selected">
                <mt-tab-container-item id="plan">
                    <kjview :kjdata="kjData" :Time="nextTime" v-if="flag"></kjview>
                    <plan :plandata="PlanData" v-if="planflag"></plan>
                </mt-tab-container-item>
                <mt-tab-container-item id="shujufenxi">
                    <shujufenxi></shujufenxi>
                </mt-tab-container-item>
                <mt-tab-container-item id="lishi">
                    <lishikaijiang :lishi="lishiData"></lishikaijiang>
                </mt-tab-container-item>
                <mt-tab-container-item id="wo">
                    <wo></wo>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>

        <mt-tabbar v-model="selected" fixed>
            <mt-tab-item id="plan">
                <img slot="icon" :src="tabList['plan'].src"> 计划追号
            </mt-tab-item>
            <mt-tab-item id="shujufenxi" v-show="sid != '9'">
                <img slot="icon" :src="tabList['shujufenxi'].src"> 数据分析
            </mt-tab-item>
            <mt-tab-item id="lishi">
                <img slot="icon" :src="tabList['lishi'].src"> 历史开奖
            </mt-tab-item>
            <mt-tab-item id="wo">
                <img slot="icon" :src="tabList['wo'].src"> 我
            </mt-tab-item>

        </mt-tabbar>
    </div>
</template>


<script>
import mHeader from "../components/hearder/Hearder";
import plan from "./plan";
// import shujufenxi from './shujufenxi'
import shujufenxi from "./shujufenxi1";
import lishikaijiang from "./lishikaijiang";
import wo from "./wo";
import kjview from "../components/kjview/kjview";
import sha256 from "../util/sha256";

const titleList = [
  {
    text: "计划追号",
    tabName: "plan",
    tabClass: "plan"
  },
  {
    text: "数据分析",
    tabName: "shujufenxi",
    tabClass: "shujufenxi"
  },
  {
    text: "历史开奖",
    tabName: "lishi",
    tabClass: "lishikaijiang"
  },
  {
    text: "我",
    tabName: "wo",
    tabClass: "wo"
  }
];

const tabList = {
  plan: {
    src: require("../../static/images/shouye.png"),
    defaultSrc: require("../../static/images/shouye.png"),
    activeSrc: require("../../static/images/shouye1.png")
  },
  shujufenxi: {
    src: require("../../static/images/rizhi.png"),
    defaultSrc: require("../../static/images/rizhi.png"),
    activeSrc: require("../../static/images/rizhi1.png")
  },
  lishi: {
    src: require("../../static/images/lishi.png"),
    defaultSrc: require("../../static/images/lishi.png"),
    activeSrc: require("../../static/images/lishi1.png")
  },
  wo: {
    src: require("../../static/images/wo.png"),
    defaultSrc: require("../../static/images/wo.png"),
    activeSrc: require("../../static/images/wo1.png")
  }
};
var tiemInterval;
var run;
export default {
  name: "planVC",
  data() {
    return {
      selected:
        typeof localStorage.tab === "undefined" ? "plan" : localStorage.tab,
      titleList: titleList,
      title: {
        text: localStorage.czname + " " + localStorage.AuthTypeName,
        showBack: false,
        showQH: true
      },
      tabList: tabList,
      sid: localStorage.sid,
      kjData: "",
      nextTime: "",
      flag: false,
      planflag: false,
      PlanData: "",
      lishiData: ""
    };
  },
  created() {
    console.log(localStorage.tab);
    tabList[
      typeof localStorage.tab === "undefined" ? "plan" : localStorage.tab
    ].src =
      tabList[
        typeof localStorage.tab === "undefined" ? "plan" : localStorage.tab
      ].activeSrc;
    if (typeof localStorage.tab === "undefined") {
      tabList["wo"].src = tabList["wo"].defaultSrc;
    }
    if (localStorage.tab === "plan") {
      this.title = {
        text: localStorage.czname + " " + localStorage.AuthTypeName,
        showBack: false,
        showQH: true
      };
    } else if (localStorage.tab === "shujufenxi") {
      this.title = {
        text: "数据分析",
        showBack: false,
        showQH: false,
        setting: true
      };
    } else if (localStorage.tab === "lishi") {
      this.title = this.titleList[2];
    } else if (localStorage.tab === "wo") {
      this.title = this.titleList[3];
    } else {
    }
  },
  mounted() {
    this.getkjData();
    this.getplanData();
    this.getlishiData();
  },
  beforeDestroy() {
    clearInterval(tiemInterval);
    clearInterval(run);
  },

  components: {
    mHeader,
    plan,
    shujufenxi,
    lishikaijiang,
    wo,
    kjview
  },
  watch: {
    selected(val, oldVal) {
      console.log(val);
      console.log(oldVal);
      this.tabList[val].src = this.tabList[val].activeSrc;
      this.tabList[oldVal].src = this.tabList[oldVal].defaultSrc;
      // console.log(this.tabList[val].src);
      switch (val) {
        case "plan":
          this.title = {
            text: localStorage.czname + " " + localStorage.AuthTypeName,
            showBack: false,
            showQH: true
          };
          localStorage.tab = "plan";
          // this.$router.push('/routerPush')
          break;
        case "shujufenxi":
          this.title = {
            text: "数据分析",
            showBack: false,
            showQH: false,
            setting: true
          };
          localStorage.tab = "shujufenxi";
          this.$router.push("/routerPush");
          break;
        case "lishi":
          this.title = this.titleList[2];
          localStorage.tab = "lishi";
          // this.$router.push('/routerPush')
          break;
        case "wo":
          this.title = this.titleList[3];
          localStorage.tab = "wo";
          break;
      }
    }
  },
  methods: {
    getData1() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Clock" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&CurrentLottery=0" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Clock");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("CurrentLottery", "0");
      data.append("Sign", sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          if (res.data.Data.NewLottery.NextPeriodTime > 0) {
            clearInterval(run);
            this.getkjData();
            // this.getcelldata();
            this.getplanData();
            this.getlishiData();
            console.log("yes");
          } else {
            console.log("no");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getkjData() {
      // this.$show.open();
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=Clock" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&CurrentLottery=0" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "Clock");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("CurrentLottery", "0");
      data.append("Sign", sha256.sha256(signStr).toUpperCase());
      //getClock握手
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          // this.$show.close();
          this.kjData = res.data.Data;
          this.nextTime = res.data.Data.NewLottery.NextPeriodTime;
          this.flag = true;

          //设置定时器，每1秒刷新一次
          var self = this;
          tiemInterval = setInterval(getTotelNumber, 1000);

          function getTotelNumber() {
            if (self.nextTime > 0) {
              self.nextTime--;
              // console.log(self.nextTime);
            } else {
              clearInterval(tiemInterval);
              var i = 0;
              run = setInterval(function() {
                if (localStorage.isLogin == "true") {
                  self.getData1();
                } else {
                  clearInterval(tiemInterval);
                }
              }, 5000);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    getplanData() {
      // 请求数据
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetPlanDatas2&AutoOpt=0" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetPlanDatas2");
      data.append("AutoOpt", "0");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", sha256.sha256(signStr).toUpperCase());
      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          this.PlanData = res.data.Data;

          var nameArr = [];
          for (var i = 0; i < this.PlanData.Data.length; i++) {
            nameArr.push(this.PlanData.Data[i].Name);
          }
          console.log(nameArr);
          localStorage.selectNameArr = nameArr.join(",");
          localStorage.cycleCount = this.PlanData.CycleCount;

          this.planflag = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getlishiData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetCPDatas" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&Page=1" +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetCPDatas");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Page", "1");
      data.append("Sign", sha256.sha256(signStr).toUpperCase());

      this.$http
        .post(localStorage.SiteUrl, data)
        .then(res => {
          console.log(res);
          this.lishiData = res.data.Data;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page-wrap {
  overflow: auto;
  height: 100%;
  margin-bottom: 55px;

  .mint-tab-container {
    height: 100%;
    margin-top: 0;
    margin-bottom: 0;
    z-index: 0;
  }
}

.mint-tabbar > .mint-tab-item {
  color: gray;
}
.mint-tabbar > .mint-tab-item.is-selected {
  color: rgb(214, 49, 56);
}
</style>
