<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">
            <div class="head">
                <span class="lab" style="font-size:12px; margin-top:20px;padding:5px 10px;height:13px;">选择数据</span>
            </div>


            <div class="top">
                <!-- <el-button v-show="isSelect1(item)" type="text" class="btnSelect" v-for="(item,index) in KeyCountData1" :key="item" @click="addBtn1(item)">{{item}}
                            </el-button>
                            <el-button v-show="!isSelect1(item)" type="text" class="btn" v-for="(item,index) in KeyCountData1" :key="item" @click="addBtn1(item)">{{item}}
                            </el-button> -->
                <el-button :class="{'btnSelect':selectKeyCount1 == item}" type="text" class="btn" v-for="(item,index) in KeyCountData1" :key="item" @click="addBtn1(item)">{{item}}
                    <!-- <img src="" v-else class="you_image" alt=""> -->
                </el-button>
            </div>

            <div class="middle"></div>

            <div class="head">
                <span class="lab" style="font-size:12px; margin-top:20px;padding:5px 10px;height:13px;">选择位置</span>
            </div>
            <div class="planItemCell">
                <div>
                    <!-- <el-button v-show="isSelect(item)" type="text" class="btnSelect" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}</el-button>
                                <el-button v-show="!isSelect(item)" type="text" class="btn" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}</el-button> -->
                    <el-button :class="{'btnSelect':selectKeyNumberName2.indexOf(item) > -1}"  class="btn" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}

                        <!-- <img src="" v-else class="you_image" alt=""> -->
                    </el-button>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="less" scoped>
.head {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .lab {
        text-align: left;
        background: #CD0C16; 
        padding: 8px;
        color: white;
    }
}

.maincontainer {
    display: flex;
    flex-direction: column;
    margin-bottom: 45px;
}

.top {
    margin-bottom: 10px;
    .btn {
        height: 24px;
        line-height: 23px;
        align-content: center;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        font-size: 12px;
        color: rgb(80, 80, 80);
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-05.png')
        border-radius: 3px;
        // border: 1px solid rgb(222, 222, 222);
        border: 1px solid #c4c4c4;
    }
    .btnSelect {
        height: 24px;
        line-height: 23px;
        align-content: center;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        font-size: 12px;
        color: #d63138;
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-06.png')
        border-radius: 3px;
        border: 1px solid #c4c4c4;
    }
}

.middle {
    height: 1px;
    background: #efefef;
}




.planItemCell {
    display: flex;
    flex-direction: column;
    .btn {
        height: 24px;
        line-height: 23px;
        align-content: center;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        font-size: 12px;
        color: rgb(80, 80, 80);
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-05.png')
        border-radius: 3px;
        // border: 1px solid rgb(222, 222, 222);
        border: 1px solid #c4c4c4;
    }
    .btnSelect {
        height: 24px;
        line-height: 23px;
        align-content: center;
        float: left;
        margin-left: 10px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        padding: 0px 10px 0px 10px;
        font-size: 12px;
        color: #d63138;
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-06.png')
        border-radius: 3px;
        border: 1px solid #c4c4c4;
    }
}


</style>

<script>
import mHeader from '../../components/hearder/Hearder';
import sha256 from '../../util/sha256'
export default {
    data() {
        return {
            listData: '',
            listData1: '',
            title: {
                text: '冷热分析设置',
                showBack: true,
                ok: true,
            },
            //总计划
            KeyNumbers: [],
            KeyCountData1: [],
            selectKeyNumberName2: localStorage.selectKeyNumberName2.split(','),
            selectKeyCount1: localStorage.selectDataCount1,
        }
    },
    components: {
        mHeader,
    },
    methods: {
        getData() {
            let tokenCode = localStorage.tokenCode;
            let signStr = 'Action=GetKeyNumbers' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + tokenCode;
            let data = new FormData();
            data.append('Action', 'GetKeyNumbers');
            data.append('SID', localStorage.sid);
            data.append('Token', localStorage.Token);
            data.append('Sign', sha256.sha256(signStr).toUpperCase());
            this.$http.post(localStorage.SiteUrl, data).then(res => {
                this.listData = res.data.Data;
                this.KeyNumbers = this.listData.KeyNumbers.split(',')
                localStorage.allKeyNumName2 = this.listData.KeyNumbers;
                console.log(this.listData.KeyNumbers);
            }).catch(error => {
                console.log(error);
            })
        },
        getData1() {
            let tokenCode = localStorage.tokenCode;
            let signStr = 'Action=GetLengReOpt' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + tokenCode;
            let data = new FormData();
            data.append('Action', 'GetLengReOpt');
            data.append('SID', localStorage.sid);
            data.append('Token', localStorage.Token);
            data.append('Sign', sha256.sha256(signStr).toUpperCase());
            this.$http.post(localStorage.SiteUrl, data).then(res => {
                this.listData1 = res.data.Data;
                console.log(this.listData1.AllDataCount)
                this.KeyCountData1 = this.listData1.AllDataCount.split(',')
                localStorage.AllDataCount1 = this.listData1.AllDataCount;
                console.log(this.listData1.AllDataCount)
            }).catch(error => {
                console.log(error);
            })
        },
        isSelect(item1) {

            if (this.selectKeyNumberName2.indexOf(item1) >= 0) {
                return true;
            } else {
                return false;
            }

        },
        isSelect1(item1) {

            if (this.selectKeyCount1 == item1) {
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

        addBtn(item1) {
            if (this.selectKeyNumberName2.indexOf(item1) >= 0) {
                this.selectKeyNumberName2 = this.remove(this.selectKeyNumberName2, item1);
            } else {
                this.selectKeyNumberName2.push(item1)
            }
            localStorage.selectKeyNumberName2 = this.selectKeyNumberName2;
            console.log(localStorage.selectKeyNumberName2)
        },

        addBtn1(item1) {
            this.selectKeyCount1 = item1;
            localStorage.selectDataCount1 = this.selectKeyCount1;
            console.log(localStorage.selectDataCount1)
        },
    },
    created() {
        console.log(localStorage.selectKeyNumberName2);
        console.log(localStorage.selectKeyNumberName2.split(','))
    },
    mounted() {
        this.getData();
        this.getData1();
    }
}
</script>
