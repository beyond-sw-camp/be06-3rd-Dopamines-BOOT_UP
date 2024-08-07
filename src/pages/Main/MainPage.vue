<script setup>
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import { onMounted, ref } from "vue";

const freeStore = useFreePostStore();
const openStore = useOpenPostStore();
const isDataLoaded = ref(false);

onMounted(async () => {
  try {
    await freeStore.readAllPosts(1, 10);
    await openStore.readAllPosts(1, 10);
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Error loading posts:", error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main style="margin-top: 115px !important;">
      <div class="main-container">
        <div class="banner-area">
          <div class="banner">
            <img src="@/assets/img/main-banner.png" alt="">
          </div>
        </div>
        <div class="content-area">
          <PostList :dataList="freeStore.posts" title="자유 게시판"></PostList>
          <PostList :dataList="openStore.posts" title="공개 게시판"></PostList>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.banner-area {
  position: relative;
  width: 100%;
  margin: 0px auto;
  box-shadow: 3px 3px 10px 0px rgb(0 0 0 / 30%);
  //margin-top: -150px;

  .banner {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    img{
      width: 1000px;
      height: 100%;
    }
  }
}

.content-area {
  display: flex;
  column-gap: 2.5rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>