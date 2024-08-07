import { defineStore } from "pinia";
import axios from "axios";

export const useProjectStore = defineStore("project", {
    state: () => (
          {
              projectList: { idx: 0, title: "", contents: "", courseNum: "", gitUrl: "", sourceUrl: "", teamName: "", students: [] }

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
        }
    }
});