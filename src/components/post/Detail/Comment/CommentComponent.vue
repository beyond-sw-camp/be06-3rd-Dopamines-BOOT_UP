<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
// import CommentInput from './CommentInput.vue';
import CommentView from './CommentView.vue';
// import ReCommentView from './ReCommentView.vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true
  },
  recomments: {
    type: Object,
    required: true
  },
  commentCount: {
    type: Number,
    required: true
  },
  likeCount: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['update:comments', 'update:likeCount']);
const localComments = ref([...props.comments]);
// const localLikeCount = ref(props.likeCount);

watch(() => props.comments, (newComments) => {
  localComments.value = [...newComments];
});

function deleteComment(idx) {
  console.log("CommentComponent-deleteComment: ", idx);
  emit('delete:comments', idx);
}

function updateComment(commentUpdateReq) {
  console.log("updateComment: ", commentUpdateReq);
  emit('update:comments', commentUpdateReq);
}

function createReComment(reCommentCreateReq) {
  console.log("createReComment: ", reCommentCreateReq);
  emit('create:reComments', reCommentCreateReq);
}

function deleteReComment(idx) {
  console.log("deleteReComment: ", idx);
  emit('delete:reComment', idx);
}

function updateReComment(reCommentUpdateReq) {
  console.log("updateReComment: ", reCommentUpdateReq);
  emit('update:reComment', reCommentUpdateReq);
}

</script>

<template>
  <div>
    <div class="post-wrapper-bottom">
      <h2 id="notes-title" class="post-count-text">댓글 리스트</h2>
      <div class="like-wrap">
      </div>
    </div>
    <div class="comment-view-container">
      <div class="top-line"></div>
      <div class="comment-view-wrapper">
        <ul class="comment-view-detail-container">
          <li v-for="(comment, index) in localComments" :key="index" :id="'answer-' + index">
            <CommentView
                v-bind="comment"
                @delete="deleteComment"
                @update="updateComment"
                @recomment="createReComment"
                @deleteReComment="deleteReComment"
                @updateReComment="updateReComment">
            </CommentView>
          </li>
        </ul>
      </div>
      <div class="bottom-line"></div>
    </div>
  </div>
</template>

<style scoped>
.post-wrapper-bottom {
  border-top-width: 1px;
  border-color: hsla(220, 9%, 46%, .3);
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-count-text {
  font-size: 17px;
}

.like-wrap {
  display: flex;
  gap: 5px;
}
</style>