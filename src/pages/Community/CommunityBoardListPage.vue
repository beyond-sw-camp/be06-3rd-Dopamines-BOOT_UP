<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import PostList from "@/components/post/List/PostList.vue";
import MainFooter from "@/components/layout/MainFooter.vue";

import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import {onMounted, ref} from "vue";

const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();
const isDataLoaded = ref(true);

onMounted( async ()=> {
  try {
    await freePostStore.readAllPosts(1, 10);
    await openPostStore.readAllPosts(1, 10);
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error loading posts:", error);
  }
})

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <div class="menu-description">
          <p>
            통합검색 창입니다. 검색어를 입력하고 검색 버튼을 누르세요.
          </p>
        </div>
        <div class="content-container">
          <PostList :data-list="freePostStore.posts" title="자유 게시판" board="free"></PostList>
          <PostList :data-list="openPostStore.posts" title="공개 게시판" board="open"></PostList>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
main{
  align-items: flex-start !important;
}
.content-area{
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}
.content-container{
  display: flex;
  gap: 20px;
}
.menu-description{
  p{
    margin: 0;
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 5px;
  }
}
</style>