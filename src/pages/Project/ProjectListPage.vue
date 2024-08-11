<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList title="주요 프로젝트 소개" :project="project" :data-list="data" :show-status="isStatusShow"></PostList>
        <div class="project-container">
          <div class="project-title-wrap">
            <div class="content-title">
            </div>
            <select class="coursenum-selection" v-model="selectedCourse">
              <option value="all">BEYOND 전체</option>
              <option v-for="i in courseNum" v-bind:key="i" :value="i">BEYOND {{ i }}기</option>
            </select>
          </div>
          <div v-if="isLoading">로딩 중...</div>
          <ul class="project-list">
            <ProjectCardItem
                v-for="data in filteredDataList"
                v-bind:key="data.idx"
                :data="data"
                @click="navigateToDetail(data.idx)"
                class="click"
            ></ProjectCardItem>
          </ul>
          <div class="post-write" :v-if="auth && auth.value === 'ROLE_ADMIN'">
            <router-link :to="routes[0].path">글 작성</router-link>
          </div>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<script setup>
import ProjectCardItem from "@/pages/Project/component/ProjectCardItem.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import {ref, onMounted, computed} from 'vue';
import { useProjectStore } from "@/pages/Project/store/useProjectStore";
import router from "@/router";
import ProjectDetailPage from "@/pages/Project/ProjectDetailPage.vue";
import PostList from "@/components/post/List/PostList.vue";
import { useUserStore } from "@/pages/User/stores/useUserStore";

const projectStore = useProjectStore();
const userStore = useUserStore();
const auth = ref("");
const dataList = ref([]);
const courseNum = ref(Array.from({ length: 10 }, (_, i) => i + 1));
const selectedCourse = ref('all'); // 선택된 코스 번호를 저장

const isLoading = ref(true);
onMounted(async () => {
  auth.value = await userStore.getAuth();
  console.log("auth", auth.value);

  dataList.value = await projectStore.getProjectList();
  isLoading.value = false; // 데이터 로딩 완료
  console.log("dataList.value: ", dataList.value);

  const paragraphs = document.querySelectorAll('.post-list-container p');
  paragraphs.forEach(paragraph => {
    paragraph.textContent = '';
  });
});


// 필터링된 데이터 목록
const filteredDataList = computed(() => {
  if (selectedCourse.value === 'all') {
    return dataList.value; // 전체 데이터 반환
  } else {
    console.log("what is you: ", selectedCourse);
  }
  return dataList.value.filter(data => data.courseNum === parseInt(selectedCourse.value)); // 선택된 코스에 해당하는 데이터만 반환
});

console.log(filteredDataList);

const routes = [
  {
    path: '/project/write',
    name: 'ProjectWritePage',
  },
  {
    path: '/project/detail/:id',
    component: ProjectDetailPage,
    name: 'ProjectDetail',
  },
];

const navigateToDetail = (idx) => {
  router.push(`/project/detail/${idx}`);
};
</script>

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

.post-write {
  background-color: #e06139;
  border-radius: 5px;
  width: 130px;
  height: 100%;
  padding: 10px;
  margin: 20px 0 20px 0;
  text-align: center;
  margin-left: auto;
  a {
    color: #fff;
  }
  &:hover {
    background-color: #e0613976;
  }
}

.click {
  cursor: pointer;
}

.content-area {
  width: 100%;
}
</style>