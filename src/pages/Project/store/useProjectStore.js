import {defineStore} from "pinia";
import axios from "axios";

const useProjectStore = defineStore("project", {
  state: () => ({
      idx: 1,
      title: "",
      contents: "",
      courseNum: 0,
      sourceUrl: "",
      team: "",
  }),
    actions: {
        async getProjectDetail(){
            const response = await axios.get(
                "http://192.168.0.50:8080/project/read-all"
            )
            this.idx = response.data.idx;
            this.title = response.data.title;
            this.contents = response.data.contents;
            this.courseNum = response.data.courseNum;
            this.sourceUrl = response.data.sourceUrl;
            this.team = response.data.team;
        }
    }
});
export default useProjectStore;