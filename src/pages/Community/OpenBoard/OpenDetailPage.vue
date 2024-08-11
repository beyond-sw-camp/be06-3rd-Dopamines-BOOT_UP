<script setup>
import { onMounted, ref } from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import { useOpenPostStore } from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import { useRoute } from 'vue-router';

const openPostStore = useOpenPostStore();
const route = useRoute();

const post = ref(null);
const errorMessage = ref('');

onMounted(async () => {
  const postId = route.params.id;
  try {
    const fetchedPost = await openPostStore.readPost(postId);
    post.value = fetchedPost;
  } catch (error) {
    errorMessage.value = 'Failed to load post or comments';
    console.error(error);
  }
});

const addNewComment = (newCommentContent) => {
  const newComment = {
    id: Date.now(), // Temporary ID, replace with actual ID from backend if needed
    content: newCommentContent,
  };
  post.value.openCommentList.push(newComment);
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="post" class="post-detail-container">
          <PostDetailComponent
              :post-idx="post.idx"
              :board="`open`"
              :board-title="`공개게시판`"
              :category="community"
              :category-title="`커뮤니티게시판`"
              :post-author="post.author"
              :post-created-at="post.created_at"
              :post-title="post.title"
              :post-contents="post.content"
              :editlnk="`/open/edit/${route.params.id}`"
          ></PostDetailComponent>
          <CommentComponent
              :comments="post.openCommentList"
              :like-count="post.likeCount"
              :comment-count="post.openCommentList.length"
              @newComment="addNewComment"
          ></CommentComponent>
        </div>
        <p v-else>{{ errorMessage || '포스트 로딩중...' }}</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>