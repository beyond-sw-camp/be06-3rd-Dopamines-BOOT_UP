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
    <div class="search-result">
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
    <hr>
    <div class="search-result">
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
    <hr>
    <div class="search-result">
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
    <hr>
    <div class="search-result">
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
    <hr>
  </div>
</template>

<style scoped>
h2{
  margin-top: 0;
  border-radius: 5px;
}
.search-result{
  padding: 10px;
  background-color: rgba(191, 184, 166, 0.2);
  border-radius: 10px;
}
.title[data-v-2062c2e0] {
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
</style>