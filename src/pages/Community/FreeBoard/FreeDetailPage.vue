<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import CommentInput from '@/components/post/Detail/Comment/CommentInput.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import {useFreePostStore} from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import {useRoute} from 'vue-router';

const freePostStore = useFreePostStore();
const route = useRoute();

const post = ref({});
const comments = ref([]);
const likeCount = ref(0);
const errorMessage = ref('');
const commentErrorMessage = ref('');

onMounted(async () => {
  const postId = route.params.id;
  try {
    const postData = await freePostStore.readPost(postId);
    post.value = postData;
    comments.value = postData.freeCommentList;
    likeCount.value = postData.likeCount;
  } catch (error) {
    errorMessage.value = `조회 실패: ${error.message}`;
    console.error('조회 실패:', error);
  }
});

const handleNewComment = (newComment) => {
  comments.value.push(newComment);
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div v-if="errorMessage" class="error-message">
          <p>{{ errorMessage }}</p>
        </div>
        <div v-else class="post-container">
          <PostDetailComponent
              :post-idx="post.idx"
              :board="free"
              :board-title="`자유게시판`"
              :category="community"
              :category-title="`커뮤니티게시판`"
              :post-author="post.author"
              :post-created-at="post.created_at"
              :post-title="post.title"
              :post-contents="post.content"
              :editlnk="`/free/edit/${route.params.id}`"
          ></PostDetailComponent>
          <div v-if="commentErrorMessage" class="error-message">
            <p>{{ commentErrorMessage }}</p>
          </div>
          <CommentComponent :comments="comments" :like-count="likeCount"
                            :comment-count="comments.length"></CommentComponent>
          <CommentInput @new-comment="handleNewComment"></CommentInput>
        </div>
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

.post-container {
  width: 100%;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>