import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeLikeStore = defineStore('freeLike', {
    state: () => ({
        likeCount: 0,
    }),

    actions: {
        async likePost(user, postId) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('http://localhost:8080/free/like/post', {
                    params: { idx: postId },
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                return response.data.data; // 좋아요 결과 반환
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 댓글 좋아요
        async likeComment(user, commentId) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('http://localhost:8080/free/like/comment', {
                    params: { idx: commentId },
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                return response.data.data; // 좋아요 결과 반환
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 좋아요
        async likeRecomment(user, recommentId) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('http://localhost:8080/free/like/recomment', {
                    params: { idx: recommentId },
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });

                return response.data.data; // 좋아요 결과 반환
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});