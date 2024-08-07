<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from 'vue-router';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetail from '@/components/post/Detail/PostDetail.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import {useFreePostStore} from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import {useFreeCommentStore} from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";

const route = useRoute();
const comments = ref([]);
const post = ref({});

const freeBoardStore = useFreePostStore();
const freeCommentStore = useFreeCommentStore();

onMounted(async () => {
  const postId = route.params.id;
  post.value = await freeBoardStore.fetchPostDetail(postId);
  comments.value = await freeCommentStore.fetchComments(postId);
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
          <CommentComponent :comments="comments"></CommentComponent>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
</style>