<script setup>
import {ref, onMounted} from 'vue';
import {useRoute} from 'vue-router';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import PostList from "@/components/post/List/PostList.vue";
import PaginationComponent from "@/components/layout/PaginationComponent.vue";
import {useFreePostStore} from "@/pages/Community/FreeBoard/stores/useFreePostStore";

const freePostStore = useFreePostStore();
const route = useRoute();

const searchQuery = ref('');
const freePosts = ref([]);
const errorMessage = ref('');

const performSearch = async () => {
  try {
    const allPosts = await freePostStore.readAllPosts(1, 100); // Fetch all posts
    if (searchQuery.value) {
      freePosts.value = allPosts.filter(post =>
          post.title.includes(searchQuery.value) || post.content.includes(searchQuery.value)
      );
      if (freePosts.value.length === 0) {
        errorMessage.value = '검색 결과가 없습니다';
      } else {
        errorMessage.value = '';
      }
    } else {
      freePosts.value = allPosts;
    }
  } catch (error) {
    errorMessage.value = 'performSearch에서 에러 발생: ' + error.message;
    console.error('performSearch에서 에러 발생:', error);
  }
};

onMounted(async () => {
  try {
    freePosts.value = await freePostStore.readAllPosts(1, 10);
    searchQuery.value = route.query.q || '';
    if (searchQuery.value) {
      performSearch();
    }
  } catch (error) {
    errorMessage.value = 'mount에서 에러 발생: ' + error.message;
    console.error('mount에서 에러 발생:', error);
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
        <SearchBar
            :searchInput="searchQuery"
            @update:searchInput="searchQuery = $event"
            @performSearch="performSearch"
            @keyup.enter="performSearch"
        ></SearchBar>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <div v-else style="width: 100%">
          <PostList
              title="자유 게시판"
              board="free"
              :data-list="freePosts"
              :searchQuery="searchQuery"
              :performSearch="performSearch"
          ></PostList>
          <PaginationComponent
              :totalItems="freePosts.length"
              :itemsPerPage="10"
              :currentPage="1"
              @page-changed="onPageChanged"
          />
        </div>
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

.error-message {
  color: red;
  margin-top: 1rem;
}
</style>