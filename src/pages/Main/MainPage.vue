<script setup>
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import { onMounted, ref } from "vue";

const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();

const freePosts = ref([]);
const openPosts = ref([]);

onMounted(async () => {
  try {
    await freePostStore.readAllPosts(1, 10);
    await openPostStore.readAllPosts(1, 10);
    freePosts.value = freePostStore.posts;
    openPosts.value = openPostStore.posts;
  } catch (error) {
    console.error('Failed to fetch posts:', error);
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
          <PostList
              :dataList="freePosts"
              title="자유 게시판"
              board="free"
          ></PostList>
          <PostList
              :dataList="openPosts"
              title="공개 게시판"
              board="open"
          ></PostList>
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

  .banner {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    display: flex;
    justify-content: center;

    img {
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