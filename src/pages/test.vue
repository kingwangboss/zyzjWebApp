<template>
  <div>
  <el-radio-group v-model="radioSex" @click="aaaa">
    <el-radio class="radio" label="man">男</el-radio>
    <el-radio class="radio" label="woman">女</el-radio> 
    <el-button @click="aaa">aaa</el-button>
  </el-radio-group>
</div>
</template>


<script>
export default {
    name: 'Radio',
    data () {
      return {
        radioSex: 'man'
      }
    },
    methods: {
        aaaa(){
            console.log('a')
        },
        aaa(){
            this.radioSex = 'woman';
        }
    }
  }
</script>

