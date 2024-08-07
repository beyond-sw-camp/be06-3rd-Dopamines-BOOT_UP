import { defineStore } from "pinia";
import axios from "axios";

const authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjIwLCJlbWFpbCI6IuyEnOyLnO2YhEB0ZXN0LmNvbSIsInJvbGUiOiJST0xFX1VTRVIiLCJuaWNrbmFtZSI6IuyEnOyLnO2YhCIsImlhdCI6MTcyMjk5Mzg1OSwiZXhwIjoxNzIzMDA1ODU5fQ.g2SOJkzMw5iVLOTVtXUxILaS6x0GLaBvxphLGDq-mgk";

export const useProjectStore = defineStore("project", {
    state: () => (
          {
              projectList: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: [] },
              postReq: { idx:0, title: "", content: "", images: []}

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
                const response = await axios.get(
                    `api/project/create`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": authorization,
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
        async getTeamList(idx) {
            const response = await axios.get(
                `api/project/team-list`, idx
            )

            console.log(response);

            return this.projectList;
        }
    }
});