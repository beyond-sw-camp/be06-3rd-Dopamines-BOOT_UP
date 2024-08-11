import { defineStore } from 'pinia';
import { useFreeCommentStore } from './useFreeCommentStore';
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
                const commentStore = useFreeCommentStore();
                const recommentStore = useFreeRecommentStore();

                await commentStore.fetchComments(postIdx);
                await recommentStore.fetchRecomments(postIdx);

                // Sum the counts
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