<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import ProjectListComponent from "@/pages/Project/component/ProjectListComponent.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <ProjectListComponent></ProjectListComponent>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>

</style>