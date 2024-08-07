import { defineStore } from 'pinia';
import axios from 'axios';

const backend_url = '/open/post';

export const useOpenPostStore = defineStore('openPost', {
    state: () => ({
        posts: [],
        post: null,
        totalPosts: 0,
        isLoading: false,
        error: null,
    }),

    actions: {
        async performRequest(method, url, data = null, headers = {}) {
            this.isLoading = true;
            this.error = null;

            try {
                const response = await axios({
                    method,
                    url: `${backend_url}${url}`,
                    data,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        ...headers
                    }
                });
                return response.data;
            } catch (error) {
                this.error = error.response?.data?.message || 'An error occurred';
                throw error;
            } finally {
                this.isLoading = false;
            }
        },

        async createPost(user, req, files) {
            const formData = new FormData();
            formData.append('req', new Blob([JSON.stringify(req)], { type: 'application/json' }));
            files.forEach(file => formData.append('files', file));

            const headers = { Authorization: `Bearer ${user.token}` };
            const data = await this.performRequest('post', '/create', formData, headers);
            this.posts.push(data.data);
        },

        async readPost(user, idx) {
            const headers = { Authorization: `Bearer ${user.token}` };
            const data = await this.performRequest('get', `/read?idx=${idx}`, null, headers);
            this.post = data.data;
        },

        async readAllPosts(page = 0, size = 10) {
            const data = await this.performRequest('get', `/read-all?page=${page}&size=${size}`);
            this.posts = data.data;
            this.totalPosts = data.total;
        },

        async updatePost(user, req, files) {
            const formData = new FormData();
            formData.append('req', new Blob([JSON.stringify(req)], { type: 'application/json' }));
            files.forEach(file => formData.append('files', file));

            const headers = { Authorization: `Bearer ${user.token}` };
            const data = await this.performRequest('put', '/update', formData, headers);

            const updatedPostIndex = this.posts.findIndex(post => post.id === data.data.id);
            if (updatedPostIndex !== -1) {
                this.posts[updatedPostIndex] = data.data;
            }
        },

        async deletePost(user, idx) {
            const headers = { Authorization: `Bearer ${user.token}` };
            await this.performRequest('delete', `/delete?idx=${idx}`, null, headers);
            this.posts = this.posts.filter(post => post.id !== idx);
        },

        async searchPosts(user, page = 0, size = 10, keyword = '') {
            const headers = { Authorization: `Bearer ${user.token}` };
            const data = await this.performRequest('get', `/search?page=${page}&size=${size}&keyword=${keyword}`, null, headers);
            this.posts = data.data;
            this.totalPosts = data.total;
        },
    },
});