<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
      // isAccess: {
      //   type: Boolean
      // },
      text:{
        type: String,
        required: true
      }
  })
</script>

<template>
  <!-- todo -> v-if 적용-->
  <button type="submit" class="submit-btn-disabled">
    <strong>{{ props.text }}</strong>
  </button>
</template>

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