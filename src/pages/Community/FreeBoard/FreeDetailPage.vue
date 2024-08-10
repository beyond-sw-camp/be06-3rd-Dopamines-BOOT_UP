<script setup>
import { onMounted, ref } from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
<<<<<<< HEAD
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
=======
>>>>>>> 8da7987060efa944693ae6d55def45d19e086783
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useFreeCommentStore } from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import { useFreeLikeStore } from "@/pages/Community/FreeBoard/stores/useFreeLikeStore";
import { useRoute } from 'vue-router';
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";

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
<<<<<<< HEAD
        <div v-if="freePostStore.post">
          <PostDetailComponent
            :post-idx="freePostStore.post.idx"
            :board-link="'/community/free'"
            :board-list-link="'/community/free/list'"
            :board-title="'자유게시판'"
            :category-title="'커뮤니티게시판'"
            :comment-count="freePostStore.comments.length"
            :post-author="freePostStore.post.author"
            :post-contents="freePostStore.post.contents"
            :post-created-at="freePostStore.post.createdAt"
            :post-title="freePostStore.post.title"
          ></PostDetailComponent>
          <CommentComponent :comments="freePostStore.comments"></CommentComponent>
=======
        <div v-if="post">
          <PostDetailComponent
              :post-idx="post.idx"
              :board="free"
              :board-title="자유게시판"
              :category="community"
              :category-title="커뮤니티게시판"
              :post-author="post.author"
              :post-created-at="post.created_at"
              :post-title="post.title"
              :post-contents="post.content"
          ></PostDetailComponent>
          <CommentComponent :comments="comments" :like-count="likeCount" :comment-count="comments.length"></CommentComponent>
>>>>>>> 8da7987060efa944693ae6d55def45d19e086783
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