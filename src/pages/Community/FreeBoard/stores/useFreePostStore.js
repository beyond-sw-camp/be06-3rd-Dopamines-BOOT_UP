import { defineStore } from 'pinia';
import axios from 'axios';

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
        freeCommentList: []
    }),
    actions: {
        async createPost(postData) {
            try {
                const response = await axios.post('/api/free/post/create', postData);
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
                const response = await axios.post('/api/free/post/upload-image', formData, {
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
            const response = await axios.get(`/api/free/post/read?idx=${postId}`);
            console.log('response', response);

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
                freeCommentList: response.data.result.freeCommentList
            };
            return readResult;
        },
        async readAllPosts(page, size) {
            const response = await axios.get(`/api/free/post/read-all?page=${page}&size=${size}`, {withCredentials: true});
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
                const response = await axios.put('/api/free/post/update', postData);
                return response.data;
            } catch (error) {
                console.error('Failed to update post:', error);
                throw error;
            }
        },
        async deletePost(idx) {
            try {
                const response = await axios.delete(`/api/free/post/delete?idx=${idx}`);
                return response.data;
            } catch (error) {
                console.error('Failed to delete post:', error);
                throw error;
            }
        },
        async search(page, size, query) {
            try {
                const response = await axios.get(`/api/free/post/search?page=${page}&size=${size}&keyword=${query}&fields=title,content`, { withCredentials: true });
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
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('No search results found:', error);
                    this.isSearchResultEnd = true;
                } else {
                    console.error('Failed to search:', error);
                    throw error;
                }
            }
        },
    },
});