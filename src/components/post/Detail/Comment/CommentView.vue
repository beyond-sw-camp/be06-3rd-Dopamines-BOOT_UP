<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  author: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createAt: {
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
  const newComment = prompt('Edit your comment:', props.comment);
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
    likeIcon.src = '@/assets/icon/empty_marked.svg';
    localLikeCount.value -= 1;
  } else {
    likeIcon.src = '@/assets/icon/filled_marked.svg';
    localLikeCount.value += 1;
  }
  emit('update:likeCount', localLikeCount.value);
}
</script>

<template>
  <div class="comment-view">
    <div>
      <div>
        <p><strong>{{ author }}</strong> - {{ createAt }}</p>
      </div>
      <div>
        <p>{{ comment }}</p>
      </div>
    </div>
    <div>
      <button @click="handleDelete">삭제</button>
      <button @click="handleEdit">수정</button>
      <button @click="handleReply">대댓글</button>
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
}
</style>