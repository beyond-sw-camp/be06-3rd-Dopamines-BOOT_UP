<script setup>
import {onMounted} from "vue";

onMounted(() => {
  console.log("   █████║      ███║      ███║   ████████║   ██╗   ██╗  ██████╗   ██║");
  console.log("   █║   ██║  ██║  ██║  ██║  ██║    ██║      ██║   ██║  ██║  ██║  ██║");
  console.log("   █║██║     ██║  ██║  ██║  ██║    ██║      ██║   ██║  ██████║   ██║");
  console.log("   █║   ██║  ██║  ██║  ██║  ██║    ██║      ██║   ██║  ██║          ");
  console.log("   █████║      ███║      ███║      ██║        ████║    ██║       ██║");
})
</script>

<template>
  <router-view></router-view>
</template>

<style scoped>

</style>
