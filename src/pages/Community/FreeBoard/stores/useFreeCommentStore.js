import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeCommentStore = defineStore('freeComment', {
    state: () => ({
        "idx": 0,
        "content": ""
    }),

    actions: {
        // 댓글 작성
        async createComment(commentReq) {
            this.isLoading = true;
            this.error = null;
            let userIdx = JSON.parse(localStorage.getItem('user')).userIdx;
            const createCommentData = {
                freePostIdx: commentReq.postIdx,
                content: commentReq.content,
                userIdx: userIdx,
            };
            try {
                const response = await axios.post('/api/free/comment/create', createCommentData);
                return response.data;
            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        // 댓글 목록 조회
        async fetchComments(idx, page = 0, size = 10) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/api/free/comment', {
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
                const response = await axios.put('/api/free/comment/update', req, {
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
        async deleteComment(idx) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log(idx);
                const response = await axios.delete(`/api/free/comment/delete?idx=${idx}`);
                // this.comments = this.comments.filter((comment) => comment.id !== idx);
                console.log(response);

            } catch (error) {
                this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});