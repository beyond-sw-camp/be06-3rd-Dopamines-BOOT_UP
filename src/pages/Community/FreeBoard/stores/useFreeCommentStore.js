import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeCommentStore = defineStore('freeComment', {
    state: () => ({
        comments: [],
        isLoading: false,
        error: null,
    }),

    actions: {
        async createComment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.post('http://localhost:8080/free/comment/create', req, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                this.comments.push(response.data.data);
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 댓글 목록 조회
        async fetchComments(idx, page = 0, size = 10) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('http://localhost:8080/free/comment', {
                    params: { idx, page, size },
                });

                this.comments = response.data.data;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 댓글 수정
        async updateComment(user, req) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.put('http://localhost:8080/free/comment/update', req, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                const updatedCommentIndex = this.comments.findIndex((comment) => comment.id === response.data.data.id);
                this.comments[updatedCommentIndex] = response.data.data;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 댓글 삭제
        async deleteComment(user, idx) {
            this.isLoading = true;
            this.error = null;

            try {
                await axios.delete(`http://localhost:8080/free/comment/delete?idx=${idx}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                this.comments = this.comments.filter((comment) => comment.id !== idx);
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});