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
const postCnt = ref(0);
const currentPage = ref(1);

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

const routes = [
  {
    path: '/free/write',
    name: 'FreeWritePage',
  },
];

onMounted(async () => {
  try {
    freePosts.value = await freePostStore.readAllPosts(0, 10);
    postCnt.value = await freePostStore.getCount();
    console.log(postCnt.value)
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
  freePosts.value = await freePostStore.readAllPosts(validPage-1, 10);
  currentPage.value = validPage;
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
              :totalItems="postCnt"
              :itemsPerPage="10"
              :currentPage="currentPage"
              @page-changed="onPageChanged"
          />
          <div class="post-write">
            <router-link :to="routes[0].path">글 작성</router-link>
          </div>
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
.post-write {
  background-color: #e06139;
  border-radius: 5px;
  width: 130px;
  //height: 100%;
  padding: 10px;
  margin: 20px 0 20px 0;
  text-align: center;
  margin-left: auto;
  a {
    color: #fff;
  }
  &:hover {
    background-color: #e0613976;
  }
}
</style>