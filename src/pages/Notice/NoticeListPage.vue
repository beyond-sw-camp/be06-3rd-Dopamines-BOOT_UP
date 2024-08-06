<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import PostList from "@/pages/component/List/PostList.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import SearchBar from "@/pages/component/Menu/SearchBar.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList title="공지사항 게시판"></PostList>
        <SearchBar ></SearchBar>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.content-area{
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
}
</style>