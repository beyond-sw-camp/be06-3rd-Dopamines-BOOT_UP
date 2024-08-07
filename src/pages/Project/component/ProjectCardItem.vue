<script setup>

import { defineProps } from "vue";

const props = defineProps({
  teamName: String,
  projectTitle: String,
  projectDescription: String,
  nameList: Array,
  courseNum: String,
});

</script>

<template>
  <li class="project-card-list">
    <div class="project-card-item">
      <div class="top">
        <div class="team">{{ props.teamName }}</div>
        <div class="title">{{ props.projectTitle }}</div>
        <p class="description">{{ props.projectDescription }}</p>
      </div>
      <div class="name">
        <ul>
          <li v-for="(name, index) in props.nameList" v-bind:key="index">{{ name }}</li>
        </ul>
        <div class="course-num">{{ props.courseNum }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.project-card-list {
  width: 33%;
  position: relative;
  min-height: 315px;
  transition: box-shadow 0.3s ease;

}

.project-card-list:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .15);
}

.project-card-list > li:hover:before {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  content: '';
  z-index: 1;
}

.project-card-list > li:hover .course-num {
  color: rgba(224, 97, 57, 0.5);
  text-shadow: none;
}

.project-card-item {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 50px 30px 40px;
}

.project-card-list > li{width: 33%; border-right: 1px solid #ddd; border-bottom: 1px solid #ddd; position: relative; min-height: 315px; }
.project-card-list .team{font-size: 1.625em; font-weight: 700; color: #333}
.project-card-list .title{font-size: 1rem; color: #333; font-weight: 500; margin-top: 13px; line-height: 1.5;}
.project-card-list .add{color: #666; margin-top: 7px; line-height: 1.5;}
.project-card-list .project-card-item{display: flex; flex-flow: column; justify-content: space-between; height: 100%; position: relative; overflow: hidden; padding: 50px 30px 40px; box-sizing: border-box}
.project-card-list .name{display: flex; margin: 30px 0 -5px -5px; font-weight: 300; position: relative; z-index: 1; flex-wrap:wrap}
.project-card-list .course-num{position: absolute; right: -5px; bottom: 0;  text-shadow: -1px 0 #efefef, 0 1px #efefef, 1px 0 #efefef, 0 -1px #efefef; color: #fff; font-weight: 900; font-size: 90px; line-height: .67;}
.project-card-list .name > *{padding: 10px 15px; margin:0 0 5px 5px; background: #f4f4f4; color: #666}
.project-card-list > li:hover{box-shadow:1px 1px 10px rgba(0,0,0,.15)}
.project-card-list > div:nth-of-type(1):hover{position:absolute; left:0; top:0; right:0; bottom:0; border:1px solid darkblue; content: ''; z-index: 1}
.project-card-list > div:nth-of-type(1):hover .course-num{color: #f2f4f6;text-shadow:none}

</style>