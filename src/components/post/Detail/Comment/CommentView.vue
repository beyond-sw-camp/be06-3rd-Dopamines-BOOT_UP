<script setup>
import {defineProps, defineEmits, ref, computed, nextTick, watch} from 'vue';
import ReCommentView from './ReCommentView.vue';


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
  },
  recommentList: {
    type: Array,
    required: false
  }
});

const emit = defineEmits(['delete', 'edit', 'reply', 'update:likeCount']);
const localLikeCount = ref(props.likeCount);
const isEditing = ref(false);
const isReComment = ref(false);
const editableContent = ref(props.content);
const reCommentContent = ref('');
const inputRef = ref(null);
const localComments = ref([...props.recommentList]);

watch(() => props.recommentList, (newComments) => {
  localComments.value = [...newComments];
});

const userNickName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.userNickName || '';
});

function handleDelete() {
  emit('delete', props.idx);
}

const canEditComment = computed(() => {
  return userNickName.value === props.author;
});

function handleEdit() {
  isEditing.value = !isEditing.value;

  nextTick(() => {
    if (isEditing.value && inputRef.value) {
      inputRef.value.focus();
    }
  });
}

function commentUpdate() {
  emit('update', {
    idx: props.idx,
    content: editableContent.value
  });
}

function handleReComment() {
  isReComment.value = !isReComment.value;

  nextTick(() => {
    if (isReComment.value && inputRef.value) {
      inputRef.value.focus();
    }
  });
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
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function createReComment() {
  emit('recomment', {
    commentIdx: props.idx,
    content: reCommentContent.value
  });
  reCommentContent.value = '';
  isReComment.value = false;
}

function deleteReComment(idx) {
  emit('deleteReComment', idx);
}

function updateReComment(reCommentUpdateReq) {
  emit('updateReComment', reCommentUpdateReq);
}


</script>

<template>
  <div class="comment-view">
    <div class="comment-wrap">
      <div>
        <p><strong>{{ author }}</strong> - {{ formatDate(createdAt) }}</p>
      </div>
      <div v-if="isEditing" class="comment-edit-container">
        <input ref="inputRef" v-model="editableContent" />
        <button class="comment-create-btn" @click="commentUpdate">수정</button>
      </div>
      <div v-else>
        <p>{{ content }}</p>
      </div>
    </div>
    <div class="comment-method-container">
      <div>
        <button @click="handleDelete" v-if="canEditComment">삭제</button>
        <button @click="handleEdit" v-if="canEditComment">수정</button>
        <button @click="handleReComment">대댓글</button>
      </div>
      <div class="like-wrap">
        <button class="btn-like" @click="postLike">
          <img src="@/assets/icon/empty_marked.svg" alt="like icon">
        </button>
        <p class="post-count-text">{{ localLikeCount }} 좋아요</p>
      </div>
    </div>
  </div>
  <div class="comment-view-wrapper">
    <ul class="comment-view-detail-container">
      <li v-for="(recomment, index) in localComments" :key="index" :id="'answer-' + index">
        <!-- ReCommentView 컴포넌트 -->
        <ReCommentView
            v-bind="recomment"
            @delete="deleteReComment"
            @update="updateReComment"
            @reply="handleReComment"
        ></ReCommentView>
      </li>
    </ul>
  </div>
  <!-- 대댓글 입력 -->
  <div v-if="isReComment" class="reply-input-container">
    <img src="@/assets/img/reply-icon.png" alt="reply icon" style="width: 25px; height: 25px;">
    <input ref="inputRef" v-model="reCommentContent" placeholder="대댓글을 입력하세요" />
    <button class="reply-submit-btn" @click="createReComment">등록</button>
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
.comment-wrap {
  width: 85%;
}
.comment-edit-container {
  display: flex;
}
.comment-create-btn, .reply-submit-btn {
  font-size: 1rem;
  padding: 6px 10px;
  background-color: rgba(191, 184, 166, 0.7);
  color: #212529;
  border-radius: 5px;
}
.comment-wrap input, .reply-input-container input {
  width: 90%;
  font-size: 1rem;
  border: none;
  outline: none;
}
.comment-wrap input:focus, .reply-input-container input:focus{
  border-bottom: 2px solid #e06139a3;
}
.reply-input-container input {
  margin: 3px;
}
.reply-input-container {
  display: flex;
  width: 100%;
  margin-top: 25px;
}
.comment-view-detail-container li {
  margin-left: 40px;
}

</style>
