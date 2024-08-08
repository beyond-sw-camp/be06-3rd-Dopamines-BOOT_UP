<script setup>
import { ref, onMounted } from 'vue';
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useOpenPostStore } from "@/pages/Community/OpenBoard/stores/useOpenPostStore";
import PaginationComponent from "@/components/layout/PaginationComponent.vue";

const openPostStore = useOpenPostStore();

const openPosts = ref([]);

onMounted(async () => {
  await openPostStore.readAllPosts(1, 10);
  openPosts.value = openPostStore.posts;
});

const onPageChanged = async (page) => {
  const validPage = Math.max(1, page);
  await openPostStore.readAllPosts(validPage - 1, 10);
  openPosts.value = openPostStore.posts;
};

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <PostList :posts="openPosts" title="공개 게시판" :data-list="openPosts" board-link="open">
        </PostList>
        <PaginationComponent
            :totalItems="openPosts.length"
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