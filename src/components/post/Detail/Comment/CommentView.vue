<script setup>
import {defineProps, defineEmits, ref, computed} from 'vue';

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
  },
  idx: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['delete', 'edit', 'reply', 'update:likeCount']);
const localLikeCount = ref(props.likeCount);

const userNickName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.userNickName || '';
});

function handleDelete() {
  console.log("handleDelete: ", props.idx);
  emit('delete', props.idx);
}

const canEditComment = computed(() => {
  return userNickName.value === props.author;
});

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
    likeIcon.src = require('@/assets/icon/empty_marked.svg');
    localLikeCount.value -= 1;
  } else {
    likeIcon.src = require('@/assets/icon/fill_marked.svg');
    localLikeCount.value += 1;
  }
  emit('update:likeCount', localLikeCount.value);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


</script>

<template>
  <div class="comment-view">
    <div class="comment-wrap">
      <div>
        <p><strong>{{ author }}</strong> - {{ formatDate(createdAt) }}</p>
      </div>
      <div>
        <p>{{ content }}</p>
      </div>
    </div>
    <div class="comment-method-container">
      <div>
        <button @click="handleDelete" v-if="canEditComment">삭제</button>
        <button @click="handleEdit" v-if="canEditComment">수정</button>
        <button @click="handleReply">대댓글</button>
      </div>
      <div class="like-wrap">
        <button class="btn-like" @click="postLike">
          <img src="@/assets/icon/empty_marked.svg" alt="like icon">
        </button>
        <p class="post-count-text">{{ localLikeCount }} 좋아요</p>
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

  p {
    margin: 0;
  }
}
</style>