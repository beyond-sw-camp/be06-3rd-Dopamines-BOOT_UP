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
      <div>
        <div v-if="freeResults.length === 0">검색 결과가 없습니다</div>
        <div v-else class="search-result-list">
          <div v-for="result in freeResults" :key="result.id" class="search-result-item">
            <div >
              <h3>{{ result.title }}</h3>
              <p>{{ result.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="search-result">
      <h2>공개 게시판</h2>
      <div>
        <div v-if="openResults.length === 0">검색 결과가 없습니다</div>
        <div v-else class="search-result-list">
          <div v-for="result in openResults" :key="result.id" class="search-result-item">
            <div >
              <h3>{{ result.title }}</h3>
              <p>{{ result.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="search-result">
      <h2>장터 게시판</h2>
      <div>
        <div v-if="marketResults.length === 0">검색 결과가 없습니다</div>
        <div v-else class="search-result-list">
          <div v-for="result in marketResults" :key="result.id" class="search-result-item">
            <h3>{{ result.title }}</h3>
            <p>{{ result.content }}</p>
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
.search-result-list{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.search-result-item{
  background-color: #ffffff8a;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  h3{
    margin: 0;
  }
  p{
    margin: 0;
  }
}
.title{
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