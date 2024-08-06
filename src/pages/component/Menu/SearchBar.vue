<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

const searchInput = ref('');
const router = useRouter();

const handleSearch = () => {
  router.push({path: '/search', query: { q : searchInput.value}});
};

</script>

<template>
  <div class="search-area">
    <div class="search-wrap">
      <div class="search-box">
        <input v-model="searchInput" @keyup.enter="handleSearch" autocomplete="off" type="text" placeholder="검색어를 입력하세요">
        <button aria-label="search" type="button" @click="handleSearch">
          <img src="../../../assets/icon/searchIcon.svg" alt="">
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-box{
  //width: 800px;
  height: 40px;
  padding: 0px 20px;
  background-color: rgb(255, 255, 255);
  position: relative;
  border-radius: 100px;
  border: 1px solid #E06139;
  transition: 0.5s;
  input{
    width: 100%;
    box-sizing: border-box;
    padding: 0px 40px 0px 44px;
    height: 40px;
    border: none;
    color: rgb(0, 0, 0);
    position: absolute;
    right: 0px;
    background-color: transparent;
    font-size: 16px;
    line-height: 24px;
  }
  button{
    position: absolute;
    left: 10px;
    top: 8px;
  }
}
</style>