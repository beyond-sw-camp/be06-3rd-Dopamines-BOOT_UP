<script setup>

import {ref} from "vue";
import { useProjectStore } from "@/pages/Project/store/useProjectStore";

const projectStore = useProjectStore();
const courseNum = ref(Array.from({ length: 10 }, (_, i) => i + 1));

const selectionChange = (event) => {
  const selectedIndex = event.target.selectedIndex;
  projectStore.getTeamList(selectedIndex + 1);
};

</script>

<template>
  <label for="course-num">기수</label>
  <select class="coursenum-selection" @change="selectionChange">
    <option v-for="i in courseNum" v-bind:key="i">BEYOND {{ i }}기</option>
  </select>
  <label for="team">팀</label>

  <label for="github-url">github-url</label>
  <input type="text" id="github-url" name="github-url">
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
</style>