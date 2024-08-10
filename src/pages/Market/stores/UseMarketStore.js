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
        postReq: { idx: 0, title: "", content: "", images: [] },
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

        // async search(query) {
        //
        //     if (this.lastSearchQuery !== query) {
        //         this.lastSearchQuery = query
        //         this.searchResults = []
        //         this.searchPage = 0
        //         this.isSearchResultEnd = false
        //     }
        //
        //     let url = `/market/search?page=${this.searchPage}&size=${this.size}&keyword=${query}`;
        //     const response = await axios.get(url, {
        //         withCredentials: true,
        //     });
        //
        //     let data = response.data.result;
        //
        //     if (data.length == 0) {
        //         // 더이상 불러올 데이터가 없음
        //         this.isSearchResultEnd = true;
        //         return;
        //     }
        //
        //     if (this.size < data.length) {
        //         data.pop(); // 다음 요소가 더 있을 때 (slice: 사이즈보다 하나 더 가져와짐)
        //     }
        //
        //     Array.from(data).forEach((element) => {
        //         this.searchResults.push(element);
        //     });
        //
        //     this.searchPage++;
        // },
        async search(page, size, query) {
            try {
                const response = await axios.get(`/market/search?page=${page}&size=${size}&keyword=${query}`, { withCredentials: true });
                console.log('market response', response);
                if (response.data && Array.isArray(response.data.result)) {
                    let posts = response.data.result.map(post => ({
                        idx: post.idx,
                        title: post.title,
                        content: post.content,
                    }));
                    console.log('market posts', posts);
                    return posts;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No search results found:', error);
                    this.isSearchResultEnd = true;
                } else {
                    console.error('Failed to search:', error);
                    throw error;
                }
            }
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
        }

    }
})