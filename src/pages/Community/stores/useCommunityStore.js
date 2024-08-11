import { defineStore } from "pinia";
import axios from "axios";

// 전역 저장소 생성
export const useCommunityStore = defineStore('community', {
    state: () => (
        {
            postDetail: { idx:0, title: "", content: "", author: "", imageUrlList: [], created_at: "", likeCount: 0, freeCommentList: []},
            postReq: { idx:0, title: "", content: "", images: []}
        }
    ),
    actions: {
        async getPostDetail(idx, boardType) {
            const response = await axios.get(
                `/api/${boardType}/post/read?idx=${idx}`,{
                    withCredential: true,
                }
            );

            console.log(response);

            this.postDetail = response.data.result;

            return this.postDetail;
        },

        async createPost(formData, boardType) {
            try{
                const response = await axios.post(
                    `/api/${boardType}/post/create`, formData, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredential: true,
                    }
                )

                console.log("==createPost==");
                console.log(response);
                console.log("==============");

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },

        async updatePost(formData, boardType) {
            const response = await axios.put(
                `/api/${boardType}/post/update`, formData, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredential: true,
                }
            )

            console.log("==updatePost==");
            console.log(response);
            console.log("==============");
        },
    }
});