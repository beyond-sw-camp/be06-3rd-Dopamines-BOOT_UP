<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useNoticeStore } from '@/pages/Notice/stores/useNoticeStore';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';

const noticeStore = useNoticeStore();
const notice = ref(null);
const error = ref(null);

const fetchAllNotices = async (id) => {
  try {
    const notices = await noticeStore.fetchAllNotices();
    const foundNotice = notices.find(notice => notice.id === parseInt(id));
    if (foundNotice) {
      notice.value = foundNotice;
      console.log('notice:', notice.value);
    } else {
      error.value = `Notice not found for id: ${id}`;
      console.error(error.value);
    }
  } catch (err) {
    error.value = 'Failed to fetch notices';
    console.error(error.value, err);
  }
};

onMounted(() => {
  const route = useRoute();
  const id = route.params.id;
  console.log('Route id:', id);
  if (id) {
    fetchAllNotices(id);
  } else {
    error.value = 'Invalid id';
    console.error(error.value);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <PostDetailComponent v-if="notice !== null"
                             :post-idx="notice?.id"
                             :board="notice?.category"
                             :board-title="notice?.category"
                             :category="notice"
                             :category-title="`공지사항`"
                             :post-author="`관리자`"
                             :post-created-at="notice?.date"
                             :post-title="notice?.title"
                             :post-contents="notice?.content"
                             :editlnk="`/notice/edit/${notice?.id}`"
        ></PostDetailComponent>
        <p v-else-if="!error">Loading...</p>
        <p v-else>{{ error }}</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.post-container{
  margin: 0;
}
</style>