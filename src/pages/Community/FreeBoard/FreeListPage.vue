<script setup>
import { onMounted } from 'vue';
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import PaginationComponent from "@/components/layout/PaginationComponent.vue";

const freePostStore = useFreePostStore();

onMounted(async () => {
  await freePostStore.readAllPosts(1, 10);
});

const onPageChanged = async (page) => {
  await freePostStore.readAllPosts(page - 1, 10);
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <PostList
            :posts="freePostStore.posts"
            title="자유 게시판"
            :data-list="freePostStore.posts"
            :boardlink="free">
        </PostList>
        <PaginationComponent
            :totalItems="freePostStore.posts.length"
            :itemsPerPage="10"
            :currentPage="1"
            @page-changed="onPageChanged"
        />
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>