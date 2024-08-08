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
        async getPostDetail(idx) {
            const response = await axios.get(
                `/api/free/post/read?idx=${idx}`,{ // 쿠키 포함
                    isCredential: true,
                }
            );

            console.log(response);

            this.postDetail = response.data.result;
        },

        async createPost(formData) {
            try{
                const response = await axios.post(
                    `/api/free/post/create`, formData, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        isCredential: true,
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

        async updatePost(formData) {
            const response = await axios.put(
                `/api/free/post/update`, formData, {
                    isCredential: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )

            console.log("==updatePost==");
            console.log(response);
            console.log("==============");
        }


    }
});