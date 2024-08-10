import { defineStore } from 'pinia';
import axios from '@/config/axiosConfig';

export const useFreePostStore = defineStore('post', {
    state: () => ({
        idx: 0,
        title: '',
        content: '',
        author: '',
        imageUrlList: [],
        created_at: '',
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
        async readPost(postId) {
            const response = await axios.get(`/open/post/read?idx=${postId}`);
            console.log('response', response);
            // let values = JSON.parse(localStorage.getItem('user'));

            let readResult = {
                idx: response.data.result.idx,
                title: response.data.result.title,
                content: response.data.result.content,
                author: response.data.result.author,
                imageUrlList: response.data.result.imageUrlList,
                created_at: response.data.result.created_at,
                likeCount: response.data.result.likeCount,
                commentCount: response.data.result.commentCount,
                boardIdx: response.data.result.boardIdx,
                posts: [],
            };
            return readResult;
        },
        async readAllPosts(page, size) {
            const response = await axios.get(`/free/post/read-all?page=${page}&size=${size}`, {withCredentials: true});
            console.log('response', response);
            if (response.data && Array.isArray(response.data.result)) {
                let posts = response.data.result.map(post => ({
                    idx: post.idx,
                    title: post.title,
                    content: post.content,
                    author: post.author,
                    created_at: post.created_at,
                }));
                console.log('posts', posts);
                return posts;
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