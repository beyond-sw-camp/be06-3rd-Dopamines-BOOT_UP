<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useCommunityStore } from "@/pages/Community/stores/useCommunityStore";
import router from "@/router";
import {ref} from "vue";
// import { useRouter } from "vue-router";

const communityStore = useCommunityStore();
const postIdx = ref(0);
// const router = useRouter();

const postCreate = async (postReq) => {
  postIdx.value = await communityStore.createPost(postReq, "free");

  if (postIdx.value) {
    if(confirm("게시글이 등록되었습니다.")) {
      router.push(`/free/detail/${postIdx.value}`);
    }
  } else {
    alert("게시글 작성에 실패했습니다. 다시 요청해주세요.");
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
      <PostEditor :post-req= "communityStore.postReq"
                  board-type="free"
                  @postReq="postCreate" ></PostEditor>
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