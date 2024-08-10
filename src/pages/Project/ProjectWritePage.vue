<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useProjectStore } from "@/pages/Project/store/useProjectStore";
import ProjectWriteItem from "@/pages/Project/component/ProjectWriteItem.vue";
import {ref} from "vue";
import router from "@/router";

const projectStore = useProjectStore();
const updateValues = ref({});

const addValue = (newValues) => {
  updateValues.value = newValues;
};

const postCreate = async (postReq) => {

  console.log("?filesToUpload=", updateValues.value.file);

  const images = await projectStore.uploadFile(updateValues.value.file);
  postReq.image = images;
  postReq.courseNum = updateValues.value.selectedCourseNum;
  postReq.teamIdx = updateValues.value.selectedTeam;
  postReq.gitUrl = updateValues.value.githubUrl;
  console.log("나올때 됐잔하")
  console.log(postReq);
  try{
    const response = projectStore.createPost(postReq);

    if (response) {
      if (confirm("프로젝트 등록에 성공하였습니다.")) {
        router.push('/project');
      }
    } else {
      if (confirm("프로젝트 등록에 실패하였습니다. 다시 시도하여 주십시오.")) {
        router.push('/project/write');
      }
    }
  } catch (e) {
    console.error(e);
  }

};


</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>프로젝트 게시판 작성</h1>
      </div>
      <ProjectWriteItem @updateValues="addValue"></ProjectWriteItem>
      <PostEditor :post-req="projectStore.postReq"
                  @postReq="postCreate"></PostEditor>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
main {
  flex-direction: column;
}

.board-create-title {
  max-width: 1000px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
}
</style>