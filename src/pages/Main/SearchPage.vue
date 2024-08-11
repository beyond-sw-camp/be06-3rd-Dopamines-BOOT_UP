<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useFreePostStore } from '@/pages/Community/FreeBoard/stores/useFreePostStore';
import { useOpenPostStore } from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import { useMarketStore } from '@/pages/Market/stores/UseMarketStore.js';
import MainHeader from '@/components/layout/MainHeader.vue';
import SearchBar from '@/components/post/Menu/SearchBar.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import SearchList from '@/pages/Main/component/SearchList.vue';

const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();
const marketPostStore = useMarketStore();
const route = useRoute();

const searchQuery = ref('');
const freePosts = ref([]);
const openPosts = ref([]);
const marketPosts = ref([]);
const errorMessage = ref('');
const marketPostSize = 3;

const performSearch = async () => {
  try {
    if (searchQuery.value) {
      freePosts.value = await freePostStore.search(0, 3, searchQuery.value);
      openPosts.value = await openPostStore.search(0, 3, searchQuery.value);
      marketPosts.value = await marketPostStore.search(0, marketPostSize + 1, searchQuery.value);
      console.log('Free Posts:', freePosts.value);
      console.log('Open Posts:', openPosts.value);
      console.log('Market Posts:', marketPosts.value);

      if (freePosts.value.length === 0 && openPosts.value.length === 0 && marketPosts.value.length === 0) {
        errorMessage.value = '검색 결과가 없습니다';
      } else {
        errorMessage.value = '';
      }
    }
  } catch (error) {
    errorMessage.value = 'performSearch에서 에러 발생: ' + error.message;
    console.error('performSearch에서 에러 발생:', error);
  }
};

const handleSearch = (query) => {
  searchQuery.value = query;
  performSearch();
};

onMounted(async () => {
  try {
    const query = route.query.q;
    if (query) {
      searchQuery.value = query;
      performSearch();
    }
  } catch (error) {
    errorMessage.value = 'mount에서 에러 발생: ' + error.message;
    console.error('mount에서 에러 발생:', error);
  }
});
</script>

<template>
  <div class="body-container">
    <MainHeader @search="handleSearch"></MainHeader>
    <main>
      <div class="content-area">
        <div class="title">
          <h3>통합 검색</h3>
        </div>
        <p>
          통합검색 창입니다. 검색어를 입력하고 검색 버튼을 누르세요.
        </p>
        <SearchBar
            :searchInput="searchQuery"
            @update:searchInput="searchQuery = $event"
            @performSearch="performSearch"
            @keyup.enter="performSearch"
        ></SearchBar>
        <SearchList
            :freeResults="freePosts"
            :openResults="openPosts"
            :marketResults="marketPosts"
            :marketPostSize="marketPostSize"
            :searchQuery="searchQuery"
        />
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.content-area {
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
}

.title {
  display: flex;
  background-color: rgb(224 97 57);
  color: #fff;
  border-radius: 0.75rem;
  height: 4rem;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 10%);
}

p {
  margin: 0;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
}
</style>