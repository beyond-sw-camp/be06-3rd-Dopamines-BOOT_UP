<script setup>
import { onMounted, ref } from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostDetailComponent from "@/components/post/Detail/PostDetailComponent.vue";
import CommentComponent from "@/components/post/Detail/Comment/CommentComponent.vue";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import { useOpenCommentStore } from "@/pages/Community/OpenBoard/stores/useOpenCommentStore";
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
    const fetchedPost = await openPostStore.readPost(postId);
    post.value = fetchedPost;
    await openCommentStore.fetchComments(postId);
    comments.value = [...openCommentStore.comments];
    console.log('comments:', comments.value);
  } catch (error) {
    errorMessage.value = 'Failed to load post or comments';
    console.error(error);
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
          <CommentComponent :comments="comments" :like-count="likeCount"
                            :comment-count="comments.length"></CommentComponent>
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