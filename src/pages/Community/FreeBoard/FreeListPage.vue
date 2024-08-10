<script setup>
import { ref, onMounted } from 'vue';
import PostList from "@/components/post/List/PostList.vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";
import PaginationComponent from "@/components/layout/PaginationComponent.vue";

const freePostStore = useFreePostStore();

const freePosts = ref([]);

onMounted(async () => {
  freePosts.value = await freePostStore.readAllPosts(1, 10);
  console.log('freePosts:', freePosts.value);
});

const onPageChanged = async (page) => {
  const validPage = Math.max(1, page);
  freePosts.value  = await freePostStore.readAllPosts(validPage, 10);
};

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <PostList
            title="자유 게시판"
            board="free"
            :data-list="freePosts"
        ></PostList>
        <PaginationComponent
            :totalItems="freePosts.length"
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
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>