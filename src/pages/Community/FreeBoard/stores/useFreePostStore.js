import { defineStore } from 'pinia';
import axios from '@/config/axiosConfig';

export const useFreePostStore = defineStore('post', {
    state: () => ({
        idx: 0,
        title: '',
        content: '',
        author: '',
        imageUrlList: [],
        created_at: new Date,
        likeCount: 0,
        posts: [],
    }),
    actions: {
        async createPost(postData) {
            try {
                const response = await axios.post('/free/post/create', postData);
                return response.data;
            } catch (error) {
                console.error('Failed to create post:', error);
                throw error;
            }
        },
        async uploadImage(files) {
            try {
                const formData = new FormData();
                files.forEach(file => formData.append('files', file));
                const response = await axios.post('/free/post/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                return response.data;
            } catch (error) {
                console.error('Failed to upload images:', error);
                throw error;
            }
        },
        async readPost(idx) {
            try {
                const response = await axios.get(`/free/post/read?idx=${idx}`);
                this.idx = response.data.idx;
                this.title = response.data.title;
                this.content = response.data.content;
                this.author = response.data.author;
                this.imageUrlList = response.data.imageUrlList;
                this.created_at = response.data.created_at;
                this.likeCount = response.data.likeCount;
                this.freeCommentList = response.data.freeCommentList;
                return response.data;
            } catch (error) {
                console.error('Failed to read post:', error);
                throw error;
            }
        },
        async readAllPosts(page, size) {
            try {
                const response = await axios.get(`/free/post/read-all?page=${page}&size=${size}`);
                if (response.data && Array.isArray(response.data.result)) {
                    this.posts = response.data.result.map(post => ({
                        idx: post.idx,
                        title: post.title,
                        content: post.content,
                        author: post.author,
                        imageUrlList: post.imageUrlList,
                        created_at: post.created_at,
                        likeCount: post.likeCount,
                        freeCommentList: post.freeCommentList
                    }));
                } else {
                    console.error('Unexpected response format:', response.data);
                    this.posts = [];
                }
                return this.posts;
            } catch (error) {
                console.error('Failed to read all posts:', error);
                throw error;
            }
        },
        async updatePost(postData) {
            try {
                const response = await axios.put('/free/post/update', postData);
                return response.data;
            } catch (error) {
                console.error('Failed to update post:', error);
                throw error;
            }
        },
        async deletePost(idx) {
            try {
                const response = await axios.delete(`/free/post/delete?idx=${idx}`);
                return response.data;
            } catch (error) {
                console.error('Failed to delete post:', error);
                throw error;
            }
        },
        async search(query) {
            if (this.lastSearchQuery !== query) {
                this.lastSearchQuery = query;
                this.searchResults = [];
                this.searchPage = 0;
                this.isSearchResultEnd = false;
            }

            let url = `/api/free/search?page=${this.searchPage}&size=10&keyword=${query}`;
            const response = await axios.get(url);

            let data = response.data.result;

            if (data.length === 0) {
                this.isSearchResultEnd = true;
                return;
            }

            if (data.length > 10) {
                data.pop();
            }

            this.searchResults.push(...data);
            this.searchPage++;
        },
    },
});