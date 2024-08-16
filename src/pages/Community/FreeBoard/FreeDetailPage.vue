<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import CommentInput from '@/components/post/Detail/Comment/CommentInput.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import {useFreePostStore} from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import {useRoute} from 'vue-router';
import {useFreeCommentStore} from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";

const freePostStore = useFreePostStore();
const freeCommentStore = useFreeCommentStore();
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
    console.log("come on~~~", postData);
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

function deleteComment(idx) {
  if(confirm(`댓글을 삭제하시겠습니까?`)) {
    const response = freeCommentStore.deleteComment(idx);

    if (response) {
      console.log("댓글 삭제 완료");
      window.location.reload();
    }
  }
}

function updateComment(commentUpdateReq) {
  if (confirm(`${commentUpdateReq.idx}번의 댓글을 수정하시겠습니까?`)) {
    const response = freeCommentStore.updateComment(commentUpdateReq);

    if (response) {
      console.log("댓글 수정 완료");
      window.location.reload();
    }
  }
}
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
              :post-author="post.nickName"
              :post-created-at="post.createdAt"
              :post-title="post.title"
              :post-contents="post.content"
              :editlnk="`/free/edit/${route.params.id}`"
          ></PostDetailComponent>
          <div v-if="commentErrorMessage" class="error-message">
            <p>{{ commentErrorMessage }}</p>
          </div>
          <CommentInput
              @new-comment="handleNewComment"
              :post-idx="post.idx"
              :board-type="`free`"
              :comment-author="post.nickName"
          ></CommentInput>

          <CommentComponent
              :comments="comments" :like-count="likeCount"
              :comment-count="comments.length"
              @delete:comments="deleteComment"
              @update:comments="updateComment"
          ></CommentComponent>
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
  margin-bottom: 50px;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>