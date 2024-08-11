import { defineStore } from 'pinia';
import axios from 'axios';

export const useOpenLikeStore = defineStore('freeLike', {
    state: () => ({
        idx: 0,
        postIdx: 0,
        userIdx: 0,
    }),

    actions: {
        async likePost() {
            try {
                const response = await axios.get('/open/like/post', {});
                let postlike = {
                    idx: response.data.response.idx,
                    postIdx: response.data.response.postIdx,
                    userIdx: JSON.parse(localStorage.getItem('user'))
                };
                console.log('hi', response.data.response);
                return postlike;
            } catch (error) {
                console.error('An error occurred:', error);
                throw error;
            }
        },

        async likeComment() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/open/like/comment', {
                    params: { idx: this.idx },
                });

                return response.data.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },

        async likeRecomment() {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios.get('/open/like/recomment', {
                    params: { idx: this.idx },
                });

                return response.data.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});