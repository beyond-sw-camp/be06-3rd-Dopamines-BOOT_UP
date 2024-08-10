<script setup>
import { onMounted } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import { useFreeCommentStore } from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import { useRoute } from 'vue-router';
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";

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