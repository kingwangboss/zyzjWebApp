<template>
    <div>
        <m-header :title="title">
        </m-header>
        <div class="maincontainer">

            <div class="head">
                <span class="lab" style="font-size:12px; margin-top:20px;padding:5px 10px;height:13px;">选择位置</span>
            </div>
            <div class="planItemCell">
                <div>
                    <!-- <el-button v-show="isSelect(item)" type="text" class="btnSelect" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}</el-button>
                        <el-button v-show="!isSelect(item)" type="text" class="btn" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}</el-button> -->
                    <el-button :class="{'btnSelect':selectKeyNumberName1.indexOf(item) > -1}" type="text" class="btn" v-for="item in KeyNumbers" :key="item.toString()" @click="addBtn(item)">{{item}}
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
            title: {
                text: '遗漏分析设置',
                showBack: true,
                ok: true,
            },
            //总计划
            KeyNumbers: [],
            selectKeyNumberName1: localStorage.selectKeyNumberName1.split(','),

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
                localStorage.allKeyNumName1 = this.listData.KeyNumbers;
                console.log(this.listData.KeyNumbers);
            }).catch(error => {
                console.log(error);
            })
        },
        isSelect(item1) {

            if (this.selectKeyNumberName1.indexOf(item1) >= 0) {
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
        removeBtn(item) {
            // console.log(localStorage.selectKeyNumberName1);
            // console.log(item);
            this.selectKeyNumberName1 = this.remove(this.selectKeyNumberName1, item)

        },
        addBtn(item1) {
            if (this.selectKeyNumberName1.indexOf(item1) >= 0) {
                this.selectKeyNumberName1 = this.remove(this.selectKeyNumberName1, item1);
            } else {
                this.selectKeyNumberName1.push(item1)
            }
            localStorage.selectKeyNumberName1 = this.selectKeyNumberName1;
        },
    },
    created() {
        console.log(localStorage.selectKeyNumberName1);
        console.log(localStorage.selectKeyNumberName1.split(','))
    },
    mounted() {
        this.getData();
    }
}
</script>
