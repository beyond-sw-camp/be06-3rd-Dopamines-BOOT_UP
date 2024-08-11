import { defineStore } from 'pinia';
// import axios from '@/config/axiosConfig';
import axios from 'axios';

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
        openCommentList: [],
    }),
    actions: {
        async createPost(postData) {
            try {
                const response = await axios.post('/api/open/post/create', postData);
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
                const response = await axios.post('/api/open/post/upload-image', formData, {
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
            try {
                const response = await axios.get(`/api/open/post/read/${postId}`);
                let values = JSON.parse(localStorage.getItem('user'));
                this.idx = response.data.idx;
                this.title = response.data.title;
                this.content = response.data.content;
                this.author = values.author;
                this.imageUrlList = response.data.imageUrlList;
                this.created_at = response.data.created_at;
                this.likeCount = response.data.likeCount;
                this.commentCount = response.data.commentCount;
                this.boardIdx = response.data.boardIdx;
                this.$state.idx = postId;
                this.author = values.userIdx;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('해당 게시글을 찾을 수 없습니다.:', error);
                } else {
                    console.error('게시글을 가져오는 데에 실패하였습니다.:', error);
                }
                throw error;
            }
        },
        async readAllPosts(page, size) {
            try {
                const response = await axios.get(`/api/open/post/read-all?page=${page}&size=${size}`);
                let values = JSON.parse(localStorage.getItem('user'));
                if (response.data && Array.isArray(response.data.result)) {
                    this.posts = response.data.result.map(post => ({
                        idx: post.idx,
                        title: post.title,
                        content: post.content,
                        author: values.userIdx,
                        imageUrlList: post.imageUrlList,
                        created_at: post.created_at,
                        likeCount: post.likeCount,
                        commentCount: post.commentCount,
                        boardIdx: post.boardIdx,
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
                const response = await axios.put('/api/open/post/update', postData);
                return response.data;
            } catch (error) {
                console.error('Failed to update post:', error);
                throw error;
            }
        },
        async deletePost(idx) {
            try {
                const response = await axios.delete(`/api/open/post/delete?idx=${idx}`);
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