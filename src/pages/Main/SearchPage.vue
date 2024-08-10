<script setup>
import { ref } from 'vue';
import { useFreePostStore } from '@/pages/Community/FreeBoard/stores/useFreePostStore';
import { useOpenPostStore } from '@/pages/Community/OpenBoard/stores/useOpenPostStore';
import { useMarketStore } from '@/pages/Market/stores/UseMarketStore';
import { useNoticeStore } from '@/pages/Notice/stores/useNoticeStore';
import MainHeader from '@/components/layout/MainHeader.vue';
import SearchBar from '@/components/post/Menu/SearchBar.vue';
import MainFooter from '@/components/layout/MainFooter.vue';
import SearchList from '@/pages/Main/component/SearchList.vue';

const searchQuery = ref('');
const freePostStore = useFreePostStore();
const openPostStore = useOpenPostStore();
const marketPostStore = useMarketStore();
const noticeStore = useNoticeStore();

const performSearch = async () => {
  await freePostStore.search(searchQuery.value);
  await openPostStore.search(searchQuery.value);
  await marketPostStore.search(searchQuery.value);
  await noticeStore.search(searchQuery.value, searchQuery.value);
};

const handleSearch = (query) => {
  searchQuery.value = query;
  performSearch();
};
</script>

<template>
  <div class="body-container">
    <MainHeader @search="handleSearch"></MainHeader>
    <main>
      <div class="content-area">
        <SearchBar v-model:searchQuery="searchQuery" @input="performSearch"></SearchBar>
        <SearchList
            :freeResults="freePostStore.searchResults"
            :openResults="openPostStore.searchResults"
            :marketResults="marketPostStore.searchResults"
            :noticeResults="noticeStore.searchResults"
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