<script>
import ProjectCardItem from "@/pages/Project/component/ProjectCardItem.vue";
import axios from "axios";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
export default {
  name: "ProjectPage",
  components: { MainFooter, MainHeader, ProjectCardItem },
  emits: ["selectCourseNum"],
  data() {
    return {
      courseNum: 10,
      dataList: [],
    };
  },
  methods: {
    async getData() {
      const response = await axios.get("http://192.168.0.50:8080/project/read-all");
      console.log(response.data);
      this.dataList = response.data;
    },
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.getData();
  },
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <div class="project-container">
          <div class="project-title-wrap">
            <div class="content-title">
              <h2>주요 프로젝트 소개</h2>
            </div>
            <select class="coursenum-selection">
              <option value="all">BEYOND 전체</option>
              <option v-for="i in courseNum" v-bind:key="i">BEYOND {{ i }}기</option>
            </select>
          </div>
          <ul class="project-list">
            <ProjectCardItem
                v-for="data in dataList"
                v-bind:key="data.id"
                :teamName="data.teamName"
                :projectTitle="data.projectTitle"
                :projectDescription="data.projectDescription"
            ></ProjectCardItem>
          </ul>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.project-container {
  max-width: 1000px;
  margin-top: 150px;
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
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: 1.15;
  word-break: keep-all;
}
</style>