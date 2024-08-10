<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import NoticeEditComponent from "@/components/post/Detail/NoticeEditComponent.vue"
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>공지사항 작성</h1>
      </div>
      <NoticeEditComponent></NoticeEditComponent>
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