<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostList from "@/components/post/List/PostList.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import SearchBar from "@/components/post/Menu/SearchBar.vue";
import {useNoticeStore} from '@/pages/Notice/stores/useNoticeStore';

const noticeStore = useNoticeStore();
const { dataList, fetchAllPublicNotices } = noticeStore;

onMounted(() => {
  fetchAllPublicNotices();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList title="공지사항 게시판" :data-list="dataList"></PostList>
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