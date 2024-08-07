<script setup>
import { defineProps } from 'vue';

defineProps({
  title: {
    type: String,
    required: true
  },
  dataList: {
    type: Array,
    required: true
  },
  showStatus: {
    type: Boolean,
    default: true
  }
});
</script>

<template>
  <div class="post-list-container">
    <div class="title">
      <span>{{ title }}</span>
    </div>
    <div>
      <div class="content">
        <ul class="board-list">
          <li class="board-list-wrap" v-for="post in dataList" :key="post.id">
            <div class="board-post-status-header">
              <div class="board-post-status-left">
                <div class="board-post-author">
                  <span>{{ post.author }}</span>
                </div>
                <div class="board-post-time">
                  <span>{{ post.createdAt }}</span>
                </div>
              </div>
              <div class="board-post-status-right" v-if="showStatus">
                <div class="board-post-right-detail">
                  <img src="../../../assets/icon/thumbIcon.svg" alt="Icon" width="20px">
                  <span class="board-post-right-detail-text">{{ post.likeCount }}</span>
                </div>
                <div class="board-post-right-detail">
                  <img src="../../../assets/icon/commentIcon.svg" alt="Icon" width="20px">
                  <span class="board-post-right-detail-text">{{ post.commentCount }}</span>
                </div>
              </div>
            </div>
            <div>
              <a class="board-post-title" :href="post.postLink">{{ post.postTitle }}</a>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #bfb8a6a2;
  --text-color: #19191A;
  --secondary-color: #19191ab7;
  --text-muted-color: #19191a92;
}
.post-list-container{
  width: 100%;
}

.title {
  display: flex;
  background-color: #bfb8a6a2;
  color: var(--text-color);
  border-radius: 0.75rem;
  height: 4rem;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  a {
    align-items: center;
    display: flex;
    height: 100%;
    span {
      font-weight: 700;
      font-size: 18px;
    }
  }
}

.board-list {
  li {
    padding-top: 1rem;
    padding-bottom: 1rem;
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
    .board-post-title {
      font-weight: 600;
      word-break: break-all;
      width: fit-content;
      overflow: hidden;
    }
  }
}
</style>