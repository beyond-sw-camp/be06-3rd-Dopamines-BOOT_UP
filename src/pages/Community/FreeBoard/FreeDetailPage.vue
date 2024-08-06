<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetail from '@/components/post/Detail/PostDetail.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";

const route = useRoute();
const comments = ref([]);

onMounted(() => {
  console.log(route.params.id);
  // Fetch comments based on route.params.id and set to comments
  comments.value = [
    { author: 'User1', comment: 'Comment1', createAt: '2023-10-01' },
    { author: 'User2', comment: 'comment2', createAt: '2023-10-02' }
  ];
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div>
          <PostDetail
              post-title="테스트"
              post-created-at="10분전"
              post-contents="컴포넌트화 확인"
              post-author="최승은"
              comment-count="5"
              category-title="커뮤니티 게시판"
              board-title="자유 게시판"
              board-list-link="https://naver.com"
              board-link="https://naver.com"
              post-idx="0"
              board-idx="0"></PostDetail>
          <CommentComponent :comments="comments"></CommentComponent>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
</style>