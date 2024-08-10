<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
import {useOpenPostStore} from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import {useOpenCommentStore} from "@/pages/Community/OpenBoard/stores/useOpenCommentStore";
import {useRoute} from 'vue-router';

const openPostStore = useOpenPostStore();
const openCommentStore = useOpenCommentStore();
const route = useRoute();

const post = ref(null);
const comments = ref([]);
const errorMessage = ref('');

onMounted(async () => {
  const postId = route.params.id;
  try {
    const fetchedPost = await openPostStore.readPost(postId);
    post.value = fetchedPost;
    await openCommentStore.fetchComments(postId);
    comments.value = [...openCommentStore.comments];
  } catch (error) {
    if (error.response && error.response.status === 404) {
      errorMessage.value = '게시글을 찾을 수 없습니다.';
    } else {
      errorMessage.value = 'post 혹은 comments 가져오기 실패';
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
        <div v-if="post" class="post-detail-container">
          <PostDetailComponent
              :post-idx="post.idx"
              :board="open"
              :board-title="공개게시판"
              :category="community"
              :category-title="커뮤니티게시판"
              :post-author="post.author"
              :post-created-at="post.created_at"
              :post-title="post.title"
              :post-contents="post.content"
          ></PostDetailComponent>
          <CommentComponent :comments="openCommentStore.comments"></CommentComponent>
        </div>
        <p v-else>{{ errorMessage || '포스트 로딩중...' }}</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;

  .post-detail-container {
    width: 100%;
  }
}
</style>