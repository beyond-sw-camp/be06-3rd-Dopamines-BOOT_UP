<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useRouter } from "vue-router";
import { useProjectStore } from "@/pages/Project/store/useProjectStore";
import ProjectWriteItem from "@/pages/Project/component/ProjectWriteItem.vue";

const projectStore = useProjectStore();
const router = useRouter();

const postCreate = (formData) => {
  console.log("formData", formData);

  const response = projectStore.createPost(formData);

  if (response) {
    router.push('/project');
  } else {
    alert("게시글 작성에 실패했습니다. 다시 요청해주세요.");
    router.push('/project')
  }
}


</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>프로젝트 게시판 작성</h1>
      </div>
      <ProjectWriteItem></ProjectWriteItem>
      <PostEditor post-req="projectStore.postReq"
                  @formData="postCreate"></PostEditor>
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