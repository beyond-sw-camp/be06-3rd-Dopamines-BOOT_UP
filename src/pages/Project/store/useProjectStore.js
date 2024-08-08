import { defineStore } from "pinia";
import axios from "axios";

export const useProjectStore = defineStore("project", {
    state: () => (
        {
            projectList: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: [] },
            postReq: { idx:0, title: "", content: ""},
            teamList: { idx: 0, teamName: []},
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
        async uploadFile(file) {
            const formData = new FormData();
            const fileName = file.getName;
            const blob = new Blob([file], { type: "application/octet-stream" });

            formData.append('file', blob, fileName);

            const response = await axios.post(
                "/api/project/upload-image",
                formData, {
                    isCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    }
                });
            console.log(response);

            return response.data.result;
        },
        async createPost(postReq) {
            try{
                const response = await axios.post(
                    `/api/project/create`, postReq, {
                        isCredential: true
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
        }
    }
});
