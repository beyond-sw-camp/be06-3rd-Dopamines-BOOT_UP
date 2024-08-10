<script setup>
import { onMounted, ref } from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetail from '@/components/post/Detail/PostDetail.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useFreeCommentStore } from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import { useFreeLikeStore } from "@/pages/Community/FreeBoard/stores/useFreeLikeStore";
import { useRoute } from 'vue-router';

const freePostStore = useFreePostStore();
const freeCommentStore = useFreeCommentStore();
const freeLikeStore = useFreeLikeStore();
const route = useRoute();

const post = ref({});
const comments = ref([]);
const likeCount = ref(0);

onMounted(async () => {
  const postId = route.params.id;
  try {
    await freePostStore.readPost(postId);
    post.value = freePostStore.post;

    await freeCommentStore.fetchComments(postId);
    if (Array.isArray(freeCommentStore.comments)) {
      comments.value = freeCommentStore.comments;
    } else {
      console.error('comments is not iterable:', freeCommentStore.comments);
    }

    await freeLikeStore.fetchLikeCount(postId);
    likeCount.value = freeLikeStore.likeCount;
  } catch (error) {
    console.error('Failed to fetch post, comments, or like count:', error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="post">
          <PostDetail
              :post-title="post.title"
              :post-created-at="post.createdAt"
              :post-contents="post.content"
              :post-author="post.author"
              :comment-count="comments.length"
              :category-title="post.categoryTitle"
              :board-title="자유게시판"
              :board-list-link="post.boardListLink"
              :board-link="post.boardLink"
              :post-idx="post.idx"
          ></PostDetail>
          <CommentComponent :comments="comments" :like-count="likeCount" :comment-count="comments.length"></CommentComponent>
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