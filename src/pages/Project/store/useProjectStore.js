import { defineStore } from "pinia";
import axios from "axios";

export const useProjectStore = defineStore("project", {
    state: () => (
        {
            projectList: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: [], role: "" },
            projectDetail: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: []},
            postReq: { idx:0, title: "", content: ""},
            teamList: { idx: 0, teamName: []},
        }
    ),
    actions: {
        async getProjectList() {
            try {
                const response = await axios.get(
                    `/api/project/read-all`, {
                        withCredentials: true
                    }
                )

                console.log(response);
                this.projectList = response.data.result;

                return this.projectList;
            } catch (error) {
                console.log(error);
            }
        },
        async uploadFile(file) {
            const formData = new FormData();
            const type = file.type;
            console.log("type: ", type);
            const blob = new Blob([file], { type: type });

            formData.append('file', blob, file.name);

            const response = await axios.post(
                "/api/project/upload-image",
                formData, {
                    withCredentials: true,
                });
            console.log(response);

            return response.data.result;
        },
        async createPost(postReq) {
            try{
                const response = await axios.post(
                    `/api/project/create`, postReq, {
                        withCredential: true
                    }
                )
                console.log(response);

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
                    `/api/project/team-list?courseNum=${courseNum}`, {
                    }
                )

                console.log(response);
                this.teamList = response.data.result;
            } catch (e) {
                console.log(e)
            }

            return this.teamList;
        },

        async getProjectDetail(idx) {
            console.log("===?===");
            console.log(idx)
            console.log("=======");
            try{
                const response = await axios.get(
                    `/api/project/read?idx=${idx}`, {
                    }
                )

                console.log(response);
                this.projectDetail = response.data.result;
            } catch (e) {
                console.log(e)
            }

            return this.projectDetail;
        }
    }
});
