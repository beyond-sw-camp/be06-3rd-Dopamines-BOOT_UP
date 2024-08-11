<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import CommentInput from './CommentInput.vue';
import CommentView from './CommentView.vue';

const props = defineProps({
  comments: {
    type: Array,
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
const localLikeCount = ref(props.likeCount);
const replyIndex = ref(null);

watch(() => props.comments, (newComments) => {
  localComments.value = [...newComments];
});

async function postLike() {
  try {
    console.log('Liked post');
    localLikeCount.value += 1;
    emit('update:likeCount', localLikeCount.value);
  } catch (error) {
    console.error('Failed to like post:', error);
  }
}

function commentSubmit(comment) {
  localComments.value.push(comment);
  emit('update:comments', localComments.value);
}

function deleteComment(index) {
  localComments.value.splice(index, 1);
  emit('update:comments', localComments.value);
}

function editComment(index, newComment) {
  localComments.value[index].comment = newComment;
  emit('update:comments', localComments.value);
}

function replyToComment(index) {
  replyIndex.value = index;
}
</script>

<template>
  <div>
    <div class="post-wrapper-bottom">
      <h2 id="notes-title" class="post-count-text">답변 리스트</h2>
      <div class="like-wrap">
        <button class="btn-like" @click="postLike">
          <img src="@/assets/icon/empty_marked.svg" alt="like icon">
        </button>
      </div>
    </div>
    <CommentInput @commentSubmit="commentSubmit"></CommentInput>
    <div class="comment-view-container">
      <div class="top-line"></div>
      <div class="comment-view-wrapper">
        <ul class="comment-view-detail-container">
          <li v-for="(comment, index) in localComments" :key="index" :id="'answer-' + index">
            <CommentView v-bind="comment" @delete="deleteComment(index)" @edit="editComment(index, $event)" @reply="replyToComment(index)"></CommentView>
            <CommentInput v-if="replyIndex === index" @commentSubmit="commentSubmit"></CommentInput>
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