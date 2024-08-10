<script setup>
import { defineProps } from 'vue';

defineProps({
  commentContent: {
    type: String,
    required: false
  },
  commentSubmit: {
    type: Function,
    required: true
  }
});
</script>

<template>
  <div class="comment-input-container">
    <div class="comment-input-wrapper">
      <div class="comment-input-wrapper2">
        <div class="comment-input-box">
          <textarea id="answer" name="answer" placeholder="댓글을 입력해주세요/"
                    class="comment-input-textarea"></textarea>
          <p style="display: flex; margin-left: 10px;" class="comment-authentication">
            {{ commentContent }}
          </p>
          <div class="comment-btn-shape">
            <button type="submit" class="comment-btn-primary" @click="commentSubmit">작성</button>
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

.comment-authentication {
  display: flex;
  margin-left: 10px;
  position: absolute;
  font-size: .875rem;
  top: 0.625rem;
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