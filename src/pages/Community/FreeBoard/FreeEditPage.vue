<script setup>

import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import {useCommunityStore} from "@/pages/Community/stores/useCommunityStore";
// import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import router from "@/router";

// const idx = ref(null);
const postDetail = ref(null); // ref로 선언

const communityStore = useCommunityStore();
onMounted(async () => {
  // const router = useRouter();
  // idx.value = router.params.postIdx;
  // console.log("this is params.id: ", idx.value);
  postDetail.value = await communityStore.getPostDetail(31);
  console.log("FreeEditPage postDetail result: ", postDetail.value);
})


const postUpdate = (formData) => {
  console.log("formData", formData);
  try{
    const response = communityStore.updatePost(formData);

    if (response) {
      if (confirm("게시글 수정에 성공했습니다.")) {
        router.push('/free');
      }
    } else {
      if (confirm("게시글 수정에 실패했습니다. 다시 요청해주세요.")) {
        router.push('/free');
      }
    }
  } catch (e) {
    console.error(e);
  }
}

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>자유게시판 수정</h1>
      </div>
      <PostEditor v-if="postDetail"
                  :post-req="communityStore.postReq"
                  :post-index="31"
                  :post-detail="postDetail"
                  @postReq="postUpdate"></PostEditor>
      <p v-else>게시글을 불러오는 중입니다...</p>
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