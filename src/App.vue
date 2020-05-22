<template>
  <div id="app">
    <h2>calculate</h2>
    <SumFunction :num1="num1" :num2="num2" v-on:getSumFromChild="receiveChildSum"></SumFunction>
    <p>从子组件获取到的值：{{sumFromChild}}</p>
    <FlowCanvas type = "primary">this is a test</FlowCanvas>
  </div>
</template>

<script>
import SumFunction from './paiui/sum-function/SumFunction';
import FlowCanvas from './paiui/flow-canvas/FlowCanvas'; 
export default {
  name: 'app',
  data () {
    return {
      num1: 4,
      num2: 5,
      sumFromChild:0,
    }
  },
  components:{ //注册插件
    SumFunction,
    FlowCanvas
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
  }
</style>
