import { defineStore } from "pinia";
import axios from "axios";

// 전역 저장소 생성
export const useCommunityStore = defineStore('community', {
    state: () => (
        {
            postDetail: { idx:0, title: "", content: "", author: "", imageUrlList: [], created_at: "", likeCount: 0, freeCommentList: []},

        }
    ),
    actions: {
        async getPostDetail(idx) {
            const response = await axios.get(
                `http://localhost:8080/free/post/read?idx=${idx}`,{ // 쿠키 포함
                    headers: {
                        // 'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk'
                    }
                }
            );

            console.log(response);

            this.postDetail = response.data.result;
        },

        async createPost(formData) {
            try{
                const response = await axios.post(
                    `http://localhost:8080/free/post/create`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk"
                        }
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
                `http://localhost:8080/free/post/update`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjEsImVtYWlsIjoic3RhcmJpbjc3ODhAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfVEVNUE9SQVJZX1VTRVIiLCJuaWNrbmFtZSI6IuydteuqhTEiLCJpYXQiOjE3MjI5MzA5NTcsImV4cCI6MTcyMjk0Mjk1N30.N4PGUmQKS2OXDPC0-zKeRG_JMYm3OUZVPktCaiFQk_4"
                    }
                }
            )

            console.log("==updatePost==");
            console.log(response);
            console.log("==============");
        }


    }
});