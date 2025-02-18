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
import {useFreeRecommentStore} from "@/pages/Community/FreeBoard/stores/useFreeRecommentStore";
import {useFreeLikeStore} from "@/pages/Community/FreeBoard/stores/useFreeLikeStore";

const freePostStore = useFreePostStore();
const freeCommentStore = useFreeCommentStore();
const freeReCommentStore = useFreeRecommentStore();
const freeLikeStore = useFreeLikeStore();
const route = useRoute();

const post = ref({});
const comments = ref([]);
const likeCount = ref(0);
const postLikeStatus = ref(false);
const errorMessage = ref('');
const commentErrorMessage = ref('');

onMounted(async () => {
  const postId = route.params.id;
  try {
    // 게시글 데이트
    const postData = await freePostStore.readPost(postId);
    // 좋아요 유무 상태
    const status = await freeLikeStore.checkStatus(postId, "free", "post");

    post.value = postData;
    comments.value = postData.freeCommentList;
    likeCount.value = postData.likeCount;

    postLikeStatus.value = status; // 반환된 값을 postLikeStatus에 설정

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

function createReComment(reCommentCreateReq) {
  console.log("recomment store 넘어가기전 데이터 확인: ", reCommentCreateReq);
  if (confirm(`${reCommentCreateReq.commentIdx}번의 댓글에 답글을 등록하시겠습니까?`)) {
    const response = freeReCommentStore.createRecomment(reCommentCreateReq);

    if (response) {
      console.log("대댓글 등록 완료");
      window.location.reload();
    }
  }
}

function deleteReComment(idx) {
  console.log("deleteReComment: ", idx);
  if (confirm(`${idx}번의 대댓글을 삭제 하시겠습니까?`)) {
    const response = freeReCommentStore.deleteRecomment(idx);

    if (response) {
      console.log("대댓글 삭제 완료");
      window.location.reload();
    }
  }
}

function updateReComment(reCommentUpdateReq) {
  console.log("updateReComment: ", reCommentUpdateReq);
  if (confirm(`${reCommentUpdateReq.idx}번의 대댓글을 수정 하시겠습니까?`)) {
    const response = freeReCommentStore.updateRecomment(reCommentUpdateReq);

    if (response) {
      console.log("대댓글 수정 완료");
      window.location.reload();
    }
  }
}

function likeAction(idx) {
  console.log(`${idx}번 게시글 좋아요 하트 눌림!!! 뿌이뿌이뿌이뿌이`);
  freeLikeStore.likePost(idx);
}

function likeReCommment(idx) {
  console.log(`${idx}번 대댓글 좋아요 하트 눌림!!! 뿌이뿌이뿌이뿌이`)
  freeLikeStore.likeRecomment(idx);
}

function likeCommment(idx) {
  console.log(`${idx}번 댓글 좋아요 하트 눌림!!! 뿌이뿌이뿌이뿌이`)
  freeLikeStore.likeComment(idx);
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
              :post-like-count="likeCount"
              :post-like-status="postLikeStatus"
              :editlnk="`/free/edit/${route.params.id}`"
              @update:likeCount="likeAction"
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
              :comments="comments"
              :like-count="likeCount"
              :comment-count="comments.length"
              @delete:comments="deleteComment"
              @update:comments="updateComment"
              @likeComment="likeCommment"
              @create:reComments="createReComment"
              @delete:reComment="deleteReComment"
              @update:reComment="updateReComment"
              @likeReComment="likeReCommment"
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