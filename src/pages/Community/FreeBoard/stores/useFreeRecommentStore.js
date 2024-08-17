import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeRecommentStore = defineStore('freeRecomment', {
    state: () => ({
        recomments: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        // 대댓글 생성
        async createRecomment(req) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("createRecomment: ", req);
                const response = await axios.post('/api/free/recomment/create', req, {
                    withCredentials: true
                });
                console.log(response);
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 목록 조회
        async fetchRecomments(idx, page = 0, size = 10) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/api/free/recomment', {
                    params: { idx, page, size },
                });

                this.recomments = response.data.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 수정
        async updateRecomment(req) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("updateRecomment: ", req);
                const response = await axios.put('/api/free/recomment/update', req, {
                    withCredentials: true
                });

                console.log(response);
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 삭제
        async deleteRecomment(idx) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("deleteRecomment: ", idx);
                await axios.delete(`/api/free/recomment/delete?idx=${idx}`, {
                    withCredentials: true
                });

            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});