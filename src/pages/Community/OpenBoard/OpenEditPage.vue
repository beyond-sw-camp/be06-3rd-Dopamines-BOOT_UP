<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>공개게시판 수정</h1>
      </div>
      <PostEditor></PostEditor>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
main {
  flex-direction: column;
} 

.board-create-title {
  max-width: 1000px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
}
</style>