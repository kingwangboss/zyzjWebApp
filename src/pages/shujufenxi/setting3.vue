<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">

            <div class="head">
                <span class="lab" style="font-size:15px; margin:20px 10px 10px;font-weight:900">已选计划</span>
            </div>


            <div class="planItemCell" v-for="item in listData.Norms" :key="item.toString()">
                <label class="lab" style="font-size:14px; margin-top:10px;margin-left:20px; font-weight:900;text-align: left;">{{item.Group}}</label>
                <div>
                    <!-- <el-button type="text" class="btn" v-for="item1 in item.NormList" :key="item1.toString()" @click="addBtn(item)">{{item1}}</el-button> -->
                    <!-- <el-button v-show="isSelect(item1)" type="text" class="btnSelect" v-for="item1 in item.NormList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}</el-button>
                    <el-button v-show="!isSelect(item1)" type="text" class="btn" v-for="item1 in item.NormList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}</el-button> -->
                    <el-button :class="{'btnSelect':selectKeyNumberName3 == item1}" type="text" class="btn" v-for="item1 in item.NormList" :key="item1.toString()" @click="addBtn(item1)">{{item1}}
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

.planItemCell {
    display: flex;
    flex-direction: column;

    .btn {
        height: 25px;
        line-height: 25px;
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
        line-height: 25px;
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
</style>

<script>
import mHeader from '../../components/hearder/Hearder';
import sha256 from '../../util/sha256'
export default {
    data() {
        return {
            listData: '',
            title: {
                text: '遗漏分析设置',
                showBack: true,
                ok: true,
            },
            //总计划
            KeyNumbers:[],
            selectKeyNumberName3 : localStorage.selectKeyNumberName3.split(','),
            
        }
    },
    components: {
        mHeader,
    },
    methods: {
        getData() {
            let tokenCode = localStorage.tokenCode;
            let signStr = 'Action=GetAllNormNames' + '&SID=' + localStorage.sid + '&Token=' + localStorage.Token + "&Ver=" + tokenCode;
            let data = new FormData();
            data.append('Action', 'GetAllNormNames');
            data.append('SID', localStorage.sid);
            data.append('Token', localStorage.Token);
            data.append('Ver', '');
            data.append('Sign', sha256.sha256(signStr).toUpperCase());
            this.$http.post(localStorage.SiteUrl, data).then(res => {
                this.listData = res.data.Data;
                // this.KeyNumbers = this.listData.KeyNumbers.split(',')
                // localStorage.allKeyNumName1 = this.listData.KeyNumbers;
                // console.log(this.listData.KeyNumbers);
            }).catch(error => {
                console.log(error);
            })
        },
        isSelect(item1){
            
            if(this.selectKeyNumberName3 == item1){
                return true;
            }else{
                return false;
            }

        },
        
        addBtn(item1){
            
            this.selectKeyNumberName3 = item1;
            localStorage.selectKeyNumberName3 = this.selectKeyNumberName3;
            console.log(localStorage.selectKeyNumberName3)
        },
    },
    created(){
        console.log(localStorage.selectKeyNumberName3);
        console.log(localStorage.selectKeyNumberName3.split(','))
    },
    mounted() {
        this.getData();
    }
}
</script>
