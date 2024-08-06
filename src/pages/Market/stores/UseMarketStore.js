import { defineStore } from "pinia";
import axios from "axios";
const backend = "/api";

//전역 저장소 생성
export const useMarketStore = defineStore("market", {
    state: () => ({
        page: 0,
        size: 8,
        product: {},
        list: [],
        searchResults: [],
        searchPage: 0,
        isEnd: false,
        isSearchResultEnd: false,
        lastSearchQuery: ""
    }),
    actions: {
        async getProducts() {
            let url = backend + `/market?page=${this.page}&size=${this.size}`;
            let response = await axios.get(url, { withCredentials: true });

            let data = response.data.result;

            if (data.length == 0) {
                // 더이상 불러올 데이터가 없음
                this.isEnd = true;
                return;
            }

            if (this.size < data.length) {
                response.data.result.pop(); // 다음 요소가 더 있을 때 (slice: 사이즈보다 하나 더 가져와짐)
            }

            Array.from(data).forEach((element) => {
                this.list.push(element);
            });

            this.page++;
        },

        async getProduct(idx) {
            console.log("idx = " + idx)
            let url = backend + `/market/${idx}`;
            console.log(url)
            const response = await axios.get(url, {
                withCredentials: true,
            });

            this.product = response.data.result;


            console.log("images : " + this.product.images)
        },

        async search(query) {

            if (this.lastSearchQuery !== query) {
                this.lastSearchQuery = query
                this.searchResults = []
                this.searchPage = 0
                this.isSearchResultEnd = false
            }

            let url = backend + `/market/search?page=${this.searchPage}&size=${this.size}&keyword=${query}`;
            const response = await axios.get(url, {
                withCredentials: true,
            });

            let data = response.data.result;

            if (data.length == 0) {
                // 더이상 불러올 데이터가 없음
                this.isSearchResultEnd = true;
                return;
            }

            if (this.size < data.length) {
                data.pop(); // 다음 요소가 더 있을 때 (slice: 사이즈보다 하나 더 가져와짐)
            }

            Array.from(data).forEach((element) => {
                this.searchResults.push(element);
            });

            this.searchPage++;
        }
    }
})