<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";
import {useNoticeStore} from '@/pages/Notice/stores/useNoticeStore';

const noticeStore = useNoticeStore();
const { dataList, fetchNoticeList } = noticeStore;

onMounted(() => {
  fetchNoticeList();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div :id="'post-' + notice.boardIdx" v-for="notice in dataList" :key="notice.idx">
          <PostDetailComponent
              :post-idx="notice.idx"
              :board="notice.boardTitle"
              :board-title="notice.boardTitle"
              :category="notice"
              :category-title="공지사항"
              :post-author="notice.author"
              :post-created-at="notice.created_at"
              :post-title="notice.title"
              :post-contents="notice.content"
          ></PostDetailComponent>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>