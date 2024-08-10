<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  idx: {
    type: Number,
    required: true
  },
  postTitle: {
    type: String,
    required: true
  },
  author: {
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
  commentCount: {
    type: Number,
    required: true
  },
});
</script>

<template>
  <div class="board-post-status-header">
    <div class="board-post-status-left">
      <div class="board-post-author">
        <span>{{ props.author }}</span>
      </div>
      <div class="board-post-time">
        <span>{{ props.createdAt }}</span>
      </div>
    </div>
    <div class="board-post-status-right">
      <div class="board-post-right-detail">
        <img src="@/assets/icon/thumbIcon.svg" alt="Icon" width="20px">
        <span class="board-post-right-detail-text">{{ props.likeCount }}</span>
      </div>
      <div class="board-post-right-detail">
        <img src="@/assets/icon/commentIcon.svg" alt="Icon" width="20px">
        <span class="board-post-right-detail-text">{{ props.commentCount }}</span>
      </div>
    </div>
  </div>
  <div>
    <a class="board-post-title" :href="`${props.idx}`">{{ props.postTitle }}</a>
  </div>
</template>

<style scoped>
.board-post-status-header {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;

  .board-post-status-left {
    align-items: center;
    display: flex;

    .board-post-author {
      font-weight: 500;
      color: #19191ab7;
      margin: 0;
    }

    .board-post-time {
      font-size: 0.875rem;
      color: #19191a92;
      margin-left: 0.5rem;
    }
  }

  .board-post-status-right {
    display: flex;
    color: #19191a92;
    gap: 0.5rem;

    .board-post-right-detail {
      column-gap: 0.125rem;
      align-items: center;
      flex: 1 1 0%;
      display: flex;

      svg {
        flex-shrink: 0;
        width: 1rem;
      }
    }
  }
}
</style>
