import { defineStore } from 'pinia';
import axios from 'axios';

export const useFreeLikeStore = defineStore('freeLike', {
    state: () => ({
        likeCount: 0,
    }),

    actions: {
        async likePost(postIdx) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("likeStore likePost check postIdx: ", postIdx);
                const response = await axios.get(`/api/free/like/post?idx=${postIdx}`, {
                    withCredentials: true
                })

                return response.data.data; // 좋아요 결과 반환
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        async checkStatus(idx, boardType, tableType) {
            try{
                console.log("likeStore checkStatus: ", idx, boardType, tableType);
                const response = await axios.get(`/api/${boardType}/like/check?idx=${idx}&table=${tableType}`, {
                    withCredentials: true
                })

                if(tableType === "post") {
                    console.log("게시글임~!");
                }
                console.log(`${idx}의 response.data.result: `, response.data.result);
                return response.data.result;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            }
        },

        // 댓글 좋아요
        async likeComment(commentIdx) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("likeStore likePost check commentIdx: ", commentIdx);
                const response = await axios.get(`/api/free/like/comment?idx=${commentIdx}`, {
                    withCredentials: true
                });

                return response.data.data; // 좋아요 결과 반환
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        // 대댓글 좋아요
        async likeRecomment(reCommentIdx) {
            this.isLoading = true;
            this.error = null;

            try {
                console.log("likeStore likePost check reCommentIdx: ", reCommentIdx);
                const response = await axios.get(`/api/free/like/recomment?idx=${reCommentIdx}`, {
                    withCredentials: true
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