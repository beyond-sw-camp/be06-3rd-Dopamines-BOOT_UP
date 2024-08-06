import { defineStore } from "pinia"
import axios from "axios";

const backend = "http://localhost:8080";

export const usePostStore = defineStore("post", {
    state: () =>({
        
    }),
    
    actions : {
        //메서드
        async getPost(postIdx){
            console.log("postIdx : " + postIdx);

            let getPostResposneDto = {
                idx : 0,
                title : "",
                content: "",
                author : "",
                imageUrlList : [],
                created_at : "",
                likeCount : 0,
                freeCommentList : []
            };
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIxLCJlbWFpbCI6IuycoOyGoeyXsEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuycoOyGoeyXsCIsImlhdCI6MTcyMjkzMDc0OSwiZXhwIjoxNzIyOTQyNzQ5fQ.JhBcaVlZPPZ0R-wi8jvU5ue5i6C1Qwcp45tZGSGOxuE'

                }
            };
            
            try{
                let response = await axios.get(backend + "/free/post/read?idx=" + postIdx, config);
                if(response.status === 200){
                    console.log("포스트 조회 성공");
                    getPostResposneDto = response.data.result;
                    return getPostResposneDto;
                } else{
                    console.log("포스트 조회 실패");
                }
            } catch(error){
                console.log("포스트 조회 실패", error);
            }
        },
    }
})