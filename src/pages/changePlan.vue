<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">

            <div class="head">
                <span class="lab" style="font-size:12px; margin-top:20px;padding:0px 10px;">已选计划</span>
                <img src="../../static/images/bin.png" style="margin:20px 10px 10px 20px;width:16px;height:19px" alt="" @click="cancel">
            </div>

            <div class="top">
                <el-button type="text" class="btn" v-for="(item,index) in selectNameArr" :key="item" @click="removeBtn(item)">{{item}}
                </el-button>
                <!-- <el-button class="btn" style="background-image: url('../../static/images/Select-05.png')">12122</el-button> -->
            </div>

            <div class="middle"></div>

            <div class="head">
                <span class="lab" style="font-size:12px; margin-top:10px;padding:0px 10px;">所有计划</span>
            </div>

            <div class="planItemCell" v-for="item in planNameData" :key="item.toString()">
                <label class="lab" style="font-size:12px; margin-top:20px;margin-left:20px;text-align: left;color:#b0b0b0;">{{item.Group}}</label>
                <div>
                    <!-- <el-button v-show="isSelect(item1)" type="text" class="btnSelect" v-for="item1 in item.PlanList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}</el-button>
                                <el-button v-show="!isSelect(item1)" type="text" class="btn" v-for="item1 in item.PlanList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}</el-button> -->
                    <el-button :class="{'btnSelect':selectNameArr.indexOf(item1) >  -1}" type="text" class="btn" v-for="item1 in item.PlanList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}
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
        // padding: 8px;
        color: white;
        height: 22px;
        line-height: 24px;
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
        padding: 0px 5px 0px 5px;
        font-size: 12px;
        color: rgb(80, 80, 80);
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-05.png')
        border-radius: 3px;
        // border: 1px solid rgb(222, 222, 222);
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
        padding: 0px 5px 0px 5px;
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
        padding: 0px 5px 0px 5px;
        font-size: 12px;
        color: #d63138;
        // background-size: 100% 100%;
        // background-image: url('../../../static/images/Select-06.png')
        border-radius: 3px;
        border: 1px solid #c4c4c4;
    }
    
}



.bottom-btnView {
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 40px;
    display: flex;
    justify-content: space-between;
}

.bottom-btn {
    width: 50%;
    border-radius: 0px;
}
</style>


<script>
import mHeader from '../components/hearder/Hearder';
import sha256 from '../util/sha256'
export default {
    data() {
        return {
            title: {
                text: '更改计划',
                showBack: true,
                changePlan:true,
            },
            planNameData: "",
            selectNameArr: [],
        };
    },
    comments: {

    },
    created() {
        this.selectNameArr = localStorage.selectNameArr.split(',');
        // console.log(this.selectNameArr);
    },
    components: {
        mHeader,
    },
    methods: {
        isSelect(item1) {
            if (this.selectNameArr.indexOf(item1) >= 0) {
                return true;
            } else {
                return false;
            }

        },
        getData() {
            let tokenCode = localStorage.tokenCode;
            let signStr = 'Action=GetAllPlanNames' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + tokenCode;
            let data = new FormData();
            data.append('Action', 'GetAllPlanNames');
            data.append('SID', localStorage.sid);
            data.append('Token', localStorage.Token);
            data.append('Sign', sha256.sha256(signStr).toUpperCase());
            this.$http.post(localStorage.SiteUrl, data).then(res => {
                this.planNameData = res.data.Data;

            }).catch(error => {
                console.log(error);
            })
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
        removeBtn(item) {

            this.selectNameArr = this.remove(this.selectNameArr, item)
            localStorage.selectNameArr = this.selectNameArr;

        },
        addBtn(item1) {

            if (this.selectNameArr.indexOf(item1) >= 0) {
                this.selectNameArr = this.remove(this.selectNameArr, item1);
            } else {
                this.selectNameArr.push(item1)
            }
            localStorage.selectNameArr = this.selectNameArr;
        },
        ok() {
            let tokenCode = localStorage.tokenCode;
            let signStr = 'Action=UpdatePlanList' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + '&PlanList=' + this.selectNameArr.join(',') + tokenCode;
            let data = new FormData();
            data.append('Action', 'UpdatePlanList');
            data.append('SID', localStorage.sid);
            data.append('Token', localStorage.Token);
            data.append('PlanList', this.selectNameArr.join(','));
            data.append('Sign', sha256.sha256(signStr).toUpperCase());
            this.$http.post(localStorage.SiteUrl, data).then(res => {
                // this.planNameData = res.data.Data;
                // this.$router.go(-1);
                alert(1);
                // if(res.Code == 'Suc'){
                //     this.$router.go(-1);
                // }

            }).catch(error => {
                console.log(error);
            })
        },
        cancel() {
            // this.$router.go(-1);
            this.selectNameArr = [];
            localStorage.selectNameArr = this.selectNameArr;
        }
    },
    mounted() {
        // 调用请求数据的方法
        this.getData()
        localStorage.vcname = "changePlan";
    },
}
</script>
