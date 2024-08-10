<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import {useFreePostStore} from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import {useFreeCommentStore} from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import {useFreeLikeStore} from "@/pages/Community/FreeBoard/stores/useFreeLikeStore";
import {useRoute} from 'vue-router';

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
      console.error('댓글 조회 실패 :', freeCommentStore.comments);
    }

    await freeLikeStore.fetchLikeCount(postId);
    likeCount.value = freeLikeStore.likeCount;
  } catch (error) {
    console.error('조회 실패:', error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="post" class="post-container">
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
              :editlnk="`/free/edit/${route.params.id}`"
          ></PostDetailComponent>
          <CommentComponent :comments="comments" :like-count="likeCount"
                            :comment-count="comments.length"></CommentComponent>
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

.post-container {
  width: 100%;
}
</style>