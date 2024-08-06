<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <PostEditor board-title="공지사항 수정"></PostEditor>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>

</style>