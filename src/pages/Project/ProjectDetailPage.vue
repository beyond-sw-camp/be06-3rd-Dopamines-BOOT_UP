<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostDetail from "@/components/post/Detail/PostDetail.vue";
import useProjectStore from '@/pages/Project/store/useProjectStore';

const projectStore = useProjectStore();
const { dataList, readPost } = projectStore;

onMounted(() => {
  readPost();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div :id="'post-' + project.boardIdx" v-for="project in dataList" :key="project.idx">
          <PostDetail
              :post-title="project.title"
              :post-created-at="project.createdAt"
              :post-contents="project.contents"
              :post-author="project.author"
              category-title="프로젝트"
              board-title="6기 프로젝트"
              board-list-link="#"
              board-link="#"
              :post-idx="project.postIdx"
              :board-idx="project.boardIdx"
              :data-list="dataList"
          ></PostDetail>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
</style>