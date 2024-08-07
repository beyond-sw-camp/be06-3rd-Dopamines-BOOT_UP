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
        <PostList :data-list="freePostStore.posts" title="자유 게시판"></PostList>
        <PostList :data-list="openPostStore.posts" title="공개 게시판"></PostList>
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
  width: 100%;
  gap: 20px;
}
</style>