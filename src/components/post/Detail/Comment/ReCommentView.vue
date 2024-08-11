<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true
  },
  likeCount: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['delete', 'edit', 'reply', 'update:likeCount']);
const localLikeCount = ref(props.likeCount);

function handleDelete() {
  emit('delete');
}

function handleEdit() {
  const newComment = prompt('Edit your comment:', props.content);
  if (newComment !== null) {
    emit('edit', newComment);
  }
}

function handleReply() {
  emit('reply');
}

function postLike() {
  const likeIcon = document.querySelector('.btn-like img');
  let isLiked = likeIcon.src.includes('filled_marked.svg');
  if (isLiked) {
    likeIcon.src = require('@/assets/icon/empty_marked.svg');
    localLikeCount.value -= 1;
  } else {
    likeIcon.src = require('@/assets/icon/fill_marked.svg');
    localLikeCount.value += 1;
  }
  emit('update:likeCount', localLikeCount.value);
}
</script>

<template>
  <div class="comment-view">
    <div class="comment-wrap">
      <div>
        <p><strong>{{ author }}</strong> - {{ createdAt }}</p>
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
    </div>
    <div class="comment-method-container">
      <div>
        <button @click="handleDelete">삭제</button>
        <button @click="handleEdit">수정</button>
        <button @click="handleReply">대댓글</button>
      </div>
      <div class="like-wrap">
        <button class="btn-like" @click="postLike">
          <img src="@/assets/icon/empty_marked.svg" alt="like icon">
        </button>
        <p class="post-count-text">{{ localLikeCount }}개의 좋아요</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-view {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.comment-method-container {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
}
.like-wrap {
  display: flex;
  align-items: center;
}
.like-wrap p {
  margin: 0;
}
</style>