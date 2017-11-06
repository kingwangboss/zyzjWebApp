<template>
  <div style="overflow:hidden">
      <m-header :title="title"></m-header>

      <div class="maincontainer">
        <div class="top" v-for="(PriceList,index) in listData.PriceList" :key="PriceList.toString()" @click="btnClick($event,PriceList.ID)">
            <div class="top-cell" :class="{'top-cell1':pid === PriceList.ID}">
                <div class="top-cell-item">
                    <div class="default" :class="{'select':pid === PriceList.ID}"></div>
                    <span class="item1" :class="{'item1select':pid === PriceList.ID}">{{PriceList.AuthTitle}}</span>
                    <span class="item2">￥{{PriceList.SourcePrice.toFixed(2)}}</span>
                </div>
                <div class="top-cell-item">
                    <span class="item4">{{PriceList.PurchaseType}}</span>
                    <span class="item3">￥{{PriceList.Price.toFixed(2)}}</span>
                    <div class="iv-arrow"></div>
                </div>
            </div>
        </div>
        
        <div style="margin-top:20px;">
          <div class="bottom" v-for="(DesceList,index1) in listData.DesceList" :key="DesceList.toString()">
            <div class="bottom-cell">
                <img style="height:12px;margin-left:10px;margin-right:10px;font-size:12px;margin-top:2px;" src="../../static/images/jihua.png" alt="">
                <span style="text-align:left;color:#878787;font-size:12px;line-height:16px;">{{DesceList.Desc}}</span>
            </div>
          </div>
        </div>

        <div class="btn">
            <el-button :disabled="isselect" style="margin:60px 0px 0px 20px;min-width:130px;" @click="weiClick()">
                <img style="width:15px;height:15px;" src="../../static/images/wei.png" alt="">
                <span style="font-size:15px;padding-top:10px;">微信支付</span>
            </el-button>

            <el-button :disabled="isselect" style="margin:60px 20px 0px 0px;min-width:130px;" @click="zhiClick()">
                <img style="width:15px;height:15px;" src="../../static/images/zhi.png" alt="">
                <span style="font-size:15px;">支付宝支付</span>
            </el-button>
        </div>
      </div>
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
  margin-top: 18px;
}
.maincontainer {
  display: flex;
  flex-direction: column;
  .top-cell1 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #efefef;
    background: #efefef;
  }
  .top-cell {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #efefef;
    .top-cell-item {
      display: flex;
      flex-direction: row;
      .item1 {
        font-weight: 400;
        color: #878787;
        font-size: 12px;
      }
      .item1select {
        font-size: 12px;
        color: #d63138;
        font-weight: 400;
      }
      .item2 {
        margin-left: 5px;
        color: #cdcdcd;
        text-decoration: line-through;
        font-size: 12px;
      }
      .item3 {
        color: #d63138;
        width: 60px;
        text-align: left;
        margin-left: 5px;
        font-size: 12px;
      }
      .item4 {
        // font-weight: 900;
        color: #d63138;
        font-size: 12px;
      }
    }
    .default {
      background: RGB(255, 255, 255);
      width: 3px;
      margin: 5px 5px;
    }
    .select {
      background: RGB(214, 49, 56);
      width: 3px;
      margin: 5px 5px;
    }
  }
  .bottom-cell {
    display: flex;
    flex-direction: row;
  }

  .bottom {
    margin-top: 5px;
  }
  .btn {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
export default {
  data() {
    return {
      title: {
        text: "购买续费",
        showBack: true,
        right: false
      },
      listData: "",
      descStr: [],
      pid: "",
      isselect: true
    };
  },
  components: {
    mHeader
  },

  methods: {
    getData() {
      let tokenCode = localStorage.tokenCode;
      let signStr =
        "Action=GetServicePrice" +
        "&SID=" +
        localStorage.sid +
        "&Token=" +
        localStorage.Token +
        tokenCode;
      let data = new FormData();
      data.append("Action", "GetServicePrice");
      data.append("SID", localStorage.sid);
      data.append("Token", localStorage.Token);
      data.append("Sign", sha256.sha256(signStr).toUpperCase());

      this.$http
        .post("https://idx.camew.com", data)
        .then(res => {
          this.listData = res.data.Data;
          for (var i = 0; i < this.listData.DesceList.length; i++) {
            this.descStr.push(this.listData.DesceList[i].AuthType);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    btnClick(btn, pid) {
      localStorage.pid = pid;
      this.pid = pid;
      this.isselect = false;
    },

    pushPay(index) {
      localStorage.pid = this.listData.PriceList[index].ID;
      pid = this.listData.PriceList[index].ID;
      this.$router.push({
        path: "/pay"
      });
    },

    weiClick() {
      var url =
        "http://wz.camew.com/wechat/purchase/#/wxservicePrice/" +
        this.pid +
        "?uid=" +
        localStorage.uid;
      window.location.href = url;
    },
    zhiClick() {
      var url =
        "http://wz.camew.com/wechat/purchase/#/servicePrice/" +
        this.pid +
        "?uid=" +
        localStorage.uid;
      window.location.href = url;
    }
  },
  computed: {
    isAuthtype: {
      get() {
        return localStorage.AuthType;
      }
    }
  },
  mounted() {
    localStorage.removeItem("pid");
    // 调用请求数据的方法
    this.getData();
  }
};
</script>
