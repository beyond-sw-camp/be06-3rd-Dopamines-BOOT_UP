<script setup>
import { ref, onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import PostList from "@/components/post/List/PostList.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useNoticeStore } from '@/pages/Notice/stores/useNoticeStore';

const noticeStore = useNoticeStore();
const noticePosts = ref([]);

const fetchAllNotices = async () => {
  try {
    noticePosts.value = await noticeStore.fetchAllNotices();
    console.log('noticePosts:', noticePosts.value);
    if (!noticePosts.value) {
      console.error('Notice posts are undefined');
    }
  } catch (error) {
    console.error('Failed to fetch notices:', error);
  }
};

onMounted(() => {
  fetchAllNotices();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList
            title="공지사항 게시판"
            :data-list="noticePosts"
            board="notice"
        ></PostList>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.content-area {
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
}
</style>