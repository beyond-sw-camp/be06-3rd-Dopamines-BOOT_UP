// import { defineStore } from 'pinia';
// import axios from 'axios';
//
// export const useOpenCommentStore = defineStore('freeComment', {
//     state: () => ({
//         idx: 0,
//         openPostIdx: 0,
//         content: '',
//         author: '',
//         createdAt: null,
//         likeCount: 0,
//         recommentList: [],
//     }),
//
//     actions: {
//         async createComment(user, req) {
//             let userIdx = JSON.parse(localStorage.getItem('user'));
//             const response = await axios.post('/open/comment/create', req);
//             console.log('response', response);
//             let comment = {
//                 idx: userIdx.idx,
//                 openPostIdx: response.data.response.openPostIdx,
//                 content: response.data.response.content,
//                 author: response.data.response.author,
//                 createdAt: response.data.response.createdAt,
//                 likeCount: response.data.response.likeCount,
//                 recommentList: response.data.response.recommentList,
//             };
//             console.log('comment', comment);
//         },
//
//         async updateComment(user, req) {
//             this.isLoading = true;
//             this.error = null;
//
//             try {
//                 const response = await axios.put('http://localhost:8080/free/comment/update', req, {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                 });
//                 const updatedCommentIndex = this.comments.findIndex((comment) => comment.id === response.data.data.id);
//                 this.comments[updatedCommentIndex] = response.data.data;
//             } catch (error) {
//                 this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
//             } finally {
//                 this.isLoading = false;
//             }
//         },
//
//         async deleteComment(user, idx) {
//             this.isLoading = true;
//             this.error = null;
//
//             try {
//                 await axios.delete(`http://localhost:8080/free/comment/delete?idx=${idx}`, {
//                     headers: {
//                         Authorization: `Bearer ${user.token}`,
//                     },
//                 });
//
//                 this.comments = this.comments.filter((comment) => comment.id !== idx);
//             } catch (error) {
//                 this.error = error.response && error.response.data ? error.response.data.message : 'An error occurred';
//             } finally {
//                 this.isLoading = false;
//             }
//         },
//     },
// });