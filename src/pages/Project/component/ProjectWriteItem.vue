<script setup>

import {onMounted, ref, defineEmits} from "vue";
import {useProjectStore} from "@/pages/Project/store/useProjectStore";

const emit = defineEmits(['updateValues']);
const projectStore = useProjectStore();
const courseNum = ref(Array.from({ length: 10 }, (_, i) => i + 1));
const teamList = ref([]);
const selectedCourseNum = ref(null);
const selectedTeamIdx = ref(null); // 선택된 팀의 idx 값을 저장
const githubUrl = ref(""); // 입력된 GitHub URL을 저장할 변수
const selectedFile = ref(null); // 선택된 파일을 저장할 변수


const selectionChange = async (event) => {
  const selectedIndex = event.target.selectedIndex;
  teamList.value = await projectStore.getTeamList(selectedIndex + 1);
  selectedCourseNum.value = selectedIndex + 1;
  selectedTeamIdx.value = teamList.value.length > 0 ? teamList.value[0].idx : null; // 첫 번째 팀의 idx 값 저장

  emit('updateValues', { selectedCourseNum: selectedCourseNum.value, selectedTeam: selectedTeamIdx.value, githubUrl: githubUrl.value, file: selectedFile.value });
};

onMounted(async () => {
  teamList.value = await projectStore.getTeamList(1);
  selectedTeamIdx.value = teamList.value.length > 0 ? teamList.value[0].idx : null; // 첫 번째 팀의 idx 값 저장
});

const onGithubUrlChange = () => {
  emit('updateValues', { selectedCourseNum: selectedCourseNum.value, selectedTeam: selectedTeamIdx.value, githubUrl: githubUrl.value, file: selectedFile.value });
};

const onFileChange = (event) => {
  const file = event.target.files[0]; // 선택된 파일
  selectedFile.value = file ? file.name : null; // 파일 이름을 저장
  emit('updateValues', { selectedCourseNum: selectedCourseNum.value, selectedTeam: selectedTeamIdx.value, githubUrl: githubUrl.value, file: selectedFile.value });
};


</script>

<template>
  <label for="course-num">기수</label>
  <select class="coursenum-selection" @change="selectionChange">
    <option v-for="i in courseNum" v-bind:key="i">BEYOND {{ i }}기</option>
  </select>

  <label for="team">팀</label>
  <select class="coursenum-selection" v-model="selectedTeamIdx" @change="emit('updateValues', { selectedTeam: selectedTeamIdx, githubUrl })">
    <option v-for="team in teamList" :key="team.idx" :value="team.idx">{{ team.teamName }}</option>
  </select>

  <label for="github-url">github-url</label>
  <input type="text" id="github-url" name="github-url" v-model="githubUrl" @input="onGithubUrlChange">

  <label for="video">동영상 파일 업로드</label>
  <input type="file" id="video" name="video" @input="onFileChange">
</template>

<style scoped>
.coursenum-selection {
  width: 200px;
  background-color: #f4f4f4;
  color: #777;
  border-radius: 5px;
  height: 45px;
  border: 0;
}
select {
  border: 1px solid #ddd;
  border-radius: 0px;
  appearance: none;
  font: inherit;
  font-size: 1em;
  background: #fff url(@/assets/img/select.gif) calc(100% - 10px) center no-repeat;
  padding: 0 25px 0 10px;
  color: inherit;
}

<style scoped>
 .board-create-container {
   max-width: 1000px;
   width: 100%;
 }

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
select,
textarea,
input[type="file"] {
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

textarea {
  resize: vertical;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row label {
  margin-right: 10px;
}
</style>