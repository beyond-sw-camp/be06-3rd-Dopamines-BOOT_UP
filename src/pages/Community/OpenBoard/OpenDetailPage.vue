<script setup>
import { onMounted, ref } from 'vue';
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

const post = ref(null);

onMounted(async () => {
  const postId = route.params.id;
  try {
    const fetchedPost = await openPostStore.readPost(postId);
    post.value = fetchedPost;
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
        <div v-if="post" class="post-detail-container">
          <PostDetail
              :post-title="post.title"
              :post-created-at="post.created_at"
              :post-contents="post.content"
              :post-author="익명"
              :comment-count="post.openCommentList ? post.openCommentList.length : 0"
              :category-title="post.categoryTitle"
              :board-title="post.boardTitle"
              :board-list-link="post.boardListLink"
              :board-link="post.boardLink"
              :post-idx="post.idx"
              :board-idx="post.boardIdx"></PostDetail>
          <CommentComponent :comments="openCommentStore.comments"></CommentComponent>
        </div>
        <p v-else>포스트 로딩중...</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.post-detail-container{
  width: 100%;
}
</style>