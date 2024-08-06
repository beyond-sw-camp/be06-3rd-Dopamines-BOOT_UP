<script setup>
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import { defineProps } from 'vue';

const props = defineProps({
  boardIdx: {
    type: Number,
    required: true,
  },
  postIdx: {
    type: Number,
    required: true,
  },
  boardLink: {
    type: String,
    required: true,
  },
  boardListLink: {
    type: String,
    required: true,
  },
  boardTitle: {
    type: String,
    required: true,
  },
  categoryTitle: {
    type: String,
    required: true,
  },
  commentCount: {
    type: Number,
    required: true,
  },
  postAuthor: {
    type: String,
    required: true,
  },
  postContents: {
    type: String,
    required: true,
  },
  postCreatedAt: {
    type: String,
    required: true,
  },
  postTitle: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div :id="'post-' + props.boardIdx">
    <PostDetailComponent
        :post-idx="props.postIdx"
        :board-link="props.boardLink"
        :board-list-link="props.boardListLink"
        :board-title="props.boardTitle"
        :category-title="props.categoryTitle"
        :comment-count="props.commentCount"
        :post-author="props.postAuthor"
        :post-contents="props.postContents"
        :post-created-at="props.postCreatedAt"
        :post-title="props.postTitle"
    ></PostDetailComponent>
  </div>
</template>

<style scoped>

</style>