<template>
  <!-- todo -> v-if 적용-->
   <!-- 부모 컴포넌트에게 클릭 이벤트 전달 -->
  <button :disabled="isDisabled" @click="handleClick" :class="{'submit-btn-primary': !isDisabled, 'submit-btn-disabled': isDisabled}"><strong>회원가입</strong>
  </button>
</template>

<script>
export default {
  name:"SubmitBtnComponent",
  props:{
    isDisabled: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      if (!this.isDisabled) {
        this.$emit('click');
      }
    }
  }
}
</script>

<style scoped>
.submit-btn-primary{
  border-radius: 5px;
  background-color: #E06139;
  color : white;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}
.submit-btn-disabled{
  border-radius: 5px;
  background-color: #82827F;
  color : white;
  width: 100%;
  padding-top: 5px;
  padding-bottom: 5px;
}

</style>