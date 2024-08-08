import { defineStore } from "pinia";
import axios from "axios";

// const authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjMxLCJlbWFpbCI6ImFkbWluMDJAYWRtaW4uY29tIiwicm9sZSI6IlJPTEVfQURNSU4iLCJuaWNrbmFtZSI6Iuq0gOumrOunpOuLiOyggDAyIiwiaWF0IjoxNzIzMDQxOTI4LCJleHAiOjE3MjMwNTM5Mjh9.q0xiehAN2lFsKUJRVBJvBC6p757wVrLH_UWGyinNtus";

export const useProjectStore = defineStore("project", {
    state: () => (
          {
              projectList: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: [] },
              postReq: { idx:0, title: "", content: "", images: []},
              teamList: [""],
          }
    ),
    actions: {
        async getProjectList() {
            const response = await axios.get(
                `api/project/read-all`
            )

            console.log(response);
            this.projectList = response.data.result;

            return this.projectList;
        },
        async createPost(formData) {
            try{
                const response = await axios.post(
                    `/api/project/create`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            // "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk"
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
        async getTeamList(courseNum) {
            console.log(courseNum)
            try{
                const response = await axios.get(
                    `http://localhost:8080/project/team-list?courseNum=${courseNum}`, {
                        // headers: {
                        //     'Content-type': 'application/json',
                        //     'Authorization': authorization
                        // }
                    }
                )

                console.log(response);
                this.teamList = response.data.result;
            } catch (e) {
                console.log(e)
            }


            return this.teamList;
        }
    }
});