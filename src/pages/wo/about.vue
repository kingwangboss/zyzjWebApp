<template>
    <div >
        <m-header :title="title"></m-header>
        <div class="main">
            <div class="top">

                <img class="top-img" src="../../../static/images/me/camew.png" alt="">

                <p class="title">
                关于我们
                </p>
                
                <p class="content">
                深圳市君耀优彩科技有限公司创建于2014年，旗下彩盟网拥有掌赢专家系列彩票分析软件及App，支持IOS平台；是互联网彩票分析领域的创新者，领导者。 掌赢专家系列软件拥有超级丰富的计划库，提供超强计划追号、云端计划管理、多平台一致的使用体验等前瞻性功能。 我们将以先进的技术和完善的服务为中国福利彩票事业贡献自己的力量！
                </p>
            </div>

            <div class="bottom">
                <span>官方网站：</span>
                <el-button type="text" style="color:blue" @click="urlClick">{{OfficialUrl}}</el-button>
                <p>版权所有：深圳市君耀优彩科技有限公司</p>
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


.main {
    // background-image: url(../../../static/images/About-01.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 90%;
    position: absolute;
}
.top {

    font-size: 15px;
    margin-top: 10%;
    margin-left: 10%;
    margin-right: 10%; // margin-bottom: 5%;
    .title{
        text-align:center;
        font-size:20px; 
        margin-bottom:40px;
        margin-top: 20px;
    }
    .content{
        text-align: left;
        text-indent: 2em;
        padding-bottom: 10px;
    }
    .top-img{
        width: 80px;
        height: 80px;
    }
}

.bottom {
    font-size: 13px;
    margin-top: 25%;
    margin-left: 15%;
    margin-right: 15%;
}

</style>

<script>
import mHeader from '../../components/hearder/Hearder';
import sha256 from '../../util/sha256'
export default {
    data() {
        return {
            title: {
                text: '关于我们',
                showBack: true,
            },
            OfficialUrl : localStorage.OfficialUrl,
        };
    },
    components: {
        mHeader,
    },
    methods: {
        urlClick() {
            window.location.href = 'http://ycw.cpnet.com';
        }
    }
}
</script>
