import { defineStore } from 'pinia';
import axios from 'axios';

export const useNoticeStore = defineStore('notice', {
    state: () => ({
        id: 0,
        title: '',
        content: '',
        date: '',
        category: '',
        isPrivate: false,
        imageUrls: [],
        notices: [],
        totalNotices: 0,
        isLoading: false,
        error: null,
        lastSearchQuery: '',
        searchResults: [],
        searchPage: 0,
        isSearchResultEnd: false,
    }),

    actions: {
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

        async fetchNotice(id) {
            const response = await axios.get(`http://localhost:8080/notices?idx=${id}`);
            let notice = {
                idx: response.data.data.idx,
                title: response.data.data.title,
                content: response.data.data.content,
                date: response.data.data.date,
                category: response.data.data.category,
                isPrivate: response.data.data.isPrivate,
                imageUrls: response.data.data.imageUrls
            };

            console.log('notice', notice);
            return response;
        },

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

        async fetchAllNotices() {
            const response = await axios.get(`http://localhost:8080/notices/public`);
            console.log('notice~~response', response);
            if (response.data && Array.isArray(response.data.result.content)) {
                let posts = response.data.result.content.map(post => ({
                    idx: post.idx,
                    title: post.title,
                    content: post.content,
                    date: post.date,
                    category: post.category,
                    isPrivate: post.isPrivate,
                    imageUrls: post.imageUrls
                }));
                console.log('notice~~~~', posts);
                return posts;
            }
        },

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

        async search(title, content) {
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