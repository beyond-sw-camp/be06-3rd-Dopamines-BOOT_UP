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
        lastSearchQuery: "",
        postReq: { idx: 0, title: "", content: "", images: [], price: 0 },
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

            return true;
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
        },

        async createChatRoom() {

            console.log("author idx : " + this.product.authorIdx)

            let chatRoomReq = {
                receiverIdx: this.product.authorIdx,
                marketPostIdx: this.product.idx
            }

            await axios.post(
                backend + '/chat/room',
                chatRoomReq,
                { withCredentials: true } // 쿠키 전달
            );

            return true
        },

        async setOrDeleteMarked(idx) {
            let url = backend + `/marked/${idx}`;
            await axios.put(url, {
                withCredentials: true,
            });
        },

        async createPost(postReq) {
            console.log(postReq)

            const formData = new FormData();
            postReq.images.forEach((image) => {
                formData.append('images', image.file);
            });

            // JSON 데이터를 문자열로 변환하여 추가
            const req = {
                title: postReq.title,
                content: postReq.content,
                price: postReq.price
            };
            formData.append('req', new Blob([JSON.stringify(req)], { type: "application/json" }));

            try {
                const response = await axios.post('/api/market', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                console.log('Response:', response.data);
                return true

            } catch (error) {
                console.error('Error:', error);
                return false
            }

        }

    }
})