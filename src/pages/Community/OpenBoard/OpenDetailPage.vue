<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostDetail from "@/components/post/Detail/PostDetail.vue";
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import { useOpenCommentStore } from "@/pages/Community/OpenBoard/stores/useOpenCommentStore";
import { useRoute } from 'vue-router';

const openPostStore = useOpenPostStore();
const openCommentStore = useOpenCommentStore();
const route = useRoute();

onMounted(async () => {
  const postId = route.params.id;
  try {
    await openPostStore.readPost(postId);
    await openCommentStore.fetchComments(postId);
  } catch (error) {
    console.error('Failed to fetch post or comments:', error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="openPostStore.post">
          <PostDetail
              :post-title="openPostStore.post.title"
              :post-created-at="openPostStore.post.createdAt"
              :post-contents="openPostStore.post.contents"
              :post-author="openPostStore.post.author"
              :comment-count="openPostStore.post.commentCount"
              :category-title="openPostStore.post.categoryTitle"
              :board-title="openPostStore.post.boardTitle"
              :board-list-link="openPostStore.post.boardListLink"
              :board-link="openPostStore.post.boardLink"
              :post-idx="openPostStore.post.idx"
              :board-idx="openPostStore.post.boardIdx"></PostDetail>
          <CommentComponent :comments="openPostStore.comments"></CommentComponent>
        </div>
        <p v-else>포스트 로딩중...</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>