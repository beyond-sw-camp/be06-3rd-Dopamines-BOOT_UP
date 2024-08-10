<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MarketWriteItem from "@/pages/Market/Board/components/MarketWriteItem.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";

const marketStore = useMarketStore();
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="board-create-title">
        <h1>중고마켓 게시판 작성</h1>
      </div>
      <MarketWriteItem></MarketWriteItem>
      <PostEditor :post-req="marketStore.postReq"></PostEditor>
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
