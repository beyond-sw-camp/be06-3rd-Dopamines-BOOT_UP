// src/pages/Community/FreeBoard/stores/useFreeCommentCountStore.js
import { defineStore } from 'pinia';
import { useOpenCommentStore } from './useOpenCommentStore';
import { useFreeRecommentStore } from './useFreeRecommentStore';

export const useFreeCommentsCountStore = defineStore('freeCommentCount', {
    state: () => ({
        totalCommentCount: 0,
        isLoading: false,
        error: null,
    }),

    actions: {
        async fetchTotalCommentCount(postIdx) {
            this.isLoading = true;
            this.error = null;

            try {
                const commentStore = useOpenCommentStore();
                const recommentStore = useFreeRecommentStore();

                await commentStore.fetchComments(postIdx);
                await recommentStore.fetchRecomments(postIdx);

                const commentCount = commentStore.comments.length;
                const recommentCount = recommentStore.recomments.length;

                this.totalCommentCount = commentCount + recommentCount;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
            } finally {
                this.isLoading = false;
            }
        },
    },
});