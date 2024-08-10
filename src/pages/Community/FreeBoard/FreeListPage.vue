<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostList from "@/components/post/List/PostList.vue";
import PaginationComponent from "@/components/layout/PaginationComponent.vue";
import { useFreePostStore } from "@/pages/Community/FreeBoard/stores/useFreePostStore";

const freePostStore = useFreePostStore();
const route = useRoute();

const searchQuery = ref('');
const freePosts = ref([]);

const performSearch = async () => {
  freePosts.value = await freePostStore.search(1, 10, searchQuery.value);
};

onMounted(async () => {
  freePosts.value = await freePostStore.readAllPosts(1, 10);
  console.log('freePosts:', freePosts.value);
  searchQuery.value = route.query.q || '';
  if (searchQuery.value) {
    performSearch();
  }
});

const onPageChanged = async (page) => {
  const validPage = Math.max(1, page);
  freePosts.value = await freePostStore.readAllPosts(validPage, 10);
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
            :searchQuery="searchQuery"
            :performSearch="performSearch"
        ></PostList>
        <div v-if="freePosts.length === 0">검색 결과가 없습니다</div>
        <div v-else>
          <div v-for="post in freePosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content }}</p>
          </div>
        </div>
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