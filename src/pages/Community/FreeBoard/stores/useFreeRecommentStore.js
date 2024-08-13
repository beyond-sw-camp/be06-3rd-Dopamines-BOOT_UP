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
        async createRecomment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.post('/api/free/recomment/create', req, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                this.recomments.push(response.data.data);
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
        async updateRecomment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.put('/api/free/recomment/update', req, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // 업데이트된 대댓글 목록 업데이트
                const updatedRecommentIndex = this.recomments.findIndex((recomment) => recomment.id === response.data.data.id);
                this.recomments[updatedRecommentIndex] = response.data.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 삭제
        async deleteRecomment(user, idx) {
            this.isLoading = true;
            this.error = null;

            try {
                await axios.delete(`/api/free/recomment/delete?idx=${idx}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                // 삭제된 대댓글 목록에서 제거
                this.recomments = this.recomments.filter((recomment) => recomment.id !== idx);
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});