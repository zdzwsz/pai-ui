<template>
  <div id="app">
    <h2>测试自定义组件</h2>
    <p-sum-function :num1="num1" :num2="num2" v-on:getSumFromChild="receiveChildSum"></p-sum-function>
    <p>从子组件获取到的值：{{sumFromChild}}</p>
    <p>---------------------------------</p>
    <h2>计算器</h2>
    <p-calculator></p-calculator>
    <p>---------------------------------</p>
    <h2>农历日历</h2>
    <div style="width:100%;display:flex;align-items:center;justify-content:center;">
      <p-calendar></p-calendar>
      <div>&nbsp;&nbsp;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      num1: 4,
      num2: 5,
      sumFromChild:0,
    }
  },
  
  methods:{
    receiveChildSum(sum){ //自定义事件，接收子组件的和
      this.sumFromChild = sum;
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    font-size: 14px;
  }
</style>
