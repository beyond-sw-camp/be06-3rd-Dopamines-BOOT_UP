<template>
  <!-- todo -> v-if 적용-->
  <button type="submit" :disabled="isAccess === false" class="submit-btn-primary"  :class="[isAccess === true? 'submit-btn-primary': 'submit-btn-disabled']"><strong>회원가입</strong>
  </button>
</template>

<script>
export default {
  name:"SignupButtonComponent",
  props:["isAccess"]
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