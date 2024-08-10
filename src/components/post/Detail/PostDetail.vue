<script setup>
import PostDetailComponent from '@/components/post/Detail/PostDetailComponent.vue';
import { defineProps } from 'vue';

defineProps({
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
  <div>
    <PostDetailComponent
        :post-contents="postContents"
        :post-title="postTitle"
        :post-created-at="postCreatedAt"
        :post-author="postAuthor"
        :category-title="categoryTitle"
        :category="categoryTitle"
        :board-title="boardTitle"
        :board="boardListLink"
        :post-idx="postIdx"
    ></PostDetailComponent>
  </div>
</template>