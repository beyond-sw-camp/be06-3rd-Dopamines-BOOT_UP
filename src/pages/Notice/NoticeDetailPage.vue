<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostDetail from "@/components/post/Detail/PostDetail.vue";
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
          <PostDetail
              :post-title="notice.title"
              :post-created-at="notice.createdAt"
              :post-contents="notice.contents"
              :post-author="notice.author"
              category-title="프로젝트"
              board-title="6기 프로젝트"
              board-list-link="#"
              board-link="#"
              :post-idx="notice.postIdx"
              :board-idx="notice.boardIdx"
              :data-list="dataList"
          ></PostDetail>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>