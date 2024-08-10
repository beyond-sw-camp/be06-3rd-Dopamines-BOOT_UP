<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MarketWriteItem from "@/pages/Market/Board/components/MarketWriteItem.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";

const marketStore = useMarketStore();

const postCreate = (postReq) => {
  console.log("postCreate in postReq", postReq);

  // const response = marketStore.createPost(postReq);

  // if (response) {
  //   alert("게시글이 등록되었습니다.");
  // } else {
  //   alert("게시글 작성에 실패했습니다. 다시 요청해주세요.");
  // }
};

const updateContent = (content) => {
  console.log("업로드된 이미지들:", content.uploadedImages);
  console.log("가격:", content.price);
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>중고마켓 게시판 작성</h1>
      </div>
      <MarketWriteItem @updateContent="updateContent"></MarketWriteItem>
      <PostEditor
        :post-req="marketStore.postReq"
        @postReq="postCreate"
      ></PostEditor>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
main {
  flex-direction: column;
  justify-content: start;
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
