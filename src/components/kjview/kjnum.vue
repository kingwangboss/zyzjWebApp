<template>
    <div class="content">
        <div v-show="isLan(index)" class="kjnum" :style="{width:ojwidth+'px',height:ojwidth+'px',borderRadius:ojwidth+'px',lineHeight:ojwidth+'px'}" :key="item" v-for="(item,index) in numArr">{{item}}</div>
        <div v-show="!isLan(index)" class="kjnum1" :style="{width:ojwidth+'px',height:ojwidth+'px',borderRadius:ojwidth+'px',lineHeight:ojwidth+'px'}" :key="item" v-for="(item,index) in numArr">{{item}}</div>
    </div>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    flex-wrap: wrap;
    .kjnum {
    
        font-size: 15px;
        background: rgb(219, 60, 62);
        line-height: 30px;
        width: 30px;
        border-radius: 30px;
        text-align: center;
        margin: 4px;
        color: white;
    }
    .kjnum1 {
       font-size: 15px;
        background: rgb(63, 123, 244);
        line-height: 30px;
        width: 30px;
        border-radius: 30px;
        text-align: center;
        margin: 4px;
        color: white;

        // background-color:rgb(63, 123, 244);
    }
}
</style>


<script>

export default {
    props:{
        data:{
            type:Array,      
        }
    },
    data() {
        return {
            numArr: "",
            // width: 100,
            height: 30,
            screenWidth: document.body.clientWidth   // 这里是给到了一个默认值 （这个很重要）
        }
    },
    methods:{
        isLan(index){
            if(index === 20){
                return false;
            }else {
                return true;
            }
        }
    },
    created(){
        this.numArr = this.data;
    },
    mounted() {
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            })()
        }

    },
    watch: {
        screenWidth(val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    // that.screenWidth = that.$store.state.canvasWidth
                    // that.init()
                    that.timer = false
                }, 400)
            }
        }
    },
    // components: {
    //     numArr: num,
    // },
    computed: {
        ojwidth: {
            // getter
            get: function () {
                var ojwidth;
                var margin;
                var colnum = 10;//列
                colnum = this.numArr.length > colnum ? colnum : this.numArr.length;
                var rownum = this.numArr.length / colnum;//行
                margin = this.numArr.length >= 10 ? 4 : 20;//间距
                ojwidth = (this.screenWidth - (2 * (margin+1) * colnum)) / colnum;//格子的宽
                if(this.numArr.length < 10){
                    ojwidth = 30;
                }else{

                }
                return ojwidth;
            },
            // setter
            set: function (newValue) {
               
            }
        }
    }
}
</script>

