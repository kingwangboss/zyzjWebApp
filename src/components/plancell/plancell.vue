<template>
    <div>
        <div class="bottomcontainer" v-for="(cell,index) in PlanData" :key="index" @click="pushDetail($event,index)" >

        
            <div v-if="index%2 === 0" style="background:#fff;">
                <div class="cell-top">
                <div class="cell-top-left">
                    <img src="../../../static/images/plan17.png" alt="">
                    <span>{{cell.Name.replace("定码","")}}</span>
                </div>

                <div class="cell-top-right">
                    <div class="diandian">

                        <!-- <div v-for="item in dian[index]" :key="item">
                            <div v-if="item === '1'" class="dianMiddle" style="background:#30bb78;"></div>
                            <div v-else-if="item === '0'" class="dianMiddle" style="background:#d82e4b;"></div>
                            <div v-else class="dianMiddle" style="background:black;"></div>
                        </div> -->
                        <div v-for="(item,i) in analysis(cell.GuessResultList)" :key="i">
                            <div v-if="item === '1'" class="dianMiddle" style="background:#30bb78;"></div>
                            <div v-else-if="item === '0'" class="dianMiddle" style="background:#d82e4b;"></div>
                            <div v-else class="dianMiddle" style="background:black;"></div>
                        </div>
                    </div>
                    <span class="baifenbi">{{cell.GuessPercent}}</span>
                </div>

            </div>

            <div class="cell-bottom">
                <span class="item1">{{cell.PlanSection}}</span>
                <div class="item2">{{cell.EndIndex ? cell.EndIndex : 1}}</div>
                <img class="item3" v-if="cell.DSType === 0" src="../../../static/images/ding.png" alt="">
                <img class="item3" v-else-if="cell.DSType === 1" src="../../../static/images/sha.png" alt="">
                <span class="item4">{{cell.GuessValue}}</span>
            </div>
            </div>

            <div v-else style="background:#FAFAFA;">
                <div class="cell-top">
                <div class="cell-top-left">
                    <img src="../../../static/images/plan17.png" alt="">
                    <span>{{cell.Name.replace("定码","")}}</span>
                </div>

                <div class="cell-top-right">
                    <div class="diandian">

                        <!-- <div v-for="item in dian[index]" :key="item">
                            <div v-if="item === '1'" class="dianMiddle" style="background:#30bb78;"></div>
                            <div v-else-if="item === '0'" class="dianMiddle" style="background:#d82e4b;"></div>
                            <div v-else class="dianMiddle" style="background:black;"></div>
                        </div> -->
                        <div v-for="(item,i) in analysis(cell.GuessResultList)" :key="i">
                          <div v-if="item === '1'" class="dianMiddle" style="background:#30bb78;"></div>
                          <div v-else-if="item === '0'" class="dianMiddle" style="background:#d82e4b;"></div>
                          <div v-else class="dianMiddle" style="background:black;"></div>
                        </div>
                    </div>
                    <span class="baifenbi">{{cell.GuessPercent}}</span>
                </div>

            </div>

            <div class="cell-bottom">
                <span class="item1">{{cell.PlanSection}}</span>
                <div class="item2">{{cell.EndIndex ? cell.EndIndex : 1}}</div>
                <img class="item3" v-if="cell.DSType === 0" src="../../../static/images/ding.png" alt="">
                <img class="item3" v-else-if="cell.DSType === 1" src="../../../static/images/sha.png" alt="">
                <span class="item4">{{cell.GuessValue}}</span>
            </div>
            </div>
        </div>

        
        
    </div>
</template>

<style lang="less" scoped>
#bundle {
  .juzhong {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }
}

.bottomcontainer {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #efefef;
  word-wrap: break-word;
  justify-content: space-between;
  .cell-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    .cell-top-left {
      display: flex;
      flex-direction: row;
      margin-left: 5px;
      img {
        width: 17px;
        height: 17px;
        margin: 4px;
      }
      span {
        line-height: 26px;
        font-size: 12px;
        font-weight: 500;
      }
    }

    .cell-top-right {
      display: flex;
      flex-direction: row;
      .diandian {
        margin-bottom: 5px;
        #bundle > .juzhong;
      }

      .dianMiddle {
        // background: rgb(105, 201, 92);
        height: 5px;
        width: 5px;
        margin-left: 3px;
        margin-top: 5px;
      }

      .baifenbi {
        width: 30px;
        margin-left: 5px;
        margin-right: 5px;
        font-size: 12px;
        #bundle > .juzhong;
        color: #767676;
      }
    }
  }

  .cell-bottom {
    display: flex;
    flex-direction: flex-start;
    margin-top: 3px;
    margin-bottom: 10px;
    margin-left: 5px;
    .item1 {
      margin: 4px;
      font-size: 12px;
    }
    .item2 {
      font-size: 12px;
      margin-top: 2px;
      margin-right: 4px;
      width: 14px;
      height: 14px;
      line-height: 15px;
      color: rgb(67, 133, 223);
      background-image: url("../../../static/images/quan.png");
      background-size: 100% 100%;
    }
    .item3 {
      margin-top: 2px;
      margin-right: 4px;
      width: 14px;
      height: 14px;
      line-height: 14px;
    }
    .item4 {
      font-size: 12px;
      margin-top: 4px;
      margin-left: 4px;
      width: 60%;
      word-wrap: break-word;
      text-align: left;
    }
  }
}
</style>



<script>
export default {
  props: {
    data: {
      type: Array
    }
  },

  created() {
    this.PlanData = this.data;
  },
  watch: {
    data: function(now, old) {
      this.PlanData = this.data;
    }
  },
  data() {
    return {
      myheight: 100,
      PlanData: ""
    };
  },
  computed: {
    dian: {
      // getter
      get: function() {
        var temp = [];
        if (this.PlanData.Data[0].GuessResultList.split(",").length >= 10) {
          for (var i = 0; i < this.PlanData.Data.length; i++) {
            temp.push(
              this.PlanData.Data[i].GuessResultList.split(",")
                .reverse()
                .slice(0, 10)
            );
          }
        } else {
          for (var i = 0; i < this.PlanData.Data.length; i++) {
            temp.push(
              this.PlanData.Data[i].GuessResultList.split(",").reverse()
            );
          }
        }
        console.log(temp);
        return temp;
      },
      // setter
      set: function(newValue) {}
    },
    isSandian: {
      get() {
        if (
          parseInt(this.PlanData.CycleCount) > 0 &&
          parseInt(this.PlanData.CycleCount) <= 10
        ) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  methods: {
    pushDetail(event, index) {
      console.log("push");
      console.log(index);
      localStorage.detailID = index;
      this.$router.push({
        path: "/planVC/planDetail"
      });
    },
    analysis(str) {
      var temp = [];
      temp = str.split(",").reverse();
      return temp;
    }
  }
};
</script>