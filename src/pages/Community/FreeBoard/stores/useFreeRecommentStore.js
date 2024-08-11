import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeRecommentStore = defineStore('freeRecomment', {
    state: () => ({
        idx: 0,
        freePostIdx: 0,
        commentIdx: 0,
        content: '',
        author: '',
        createdAt: '',
        likeCount: 0,
    }),

    actions: {
        // 대댓글 생성
        async createRecomment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.post('http://localhost:8080/free/recomment/create', req, {
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
        async fetchRecomments(commentId) {
            try {
                const response = await axios.get(`http://localhost:8080/free/recomment?commentId=${commentId}&page=0&size=10`);
                this.recomments[commentId] = response.data.result;
                return response.data.result;
            } catch (error) {
                console.error('Failed to fetch recomments:', error);
                throw error;
            }
        },

        // 대댓글 수정
        async updateRecomment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.put('http://localhost/free/recomment/update', req, {
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
                await axios.delete(`http://localhost:8080/free/recomment/delete?idx=${idx}`, {
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
