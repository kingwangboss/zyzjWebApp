<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">
            <div class="cell" v-for="item in dataList" :key="item.toString()">
                <div class="cell-btnview">
                    <!-- <el-button v-show="isSelect(item1)" class="btnSelect" :class="{'btnSelect':ind === item1.SID}" type="text" v-for="item1 in item.CPNames" :key="item1.toString()" @click="btnClick($event,item1.SID)">{{item1.CPName}}</el-button>
                    <el-button v-show="!isSelect(item1)" class="btn" :class="{'btnSelect':ind === item1.SID}" type="text" v-for="item1 in item.CPNames" :key="item1.toString()" @click="btnClick($event,item1.SID)">{{item1.CPName}}</el-button> -->
                    <el-button class="btn" :class="{'btnSelect':ind == item1.SID}" type="text" v-for="item1 in item.CPNames" :key="item1.toString()" @click="btnClick($event,item1.SID)">{{item1.CPName}}
                        <!-- <img src="" v-else class="you_image" alt=""> -->
                    </el-button>
                </div>
                <div class="line">
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.maincontainer {
  display: flex;
  flex-direction: column;
}

.cell {
  display: flex;
  flex-direction: column;
}

.cell-btnview {
  margin-top: 10px;
  margin-bottom: 20px;
  // height: 50px;
  .btn {
    height: 25px;
    line-height: 23px;
    align-content: center;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    font-size: 13px;
    color: rgb(80, 80, 80);
    // background-size: 100% 100%;
    // background-image: url('../../../static/images/Select-05.png')
    border-radius: 3px;
    // border: 1px solid rgb(222, 222, 222);
    border: 1px solid #c4c4c4;
  }
  .btnSelect {
    height: 25px;
    line-height: 23px;
    align-content: center;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding: 0px 10px 0px 10px;
    font-size: 13px;
    color: #d63138;
    // background-size: 100% 100%;
    // background-image: url('../../../static/images/Select-06.png')
    border-radius: 3px;
    border: 1px solid #c4c4c4;
  }
}

.line {
  height: 1px;
  background: #efefef;
}
</style>


<script>
import mHeader from "../components/hearder/Hearder";
import sha256 from "../util/sha256";
export default {
  data() {
    return {
      title: {
        text: "选择彩种",
        showBack: true,
        changeOK: true
      },
      dataList: [],
      ind: ""
    };
  },
  watch: {
    ind: function(now, old) {
      if (now) {
        this.title.changeOK = true;
      } else {
        this.title.changeOK = false;
      }
    }
  },
  components: {
    mHeader
  },
  methods: {
    getData() {
      let data = new FormData();
      data.append("Action", "GetServiceList");
      this.$http
        .post(this.global.url, data)
        .then(res => {
          console.log("getservicelist");
          this.dataList = res.data.Data;
        })
        .catch(error => {});
    },
    btnClick(btn, sid) {
      console.log(this.$route.params);
      console.log(btn);
      localStorage.sid1 = sid ? sid : localStorage.sid;
      localStorage.czname1 = btn.target.innerText;
      this.ind = sid;
    },
    isSelect(item1) {
      if (item1.SID == localStorage.sid) {
        return true;
      } else {
        return false;
      }
    }
  },
  mounted() {
    this.getData();
    this.ind = localStorage.sid;
    localStorage.vcname = "XZcaizhong";
  }
};
</script>
