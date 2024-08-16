<script setup>
import { ref, onMounted, computed } from "vue";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import CardViewComponent from "@/pages/Market/Board/components/CardViewComponent.vue";

const marketStore = useMarketStore();
const isSearched = ref(false);
const searchQuery = ref("");
const showMarked = ref(false);

const products = computed(() => marketStore.list);
const filteredProducts = computed(() => {
  if (showMarked.value) {
    return products.value.filter(product => product.markedStatus === "fill");
  }
  if (!searchQuery.value) {
    return products.value;
  }
  return products.value.filter(product => product.title.includes(searchQuery.value));
});

const getData = () => {
  marketStore.getProducts();
};

const search = () => {
  isSearched.value = true;
};

const toggleMarkedItems = () => {
  showMarked.value = !showMarked.value;
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="market-container">
        <h3 class="title"> 중고 장터 </h3>
        <div class="market-wrapper">
          <div class="market-area">
            <div class="search-container">
              <div class="search-area">
                <div class="search-wrap">
                  <div class="search-box">
                    <input
                        v-model="searchQuery"
                        @input="search"
                        type="text"
                        placeholder="Search by title"
                        class="search-bar"
                        style="margin: 0;"
                    />
                    <button aria-label="search" type="button" @click="handleSearch">
                      <img src="../../../assets/icon/searchIcon.svg" alt="" />
                    </button>
                  </div>
                </div>
                <div v-show="isSearched" class="search-title">
                  <h2>
                    <strong>'{{ searchQuery }}'</strong> 검색 결과
                  </h2>
                </div>
                <table class="filter-table">
                  <tbody>
                  <tr>
                    <td>가격</td>
                    <td class="price-filter">
                      <input
                          type="text"
                          placeholder="최소 가격"
                          data-idx="0"
                      />
                      <span class="mx-[6px]">~</span>
                      <input
                          type="text"
                          placeholder="최대 가격"
                          data-idx="1"
                      />
                      <button class="apply-btn">적용</button>
                      <router-link to="/market/write" class="apply-btn">글 작성</router-link>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ul class="sort-list">
              <div>
                <button class="px-2" @click="toggleMarkedItems">
                  {{ showMarked ? '전체 목록' : '찜한 목록' }}
                </button>
              </div>
              <div class="market-content-container">
                <CardViewComponent
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :product="product"
                />
              </div>
              <button
                  :disabled="isEnd"
                  v-show="!isEnd && !isSearched"
                  @click="getData"
                  class="apply-btn"
              >
                더보기
              </button>
              <button
                  :disabled="isSearchResultEnd"
                  v-show="!isSearchResultEnd && isSearched"
                  @click="search"
                  class="apply-btn"
              >
                더보기
              </button>
            </ul>
          </div>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
*,
:after,
:before {
  box-sizing: border-box;
  border: 0 solid #f9f9f9;
}

h2,
p {
  margin: 0;
}

.market-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto !important;
  min-height: 0px !important;
  width: 100%;
}

.market-wrapper {
  position: relative;
  min-height: 0px !important;
  height: auto !important;
}

.search-container {
  position: relative;
}

.search-area {
  display: flex;
  gap: 15px;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
}

.market-area {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: content-box;
}

.search-title {
  display: flex;
  flex-direction: column;
  flex-direction: row;
  align-items: center;
  gap: 6px;
  align-items: flex-start;
  margin-bottom: 10px;
}

.search-title h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  font-size: 28px;
  font-weight: 400;
  width: calc(100% - 30px);
  width: auto;
  --tw-text-opacity: 1;
  color: rgb(20 19 19 / var(--tw-text-opacity));
}

.search-title strong {
  font-weight: 600;
}

.search-bar {
  margin-bottom: 50px;
  margin-right: 150px;
}

.apply-btn {
  width: 100%;
  margin-top: 0.75rem;
  width: auto;
  --tw-bg-opacity: 1;
  background-color: #19191a;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
  margin: 0;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.sort-list {
  display: inline-flex;
  z-index: 10;
  width: 100%;
  justify-content: flex-end;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  top: 220px;
  padding-top: 1.75rem;
  padding-bottom: 2.25rem;
  display: flex;
  flex-direction: column;
}

.sort-list li {
  font-size: 0.875rem;
  line-height: 1.25rem;
  line-height: 17px;
  --tw-text-opacity: 1;
  color: rgb(120 126 137 / var(--tw-text-opacity));
  font-weight: 500;
}

.sort-list li:not(:last-child):after {
  --tw-content: "";
  content: var(--tw-content);
}

.sort-list li:after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(218 222 229 / var(--tw-border-opacity));
  content: var(--tw-content);
  border-width: 1px;
}

.price-filter input {
  width: 152px;
  border-width: 1px;
  border-radius: 0.25rem;
  --tw-border-opacity: 1;
  border-color: rgb(241 244 246 / var(--tw-border-opacity));
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
}

.market-content-container {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-columns: repeat(4, minmax(0, 1fr));
  -moz-column-gap: 0.75rem;
  column-gap: 0.75rem;
  -moz-column-gap: 0.75rem;
  column-gap: 0.75rem;
  -moz-column-gap: 1.25rem;
  column-gap: 1.25rem;
  -moz-column-gap: 1.75rem;
  column-gap: 1.75rem;
  row-gap: 0.75rem;
  row-gap: 1.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

table {
  width: 100%;
  border: 1px solid #ddd;
  border-collapse: collapse;
}

table {
  text-indent: 0;
  border-color: inherit;
}

table td,
table th {
  padding: 5px;
  border: 1px solid #ddd;
  font-size: 12px;
  vertical-align: top;
}

table th {
  text-align: center;
}

button,
input {
  font-family: inherit;
  font-size: 100%;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

button {
  text-transform: none;
}

input::-moz-placeholder {
  opacity: 1;
  color: #999;
}

::-moz-placeholder,
input::-moz-placeholder {
  color: #707070;
}

input::placeholder {
  color: #707070;
}

[type="button"],
button {
  -webkit-appearance: button;
  background-color: transparent;
  background-image: none;
}

[role="button"],
button {
  cursor: pointer;
}

.filter-table {
  display: table;
  border-right: none;
  border-left: none;
  border-top: 2px solid #141313;
  width: 100%;
}

.filter-table tr {
  height: 100%;
}

.filter-table td {
  border-right: none;
  border-left: none;
  padding: 16px 24px;
  vertical-align: middle;
}

.filter-table td:first-child {
  width: 144px;
  background-color: #f7f9fa;
  border-bottom: none;
  font-size: 16px;
  font-weight: 500;
  color: #141313;
}

.filter-table .sub-list {
  text-align: center;
  vertical-align: middle;
}

.filter-table .no-border {
  border-top: none;
}

.filter-table .price-filter ::-moz-placeholder {
  color: #9ca3af;
}

.filter-table .price-filter ::placeholder {
  color: #9ca3af;
}

.search-wrap {
  display: flex;
  gap: 10px;
}
.search-box {
  width: 100%;
  height: 40px;
  padding: 0px 20px;
  background-color: rgb(255, 255, 255);
  position: relative;
  border-radius: 100px;
  border: 1px solid #e06139;
  transition: 0.5s;
  input {
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
  button {
    position: absolute;
    left: 10px;
    top: 8px;
  }
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.mx-\[6px\] {
  margin-left: 6px;
  margin-right: 6px;
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
  margin-bottom: 10px;
  margin-top: 0;
}
</style>