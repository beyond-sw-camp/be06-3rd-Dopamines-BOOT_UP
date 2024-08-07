<script setup>
import { onMounted } from "vue";
import { useProjectStore } from "@/pages/Project/store/useProjectStore";
import ProjectCardItem from "@/pages/Project/component/ProjectCardItem.vue";

const projectStore = useProjectStore();
const { projectDataList, readAllPosts } = projectStore;

onMounted(() => {
  readAllPosts( 1, 10 );
});
</script>

<template>
  <div class="content-area">
    <div class="project-container">
      <div class="project-title-wrap">
        <div class="content-title">
          <h2>주요 프로젝트 소개</h2>
        </div>
        <select class="coursenum-selection">
          <option value="all">BEYOND 전체</option>
          <option v-for="i in 10" v-bind:key="i">BEYOND {{ i }}기</option>
        </select>
      </div>
      <ul class="project-list">
        <ProjectCardItem
            v-for="data in projectDataList"
            v-bind:key="data.id"
            :teamName="data.teamName"
            :projectTitle="data.projectTitle"
            :projectDescription="data.projectDescription"
            :nameList="data.nameList"
            :courseNum="data.courseNum"
        ></ProjectCardItem>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.content-title {
  h2 {
    margin: 0;
  }
}

.project-container {
  max-width: 1000px;
}

.project-title-wrap {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.coursenum-selection {
  width: 200px;
  background-color: #f4f4f4;
  color: #777;
  border-radius: 5px;
  height: 45px;
  border: 0;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  line-height: 1.15;
  word-break: keep-all;
}
</style>