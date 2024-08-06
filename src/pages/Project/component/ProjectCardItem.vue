<script>
// import useProjectStore from '../store/useProjectStore'
export default {
  props: {
    teamName: String,
    projectTitle: String,
    projectDescription: String,
    teamMateName: String
  },
  data() {
    return {
      i: 0,
      nameList: [],
      courseNum: 0
    }
  }
}
</script>

<template>
  <li class="project-card-list">
    <div class="project-card-item">
      <div class="top">
        <div class="team">{{ teamName }}</div>
        <div class="title">{{ projectTitle }}</div>
        <p class="description">{{ projectDescription }}</p>
      </div>
      <div class="name">
        <ul>
          <li v-for="(name, index) in nameList" v-bind:key="index">{{ teamMateName }}</li>
        </ul>
        <div class="course-num">{{ courseNum }}</div>
      </div>
    </div>
  </li>
</template>

<style scoped>
.project-card-list {
  width: 33.333%;
  border-right: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  position: relative;
  min-height: 315px;
  transition: all ease-in-out .15s;
}

.project-card-item {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 50px 30px 40px;

  .name {
    display: flex;
    margin: 30px 0 -5px -5px;
    font-weight: 300;
    position: relative;
    z-index: 1;
    flex-wrap: wrap;

    li {
      padding: 10px 15px;
      margin: 0 0 5px 5px;
      background: #f4f4f4;
      color: #666;
    }
  }
}
</style>