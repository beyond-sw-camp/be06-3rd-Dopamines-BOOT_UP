import { defineStore } from 'pinia';
import axios from '@/config/axiosConfig';

export const useFreePostStore = defineStore('post', {
    state: () => ({
        posts: [],
        post: null,
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
                this.post = response.data;
                return response.data;
            } catch (error) {
                console.error('Failed to read post:', error);
                throw error;
            }
        },
        async readAllPosts(page, size) {
            try {
                const response = await axios.get(`/free/post/read-all?page=${page}&size=${size}`);
                this.posts = response.data;
                return response.data;
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
        async searchPosts(page, size, keyword) {
            try {
                const response = await axios.get(`/free/post/search?page=${page}&size=${size}&keyword=${keyword}`);
                this.posts = response.data;
                return response.data;
            } catch (error) {
                console.error('Failed to search posts:', error);
                throw error;
            }
        },
    },
});
