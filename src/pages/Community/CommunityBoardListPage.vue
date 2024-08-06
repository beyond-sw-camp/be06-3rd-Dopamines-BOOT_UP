<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostList from "@/pages/component/List/PostList.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
// import SearchBar from "@/pages/component/Menu/SearchBar.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList title="자유 게시판"></PostList>
        <PostList title="공개 게시판"></PostList>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.content-area{
  display: flex;
  width: 100%;
  gap: 20px;
}
</style>