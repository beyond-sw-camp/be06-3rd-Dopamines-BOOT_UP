<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  idx: {
    type: Number,
    required: false
  },
  postTitle: {
    type: String,
    required: false
  },
  content: {
    type: String,
    required: false
  },
  nickName: {
    type: String,
    required: false
  },
  createdAt: {
    type: String,
    required: false
  },
});
</script>

<template>
  <div class="board-post-status-header">
    <div class="board-post-status-left">
      <div class="board-post-author">
        <span>{{ props.nickName }}</span>
        |
        <span class="board-post-time">{{ props.createdAt }}</span>
      </div>
      <div class="board-post-title">
        <span>{{ props.postTitle }}</span>
      </div>
    </div>
  </div>
<!--  <div>-->
<!--    <a class="board-post-title" :href="`${props.idx}`">{{ props.content }}</a>-->
<!--  </div>-->
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

    .board-post-title {
      transition: color 0.3s;
    }

    .board-post-title:hover{
      color: red;
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
