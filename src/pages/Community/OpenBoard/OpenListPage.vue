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
  openPosts.value =await openPostStore.readAllPosts(1, 10);
  console.log('openPosts:', openPosts.value);
});

const onPageChanged = async (page) => {
  const validPage = Math.max(1, page);
  openPosts.value = await openPostStore.readAllPosts(validPage - 1, 10);
};

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <PostList
            title="공개 게시판"
            :data-list="openPosts"
            board="open"
        ></PostList>
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
}

.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
}
</style>