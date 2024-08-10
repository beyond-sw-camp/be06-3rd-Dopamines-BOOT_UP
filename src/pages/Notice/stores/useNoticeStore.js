import { defineStore } from 'pinia';
import axios from 'axios';

export const useNoticeStore = defineStore('notice', {
    state: () => ({
        notices: [],
        notice: null,
        totalNotices: 0,
        isLoading: false,
        error: null,
    }),

    actions: {
        // 공지사항 작성 엑시오스
        async createNotice(req) {
            this.isLoading = true;
            try {
                const response = await axios.post('http://localhost:8080/notices', req);
                this.notices.push(response.data.data);
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 공지사항 조회 엑시어스
        async fetchNotice(id) {
            this.isLoading = true;
            try {
                const response = await axios.get(`http://localhost:8080/notices/${id}`);
                this.notice = response.data.data;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 비공개 공지사항 조회 엦시어스
        async fetchAllPrivateNotices(page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/private', {
                    params: { page, size },
                });
                this.notices = response.data.data.content;
                this.totalNotices = response.data.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 공개 공지사항 조회 axios
        async fetchAllPublicNotices(page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/public', {
                    params: { page, size },
                });
                this.notices = response.data.data.content;
                this.totalNotices = response.data.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 카테고리별 공지사항 조회 axios
        async fetchNoticesByCategory(category, page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/category', {
                    params: { category, page, size },
                });
                this.notices = response.data.data.content;
                this.totalNotices = response.data.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 날짜 범위로 공지사항 조회하는 axios
        async fetchNoticesByDateRange(startDate, endDate, page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/date', {
                    params: { startDate, endDate, page, size },
                });
                this.notices = response.data.data.content;
                this.totalNotices = response.data.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 기준으로 공지사항 검색 axios
        async findNoticesByCriteria(isPrivate, category) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/notices/criteria', {
                    params: { isPrivate, category },
                });
                this.notices = response.data.content;
                this.totalNotices = response.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 제목 및 내용으로 공지사항 검색 axios
        async search(title, content){
            const query = `${title} ${content}`;
            if (this.lastSearchQuery !== query) {
                this.lastSearchQuery = query;
                this.searchResults = [];
                this.searchPage = 0;
                this.isSearchResultEnd = false;
            }

            let url = `/api/notice/search?page=${this.searchPage}&size=10&keyword=${query}`;
            const response = await axios.get(url);

            let data = response.data.result;

            if (data.length === 0) {
                this.isSearchResultEnd = true;
                return;
            }

            if (data.length > 10) {
                data.pop();
            }

            this.searchResults.push(...data);
            this.searchPage++;
        },

        // 공지사항 수정
        async updateNotice(id, req) {
            this.isLoading = true;
            try {
                const response = await axios.put(`http://localhost:8080/notices/${id}`, req);
                const updatedIndex = this.notices.findIndex((n) => n.id === id);
                if (updatedIndex !== -1) {
                    this.notices[updatedIndex] = response.data.data;
                }
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },

        // 공지사항 삭제
        async deleteNotice(id) {
            this.isLoading = true;
            try {
                await axios.delete(`http://localhost:8080/notices/${id}`);
                this.notices = this.notices.filter((n) => n.id !== id);
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
        },
    },
});