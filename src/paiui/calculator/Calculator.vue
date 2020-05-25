<template>
  <div style = "width:100%;text-align: center;display:flex;align-items:center;justify-content:center;">
    <div class="calculator">
      <calculator-content></calculator-content>
    </div>
  </div>
</template>

<script>
import CalculatorContent from "./CalculatorContent.vue";
export default {
  name: "p-calculator",
  components: {
    CalculatorContent
  }
};
</script>

<style>
.calculator {
  text-align: center;
  border: 0.4rem solid #d1bfbf;
  width: 34rem;
  height: 40rem;
  background-color: #e7dddd;
  font-size: 1.6rem;
  -webkit-border-radius: 1rem;
  -moz-border-radius: 1rem;
  -ms-border-radius: 1rem;
  -o-border-radius: 1rem;
  border-radius: 1rem;
  -webkit-box-shadow: 1rem 1rem 0.5rem #ccc;
  box-shadow: 0.2rem 0.2rem 0.5rem #ccc;
}
</style>
