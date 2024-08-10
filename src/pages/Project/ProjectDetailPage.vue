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
.body-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

main {
  height: auto !important;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 150px !important;
  max-width: 1000px;
  min-height: 100vh;
}

main > div {
  width: 100%;
}

section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 30px;
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 60px;
  text-align: center;
  font-weight: bold;
}

.student-team-container {
  align-items: center;
}

.student-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.student-item {
  background: #e9ecef;
  border-radius: 4px;
  margin: 20px 10px 20px 0;
  padding: 10px 15px;
  transition: background 0.3s;
  font-weight: bold;
}

.git-url {
  margin-top: 20px;
}

.git-link {
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.git-link:hover {
  text-decoration: underline;
}

p {
  margin: 30px 0;
  color: #555;
  line-height: 1.5;
}

a {
  color: #007bff;
  text-decoration: none;
}

footer {
  margin-top: 5rem;
  padding: 1.75rem 0;
  border-color: hsla(220, 9%, 46%, .3);
  border-top-width: 1px;
  z-index: 10;
  background-color: #f4f4f4;
  width: 100%;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>