<script setup>
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import { useNoticeStore} from "@/pages/Notice/stores/useNoticeStore";
import { onMounted, ref } from "vue";

const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();
const noticePostStore = useNoticeStore();

const freePosts = ref([]);
const openPosts = ref([]);
const noticePosts = ref([]);

onMounted(async () => {
  try {
    freePosts.value = await freePostStore.readAllPosts(1, 3);
    openPosts.value = await openPostStore.readAllPosts(1, 3);
    noticePosts.value = await noticePostStore.fetchAllNotices();
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
          <div class="content-content">
            <div>
              <PostList
                  :dataList="freePosts"
                  title="자유 게시판"
                  board="free"
                  :showSearchInput="false"
              ></PostList>
              <PostList
                  :dataList="openPosts"
                  title="공개 게시판"
                  board="open"
                  :showSearchInput="false"
              ></PostList>
            </div>
          </div>
          <div class="content-content">
            <PostList
                :dataList="noticePosts"
                title="공지사항"
                board="notice"
                listlength="10"
                :showSearchInput="false"
            ></PostList>
          </div>
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
  border-radius: 10px;
}

.content-content {
  width: 100%;
  background-color: rgba(191, 184, 166, 0.15);
  padding: 10px;
  border-radius: 10px;
}
</style>