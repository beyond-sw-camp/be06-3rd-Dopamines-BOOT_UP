import { defineStore } from 'pinia';
import axios from '@/config/axiosConfig';

export const useOpenPostStore = defineStore('post', {
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
                const response = await axios.post('/open/post/create', postData);
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
                const response = await axios.post('/open/post/upload-image', formData, {
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
            console.log('readResult', readResult);
            return readResult;

        },
        async readAllPosts(page, size) {
            const response = await axios.get(`/open/post/read-all?page=${page}&size=${size}`,
                {withCredentials: true});
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
                const response = await axios.put('/open/post/update', postData);
                return response.data;
            } catch (error) {
                console.error('Failed to update post:', error);
                throw error;
            }
        },
        async deletePost(idx) {
            try {
                const response = await axios.delete(`/open/post/delete?idx=${idx}`);
                return response.data;
            } catch (error) {
                console.error('Failed to delete post:', error);
                throw error;
            }
        },
        async search(page, size, query) {
            try {
                const response = await axios.get(`/open/post/search?page=${page}&size=${size}&keyword=${query}&fields=title,content`, { withCredentials: true });
                console.log('open response', response);
                if (response.data && Array.isArray(response.data.result)) {
                    let posts = response.data.result.map(post => ({
                        idx: post.idx,
                        title: post.title,
                        content: post.content,
                        author: post.author,
                        created_at: post.created_at,
                    }));
                    console.log('open posts', posts);
                    return posts;
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No search results found:', error);
                    this.isSearchResultEnd = true;
                } else {
                    console.error('Failed to search:', error);
                    throw error;
                }
            }
        }
    },
});