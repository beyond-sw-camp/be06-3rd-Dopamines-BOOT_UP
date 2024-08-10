<script setup>
import { ref, onMounted } from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import { useOpenPostStore } from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import { useOpenCommentStore } from '@/pages/Community/OpenBoard/stores/useOpenCommentStore';
import { useRoute } from 'vue-router';

const openPostStore = useOpenPostStore();
const openCommentStore = useOpenCommentStore();
const route = useRoute();

const post = ref(null);
const comments = ref([]);
const errorMessage = ref('');

onMounted(async () => {
  const postId = route.params.id;
  try {
    await openPostStore.readPost(postId);
    post.value = { ...openPostStore.$state, idx: postId };
    if (!post.value.title) {
      throw new Error('Post data is incomplete');
    }
    await openCommentStore.fetchComments(postId);
    comments.value = [...openCommentStore.comments];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = 'Post not found.';
    } else {
      errorMessage.value = 'Failed to fetch post or comments.';
    }
    console.error(errorMessage.value, error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="post && post.title" class="post-detail-container">
          <PostDetailComponent
              :post-title="post.title"
              :post-created-at="post.created_at"
              :post-contents="post.content"
              :post-author="post.author"
              :comment-count="post.commentCount"
              category-title="커뮤니티게시판"
              board-title="공개게시판"
              :post-idx="post.idx"
              :board-idx="post.boardIdx"
              board="open"
              category="community"
              :editlnk="`/open/edit/${post.idx}`"
          ></PostDetailComponent>
          <CommentComponent :comments="comments"></CommentComponent>
        </div>
        <p v-else>{{ errorMessage || '포스트 로딩중...' }}</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}

.post-detail-container {
  width: 100%;
}
</style>