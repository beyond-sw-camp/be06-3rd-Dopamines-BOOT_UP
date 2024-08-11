<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useOpenPostStore } from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import SearchBar from '@/components/post/Menu/SearchBar.vue';

const openPostStore = useOpenPostStore();
const route = useRoute();

const searchQuery = ref('');
const openPosts = ref([]);
const errorMessage = ref('');

const performSearch = async () => {
  try {
    if (searchQuery.value) {
      openPosts.value = await openPostStore.search(0, 10, searchQuery.value);
      console.log('Open Posts:', openPosts.value);

      if (openPosts.value.length === 0) {
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
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <SearchBar
            :searchInput="searchQuery"
            @update:searchInput="searchQuery = $event"
            @performSearch="performSearch"
            @keyup.enter="performSearch"
        ></SearchBar>
        <div v-if="errorMessage">{{ errorMessage }}</div>
        <div v-else>
          <div v-for="post in openPosts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.content || '내용이 없습니다' }}</p>
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
</style>