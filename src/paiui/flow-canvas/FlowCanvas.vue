<template>
  <div style="width:100%;display:flex;align-items:center;justify-content:center;">
    <div
      :class="type == 'Default'?'btn default':type == 'primary'?'btn primary':type == 'danger'?'btn danger':'btn default'"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "alley-Button",
  props: {
    type: {
      type: String,
      default: "Default"
    }
  }
};
</script>


<style>
.btn {
  width: 100px;
  height: 40px;
  color: #fff;
  text-align: center;
  line-height: 40px;
}
.default {
  background: red;
}

.primary {
  background: #019201ee;
}

.danger {
  background: #ccc;
}
</style>