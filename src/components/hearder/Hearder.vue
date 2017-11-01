<template>
    <div class="header-wrapper">
        <div class="header">
            <div class="title-wrapper">
                <span v-if="title.showBack" class="back" @click="back">
                    <img style="width:10px;" src="../../../static/images/back.png" alt="返回" />
                </span>

                <span v-if="title.showQH" class="back" @click="qhCaizhong">
                    <img src="../../../static/images/left-qh.png" alt="" />
                </span>
                <!-- <span class="title">{{title.text}}</span> -->
                <span class="title">{{title.text}}</span>

                <span v-if="title.right" class="right" @click="right">
                    <img src="../../../static/images/sousuobtn.png" alt="搜索" />
                </span>

                <span v-if="title.setting" class="right" @click="setting">
                    <img src="../../../static/images/settings.png" alt="设置" />
                </span>

                <span v-if="title.ok" class="right" @click="okClick">
                    <span>确定</span>
                </span>

                <span v-if="title.setok" class="right" @click="setok">
                    <span>提交</span>
                </span>

                <span v-if="title.changePlan" class="right" @click="changePlanClick">
                    <span>确定</span>
                </span>

                <span v-if="title.changeOK" class="right" @click="changeOkClick">
                    <span>确定</span>
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.header-wrapper {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1;
  .header {
    height: 44px;
    background-color: rgb(219, 60, 62);
    line-height: 44px;
    text-align: center; // background-image: url('../../../static/images/topbg.png');
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    .title-wrapper {
      font-size: 15px;
      color: #fcfcfc;
      span {
        display: inline-block;
      }
      .title {
        width: 74%;
        font-weight: 500;
      }
      .back {
        width: 50px;
        margin-left: -50px;
        img {
          width: 20px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
          padding: 3px;
        }
      }
      .right {
        width: 12%;
        margin-right: -50px;
        img {
          width: 20px;
          height: 20px;
          line-height: 20px;
          vertical-align: middle;
          padding: 3px;
        }
      }
    }
  }
}
</style>


<script>
import sha256 from "../../util/sha256";
export default {
  props: {
    title: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    right() {
      this.$router.push("/planVC/planDetail/setParameter");
    },
    qhCaizhong() {
      this.$router.push("/XZcaizhong");
    },
    setting() {
      console.log(localStorage.shujufenxi);
      if (localStorage.shujufenxi == "1") {
        this.$router.push("/shujufenxi/setting1");
      } else if (localStorage.shujufenxi == "2") {
        this.$router.push("/shujufenxi/setting2");
      } else if (localStorage.shujufenxi == "3") {
        this.$router.push("/shujufenxi/setting3");
      } else if (localStorage.shujufenxi == "4") {
        this.$router.push("/shujufenxi/setting4");
      } else {
      }
    },
    okClick() {
      console.log("确定");
      if (localStorage.shujufenxi == "1") {
        console.log(localStorage.selectKeyNumberName1.split(","));
        console.log(localStorage.allKeyNumName1);
        var selectNum = [];
        for (
          var j = 0;
          j < localStorage.selectKeyNumberName1.split(",").length;
          j++
        ) {
          for (
            var i = 0;
            i < localStorage.allKeyNumName1.split(",").length;
            i++
          ) {
            if (
              localStorage.selectKeyNumberName1.split(",")[j] ==
              localStorage.allKeyNumName1.split(",")[i]
            ) {
              selectNum.push(i);
            } else {
            }
          }
        }
        localStorage.keyNum1 = selectNum;
        this.$router.go(-1);
        console.log(selectNum);
      } else if (localStorage.shujufenxi == "2") {
        console.log(localStorage.selectKeyNumberName2.split(","));
        console.log(localStorage.allKeyNumName2);
        var selectNum = [];
        for (
          var j = 0;
          j < localStorage.selectKeyNumberName2.split(",").length;
          j++
        ) {
          for (
            var i = 0;
            i < localStorage.allKeyNumName2.split(",").length;
            i++
          ) {
            if (
              localStorage.selectKeyNumberName2.split(",")[j] ==
              localStorage.allKeyNumName2.split(",")[i]
            ) {
              selectNum.push(i);
            } else {
            }
          }
        }
        localStorage.keyNum2 = selectNum;
        this.$router.go(-1);
        console.log(selectNum);
      } else if (localStorage.shujufenxi == "3") {
        localStorage.Norm1 = localStorage.selectKeyNumberName3;
        this.$router.go(-1);
      } else if (localStorage.shujufenxi == "4") {
        localStorage.Norm2 = localStorage.selectKeyNumberName4;
        this.$router.go(-1);
      } else {
      }
    },

    changePlanClick() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=UpdatePlanList" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanList=" +
        localStorage.selectNameArr +
        tokenCode;
      let data = new FormData();
      data.append("Action", "UpdatePlanList");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanList", localStorage.selectNameArr);
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

    changeOkClick() {
      localStorage.sid = localStorage.sid1;
      localStorage.czname = localStorage.czname1;
      if (localStorage.isLogin == "true") {
        let signStr =
          localStorage.sid +
          localStorage.Username +
          "4ZYZJ1.0" +
          localStorage.pwd;
        let data = new FormData();
        data.append("Action", "Login");
        data.append("SID", localStorage.sid);
        data.append("Account", localStorage.Username);
        data.append("AppType", "4");
        data.append("AppCode", "ZYZJ");
        data.append("AppVersion", "1.0");
        data.append("Sign", sha256.sha256(signStr).toUpperCase());

        this.$http
          .post("https://idx.camew.com", data)
          .then(res => {
            if (res) {
              localStorage.uid = res.data.Data.UID;
              localStorage.AuthTypeName = res.data.Data.AuthTypeName;
              localStorage.SiteUrl = res.data.Data.SiteUrl;
              localStorage.AuthType = res.data.Data.AuthType;
              localStorage.Username = res.data.Data.NickName;
              localStorage.Token = res.data.Data.Token;
              localStorage.PayType = res.data.Data.PayType;
              localStorage.tokenCode = sha256
                .sha256(res.data.Data.Token + localStorage.pwd)
                .toUpperCase();

              localStorage.removeItem("keyNum1");
              localStorage.removeItem("keyNum2");
              localStorage.removeItem("Norm1");
              localStorage.removeItem("Norm2");
              localStorage.removeItem("selectDataCount1");
              localStorage.removeItem("selectDataCount2");
              localStorage.removeItem("shujufenxi");
              localStorage.removeItem("activeName2");

              this.$router.push({
                path: "/planVC"
              });
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.$router.push({
          path: "/"
        });
      }
    },
    setok() {
      console.log("提交");
      console.log(localStorage.selectNameArr.split(',')[localStorage.detailID]);
      console.log(localStorage.input1);
      console.log(localStorage.input2);
      console.log(localStorage.value1);
      console.log(localStorage.value2);
      console.log(localStorage.value3);
      console.log(localStorage.value4);
      console.log(localStorage.selectNameArrs.split(',').sort());

      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=OptimizePlan" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        "&PlanName=" +
        localStorage.selectNameArr.split(',')[localStorage.detailID] +
        "&PlanCycle=" +
        localStorage.input2 +
        "&DMSMCount=" +
        localStorage.input1 +
        "&Accuracy=" +
        parseFloat(localStorage.value1.split(',')[0]) +
        ":" +
        parseFloat(localStorage.value1.split(',')[1]) +
        "&CurrentLianDui=" +
        parseInt(localStorage.value4.split(',')[0]) +
        ":" +
        parseInt(localStorage.value4.split(',')[1]) +
        "&MaxLianDui=" +
        parseInt(localStorage.value2.split(',')[0]) +
        ":" +
        parseInt(localStorage.value2.split(',')[1]) +
        "&MaxLianCuo=" +
        parseInt(localStorage.value3.split(',')[0]) +
        ":" +
        parseInt(localStorage.value3.split(',')[1]) +
        "&DataDuring=" +
        localStorage.selectNameArrs.split(',').sort().toString() +
        tokenCode;
      let data = new FormData();
      data.append("Action", "OptimizePlan");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("PlanName", localStorage.selectNameArr.split(',')[localStorage.detailID]);
      data.append("PlanCycle", localStorage.input2);
      data.append("DMSMCount", localStorage.input1);
      data.append(
        "Accuracy",
        parseFloat(localStorage.value1.split(',')[0]) + ":" + parseFloat(localStorage.value1.split(',')[1])
      );
      data.append(
        "CurrentLianDui",
        parseInt(localStorage.value4.split(',')[0]) + ":" + parseInt(localStorage.value4.split(',')[1])
      );
      data.append(
        "MaxLianDui",
        parseInt(localStorage.value2.split(',')[0]) + ":" + parseInt(localStorage.value2.split(',')[1])
      );
      data.append(
        "MaxLianCuo",
        parseInt(localStorage.value3.split(',')[0]) + ":" + parseInt(localStorage.value3.split(',')[1])
      );
      data.append("DataDuring", localStorage.selectNameArrs.split(',').sort().toString());
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
    }
  }
};
</script>