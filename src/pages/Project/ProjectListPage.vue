<script setup>
import ProjectCardItem from "@/pages/Project/component/ProjectCardItem.vue";
// import axios from "axios";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { ref, onMounted } from 'vue';
import { useProjectStore } from "@/pages/Project/store/useProjectStore";

const projectStore = useProjectStore();
const dataList = ref([]);
const courseNum = ref(Array.from({ length: 10 }, (_, i) => i + 1));

onMounted(async () => {
  dataList.value = await projectStore.getProjectList();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <div class="project-container">
          <div class="project-title-wrap">
            <div class="content-title">
              <h3 class="title-page">주요 프로젝트 소개</h3>
              <div class="title-text">Beyond SW 아카데미가 만들어낸 다양한 프로젝트를 소개합니다.</div>
            </div>
            <select class="coursenum-selection">
              <option value="all">BEYOND 전체</option>
              <option v-for="i in courseNum" v-bind:key="i">BEYOND {{ i }}기</option>
            </select>
          </div>
          <ul class="project-list">
            <ProjectCardItem
                v-for="data in dataList"
                v-bind:key="data.idx"
                :data="data"
            ></ProjectCardItem>
          </ul>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<script>
export default {
  name: "ProjectPage",
}
</script>

<style scoped>
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

select {
  border: 1px solid #ddd;
  border-radius: 0px;
  appearance: none;
  font: inherit;
  font-size: 1em;
  background: #fff url(@/assets/img/select.gif) calc(100% - 10px) center no-repeat;
  padding: 0 25px 0 10px;
  color: inherit;
}

.project-list > li:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .15);
}

.project-list > li, .project-list > li:before {
  transition: all ease-in-out .15s;
}

.project-list {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  line-height: 1.15;
  word-break: keep-all;
}

.title-page {
  font-size: 2.250rem;
  font-weight: 700;
  color: #222;
  line-height: 1.15;
  display: block;
  margin-bottom: 20px;
}

.title-text {
  font-size: 1.125rem;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.15;
}
</style>