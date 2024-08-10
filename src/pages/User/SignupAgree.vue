<template>
  <div class="body-container">
    <MainHeader/>
      <main>
        <div class="main-container">
          <SignupLevelComponent />
          <SignupAgreeComponent/>
        </div>
      </main>
    <MainFooter/>
  </div>
</template>
<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import SignupLevelComponent from "@/pages/User/component/SignupLevelComponent.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import SignupAgreeComponent from "@/pages/User/component/SignupAgreeComponent.vue";
</script>
<style scoped>
  .main-container{
    align-items: center;
  }
</style>