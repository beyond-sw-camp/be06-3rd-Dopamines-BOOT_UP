<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostDetail from "@/components/post/Detail/PostDetail.vue";
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useFreeCommentStore } from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import { useRoute } from 'vue-router';

const freePostStore = useFreePostStore();
const freeCommentStore = useFreeCommentStore();
const route = useRoute();

onMounted(async () => {
  const postId = route.params.id;
  try {
    await freePostStore.readPost(postId);
    await freeCommentStore.fetchComments(postId);
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
        <div v-if="freePostStore.post">
          <PostDetail
              :post-title="freePostStore.post.title"
              :post-created-at="freePostStore.post.createdAt"
              :post-contents="freePostStore.post.contents"
              :post-author="freePostStore.post.author"
              :comment-count="freePostStore.post.commentCount"
              :category-title="freePostStore.post.categoryTitle"
              :board-title="freePostStore.post.boardTitle"
              :board-list-link="freePostStore.post.boardListLink"
              :board-link="freePostStore.post.boardLink"
              :post-idx="freePostStore.post.idx"
              :board-idx="freePostStore.post.boardIdx"></PostDetail>
          <CommentComponent :comments="freePostStore.comments"></CommentComponent>
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