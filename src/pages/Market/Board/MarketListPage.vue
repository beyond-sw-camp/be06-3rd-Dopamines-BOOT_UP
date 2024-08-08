<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import SearchBar from "@/components/post/Menu/SearchBar.vue";
import PostList from "@/components/post/List/PostList.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="market-container">
        <div class="market-wrapper">
          <div class="market-area">
            <div class="search-container">
              <div class="search-area">
                <PostList
                  title="중고마켓 게시판"
                  :data-list="dataList"
                  :show-status="isStatusShow"
                ></PostList>
                <SearchBar></SearchBar>
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
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <ul class="sort-list">
              <li>
                <button class="px-2">찜한 목록</button>
              </li>
            </ul>
            <ul class="market-content-container">
              <li
                v-show="!isSearched"
                v-for="product in this.marketStore.list"
                v-bind:key="product.idx"
              >
                <CardViewComponent :product="product"></CardViewComponent>
              </li>

              <li
                v-show="isSearched"
                v-for="product in this.marketStore.searchResults"
                v-bind:key="product.idx"
              >
                <CardViewComponent :product="product"></CardViewComponent>
              </li>
            </ul>
            <button
              :disabled="this.marketStore.isEnd === true"
              v-show="!this.marketStore.isEnd && !isSearched"
              @click="getData"
              class="apply-btn"
            >
              더보기
            </button>
            <button
              :disabled="this.marketStore.isSearchResultEnd === true"
              v-show="!this.marketStore.isSearchResultEnd && isSearched"
              @click="search(this.searchQuery)"
              class="apply-btn"
            >
              더보기
            </button>
          </div>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import CardViewComponent from "@/pages/Market/Board/components/CardViewComponent.vue";
import { useMarketStore } from "@/pages/Market/stores/UseMarketStore";

export default {
  name: "MarketListPage",
  data() {
    return {
      isSearched: false,
      searchQuery: "",
    };
  },
  computed: {
    ...mapStores(useMarketStore),
  },
  created() {
    this.marketStore.getProducts();
  },
  methods: {
    getData() {
      this.marketStore.getProducts();
    },
    search(searchQuery) {
      this.isSearched = true;
      this.searchQuery = searchQuery;

      this.marketStore.search(searchQuery);
    },
  },
  components: {
    CardViewComponent,
  },
};
</script>

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

.border {
  border-width: 1px;
}

.px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.mx-\[6px\] {
  margin-left: 6px;
  margin-right: 6px;
}
</style>