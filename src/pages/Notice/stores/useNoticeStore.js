import { defineStore } from 'pinia';
import axios from 'axios';

export const useNoticeStore = defineStore('notice', {
    state: () => ({
        postDetail: { id:0, title: "", content: "", date: "", category: "", isPrivate: false, imageUrls: []},
        postReq: { id:0, title: "", content: "", category: [], isPrivate: false, imageUrls: []}
    }),

    actions: {
        // 공지사항 작성 엑시오스
        async createNotice(formData) {
            try{
                const response = await axios.post(
                    `notice/create`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk"
                        }
                    }
                )

                console.log("==createNotice==");
                console.log(response);
                console.log("==============");

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        // 공지사항 조회 엑시어스
        async getNoticeDetail(id) {
            const response = await axios.get(
                `api/notice/idx=${id}`,{ // 쿠키 포함
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk'
                    }
                }
            );

            console.log(response);

            this.postDetail = response.data.result;
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
        async findNoticesByCriteria(isPrivate, category, page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/notices/criteria', {
                    params: { isPrivate, category, page, size },
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
        async findNoticesByTitleAndContent(title, content, page = 0, size = 10) {
            this.isLoading = true;
            try {
                const response = await axios.get('http://localhost:8080/notices/notices/search', {
                    params: { title, content, page, size },
                });
                this.notices = response.data.content;
                this.totalNotices = response.data.totalElements;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : error.message;
            } finally {
                this.isLoading = false;
            }
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