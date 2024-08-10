<script>
export default {
  name:"SubmitBtnComponent",
  props:{
    text:{
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      required: true
    },
    handleSubmit:{
      type: Function,
      required: true
    }
  }
}
</script>

<template>
  <!-- todo -> v-if 적용-->
   <!-- 부모 컴포넌트에게 클릭 이벤트 전달 -->
  <button :disabled="isDisabled" :class="{'submit-btn-primary': !isDisabled, 'submit-btn-disabled': isDisabled}" @click="handleSubmit">
    <strong>{{ text }}</strong>
  </button>
</template>

<style scoped>
.submit-btn-primary{
  border-radius: 5px;
  background-color: #E06139;
  color : white;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
.submit-btn-disabled{
  border-radius: 5px;
  background-color: #82827F;
  color : white;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>