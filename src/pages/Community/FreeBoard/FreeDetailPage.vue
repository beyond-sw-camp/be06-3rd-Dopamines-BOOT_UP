<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetail from '@/components/post/Detail/PostDetail.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";

const comments = ref([]);
const post = ref({});

onMounted(async () => {
  // Dummy data for post
  post.value = {
    title: "Dummy Post Title",
    createdAt: "2023-10-01",
    contents: "This is a dummy post content.",
    author: "Dummy Author",
    commentCount: 2,
    categoryTitle: "Dummy Category",
    boardTitle: "Dummy Board",
    boardListLink: "/dummy-board-list",
    boardLink: "/dummy-board",
    idx: 1,
    boardIdx: 1
  };

  // Dummy data for comments
  comments.value = [
    {
      id: 1,
      author: "Commenter 1",
      content: "This is a dummy comment 1.",
      createdAt: "2023-10-01"
    },
    {
      id: 2,
      author: "Commenter 2",
      content: "This is a dummy comment 2.",
      createdAt: "2023-10-02"
    }
  ];
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div>
          <PostDetail
              :post-title="post.title"
              :post-created-at="post.createdAt"
              :post-contents="post.contents"
              :post-author="post.author"
              :comment-count="post.commentCount"
              :category-title="post.categoryTitle"
              :board-title="post.boardTitle"
              :board-list-link="post.boardListLink"
              :board-link="post.boardLink"
              :post-idx="post.idx"
              :board-idx="post.boardIdx"></PostDetail>
          <CommentComponent :comments="comments" comment-count="2" like-count=""></CommentComponent>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
</style>