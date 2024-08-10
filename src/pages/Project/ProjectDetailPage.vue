<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";
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
          <PostDetailComponent
              :post-idx="project.idx"
              :board="project.boardTitle"
              :board-title="project.boardTitle"
              :category="project"
              :category-title="프로젝트게시판"
              :post-author="project.author"
              :post-created-at="project.created_at"
              :post-title="project.title"
              :post-contents="project.content"
          ></PostDetailComponent>
        </div>
      </div>
    </main>
  </div>

</template>

<style scoped>
</style>