<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useCommunityStore } from "@/pages/Community/stores/useCommunityStore";
import { useRouter } from "vue-router";

const communityStore = useCommunityStore();
const router = useRouter();

const postCreate = (formData) => {
  console.log("formData", formData);

  const response = communityStore.createPost(formData);

  if (response) {
    router.push('/community/free');
  } else {
    alert("게시글 작성에 실패했습니다. 다시 요청해주세요.");
    router.push('/community/free/write')
  }
}


</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>자유게시판 작성</h1>
      </div>
      <PostEditor post-req="communityStore.postReq"
                  @formData="postCreate" ></PostEditor>
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