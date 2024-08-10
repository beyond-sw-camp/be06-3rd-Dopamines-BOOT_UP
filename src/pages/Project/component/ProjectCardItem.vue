<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <li class="project-card-list">
    <div class="project-card-item">
      <div class="top">
        <div class="team">{{ props.data.teamName }}</div>
        <div class="title">{{ props.data.title }}</div>
        <p class="add"></p>
      </div>
      <div>
        <ul class="name">
          <li v-for="(name, index) in props.data.students" v-bind:key="index">{{ name }}</li>
        </ul>
        <div class="course-num">{{ props.data.courseNum }}기</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.project-card-list {
  width: 33.3333%;
  position: relative;
  min-height: 315px;
  transition: box-shadow 0.3s ease;

}

.project-card-list:hover {
  box-shadow: 1px 1px 10px rgba(0, 0, 0, .15);
}

.project-card-list > li:hover:before {
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
  box-sizing: border-box;
  transition: box-shadow 0.3s ease;
  background-color: #bfb8a61f;
  border: 5px solid #fff;
}

.project-card-item:hover .course-num {
  color: rgba(224, 97, 57, 0.5);
}

.team {
  font-size: 20px;
  font-weight: 700;
  color: #19191A;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #19191A;

}

.name ul {
  display: flex;
  margin: 30px 0 -5px -5px;
  font-weight: 300;
  position: relative;
  z-index: 1;
  flex-wrap: wrap;
}

.name li {
  padding: 10px 15px;
  margin: 0 0 5px 5px;
  background: #bfb8a67d;
  color: #19191A;
  border-radius: 5px;
  font-weight: 500;
}

.course-num {
  position: absolute;
  right: -5px;
  bottom: 0;
  text-shadow: -1px 0 #efefef, 0 1px #efefef, 1px 0 #efefef, 0 -1px #efefef;
  color: #fff;
  font-weight: 900;
  font-size: 90px;
  line-height: .67;
}

</style>