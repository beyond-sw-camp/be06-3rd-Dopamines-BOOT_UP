<script setup>
import { defineProps } from 'vue';

defineProps({
  freeResults: {
    type: Array,
    default: () => []
  },
  openResults: {
    type: Array,
    default: () => []
  },
  marketResults: {
    type: Array,
    default: () => []
  },
  noticeResults: {
    type: Array,
    default: () => []
  }
});
</script>

<template>
  <div class="search-result">
    <div class="free-search-result">
      <h2>자유 게시판</h2>
      <div class="search-result-list">
        <div v-if="freeResults.length === 0">검색 결과가 없습니다</div>
        <div v-else>
          <div v-for="result in freeResults" :key="result.id">
            <div class="search-result-item">
              {{ result.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="open-search-result">
      <h2>공개 게시판</h2>
      <div class="search-result-list">
        <div v-if="openResults.length === 0">검색 결과가 없습니다</div>
        <div v-else>
          <div v-for="result in openResults" :key="result.id">
            <div class="search-result-item">
              {{ result.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="market-search-result">
      <h2>장터 게시판</h2>
      <div class="search-result-list">
        <div v-if="marketResults.length === 0">검색 결과가 없습니다</div>
        <div v-else>
          <div v-for="result in marketResults" :key="result.id">
            <div class="search-result-item">
              {{ result.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="notice-search-result">
      <h2>공지사항</h2>
      <div class="search-result-list">
        <div v-if="noticeResults.length === 0">검색 결과가 없습니다</div>
        <div v-else>
          <div v-for="result in noticeResults" :key="result.id">
            <div class="search-result-item">
              {{ result.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>