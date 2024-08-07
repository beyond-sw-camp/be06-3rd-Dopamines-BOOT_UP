<script setup>
import { ref, onMounted } from "vue";
import ProjectCardItem from "@/pages/Project/component/ProjectCardItem.vue";

const projectDataList = ref([
  {
    id: 1,
    projectTitle: "Project 1",
    projectDescription: "Description for Project 1",
    courseNum: 1,
    gitUrl: "https://github.com/project1",
    sourceUrl: "https://source.com/project1",
    teamName: "Team 1",
    nameList: ["Student A", "Student B"]
  },
  {
    id: 2,
    projectTitle: "Project 2",
    projectDescription: "Description for Project 2",
    courseNum: 2,
    gitUrl: "https://github.com/project2",
    sourceUrl: "https://source.com/project2",
    teamName: "Team 2",
    nameList: ["Student C", "Student D"]
  }
]);

onMounted(() => {
  // Simulate fetching data
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