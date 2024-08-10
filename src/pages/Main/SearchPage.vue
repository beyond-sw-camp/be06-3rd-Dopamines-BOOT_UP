<script setup>
import {ref, onMounted, watch} from 'vue';
import {useRoute} from 'vue-router';
import {useFreePostStore} from '@/pages/Community/FreeBoard/stores/useFreePostStore';
import {useOpenPostStore} from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import {useMarketStore} from '@/pages/Market/stores/UseMarketStore'; // Corrected case
import {useNoticeStore} from '@/pages/Notice/stores/useNoticeStore';
import MainHeader from '@/components/layout/MainHeader.vue';
import SearchBar from '@/components/post/Menu/SearchBar.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import SearchList from '@/pages/Main/component/SearchList.vue';

const searchQuery = ref('');
const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();
const marketPostStore = useMarketStore();
const noticeStore = useNoticeStore();
const route = useRoute();

const performSearch = () => {
  freePostStore.search(searchQuery.value);
  openPostStore.search(searchQuery.value);
  marketPostStore.search(searchQuery.value);
  noticeStore.search(searchQuery.value);
};

const handleSearch = (query) => {
  searchQuery.value = query;
  performSearch();
};

onMounted(() => {
  const query = route.query.q;
  if (query) {
    searchQuery.value = query;
    performSearch();
  }
});

watch(searchQuery, () => {
  performSearch();
});
</script>

<template>
  <div class="body-container">
    <MainHeader @search="handleSearch"></MainHeader>
    <main>
      <div class="content-area">
        <SearchBar
            :searchInput="searchQuery"
            @update:searchInput="searchQuery = $event"
            @performSearch="performSearch"
        ></SearchBar>
        <SearchList
            :freeResults="freePostStore.filteredPosts"
            :openResults="openPostStore.filteredPosts"
            :marketResults="marketPostStore.filteredPosts"
            :noticeResults="noticeStore.filteredPosts"
        ></SearchList>
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
</style>