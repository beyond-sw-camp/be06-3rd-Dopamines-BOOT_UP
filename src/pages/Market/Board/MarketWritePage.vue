<script setup>
import { ref } from "vue";
import router from "@/router";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";
import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MarketWriteItem from "@/pages/Market/Board/components/MarketWriteItem.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

const marketStore = useMarketStore();

const updateValues = ref({});

const postCreate = async (postReq) => {
  console.log("postCreate in postReq", postReq);
  if (
    updateValues.value.images == null ||
    updateValues.value.images.length == 0
  ) {
    alert("이미지를 업로드해주세요!");
    return;
  }

  postReq.images = updateValues.value.images;
  postReq.price = updateValues.value.price;

  try {
    const response = marketStore.createPost(postReq);

    if (response) {
      if (confirm("게시글 등록에 성공하였습니다.")) {
        router.push("/market");
      }
    } else {
      if (confirm("게시글 등록에 실패하였습니다. 다시 시도하여 주십시오.")) {
        router.push("/market/write");
      }
    }
  } catch (e) {
    console.error(e);
  }
};

const updateContent = (content) => {
  console.log("업로드된 이미지들:", content.images);
  console.log("가격:", content.price);
  updateValues.value = content;
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
