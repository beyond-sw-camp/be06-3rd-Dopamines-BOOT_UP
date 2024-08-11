<script setup>
import {ref, defineEmits} from 'vue';
import {useFreeCommentStore} from '@/pages/Community/FreeBoard/stores/useFreeCommentStore';
import {useRoute} from 'vue-router';

const freeCommentStore = useFreeCommentStore();
const route = useRoute();
const newComment = ref('');
const emit = defineEmits(['new-comment']);

const handleSubmit = async () => {
  if (newComment.value.trim() === '') return;
  const postId = route.params.id;
  const commentData = {content: newComment.value};
  try {
    const createdComment = await freeCommentStore.createComment(postId, commentData);
    newComment.value = '';
    emit('new-comment', createdComment);
  } catch (error) {
    console.error('Failed to submit comment:', error);
  }
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSubmit();
  }
};
</script>

<template>
  <div class="comment-input-container">
    <div class="comment-input-wrapper">
      <div class="comment-input-wrapper2">
        <div class="comment-input-box">
          <textarea id="answer" name="answer" placeholder="댓글을 입력해주세요"
                    class="comment-input-textarea" v-model="newComment" @keypress="handleKeyPress"></textarea>
          <div class="comment-btn-shape">
            <button type="submit" class="comment-btn-primary" @click="handleSubmit">작성</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 376 */
select, textarea {
  appearance: none;
  background-color: #fff;
  border-color: #6b7280;
  border-width: 1px;
  border-radius: 0;
  padding: .5rem .75rem;
  font-size: 1rem;
  line-height: 1.5rem;
}

.comment-input-container {
  flex-direction: column;
  margin: 0;
}

.comment-input-wrapper {
  padding-left: 0;
  padding-right: 0;
  width: 100%;
}

.comment-input-wrapper2 {
  width: 100%;
  padding: 1.5rem;
  position: relative;
  border: 1px solid #bfb8a6;
  border-radius: 10px;
  background-color: #bfb8a629;
  box-sizing: border-box;
}

.comment-input-box {
  position: relative;
}

.comment-input-textarea {
  border: 1px solid #bfb8a6;
  width: 100%;
  box-sizing: border-box;
}

.comment-btn-shape {
  margin-top: .25rem;
  display: flex;
  justify-content: flex-end;
}

.comment-btn-primary {
  font-size: .875rem;
  line-height: 1.25rem;
  padding: .5rem 2rem;
  background-color: #E06139;
  color: #fff;
  border-color: transparent;
  border-radius: .375rem;
}

.comment-btn-disabled {
  font-size: .875rem;
  line-height: 1.25rem;
  padding: .5rem 2rem;
  border-color: transparent;
  border-radius: .375rem;
}
</style>