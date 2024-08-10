<script setup>
import {onMounted, ref} from 'vue';
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import {useProjectStore} from '@/pages/Project/store/useProjectStore';
import { useRoute } from 'vue-router';

const projectDetail = ref([]);
const idx = ref(null);
const projectStore = useProjectStore();

onMounted(async () => {
  const route = useRoute();
  idx.value = route.params.id;

  projectDetail.value = await projectStore.getProjectDetail(idx.value);

  window.scrollTo(0, 0);
});

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
      <main>
        <div>
          <section>
            <h1>{{ projectDetail.title }}</h1>
            <div class="student-team-container">
              <label for="team">팀</label>
              <p class="student-item">{{ projectDetail.teamName }}</p>

              <label for="team">팀원</label>
              <div class="student-list">
                <div class="student-item" v-for="(student, index) in projectDetail.students" :key="index">
                  {{ student }}
                </div>
              </div>
            </div>
            <hr>
            <div>
              <p v-html="projectDetail.contents"></p>
            </div>
            <hr>
            <div class="git-url">
              Github URL : <a :href="projectDetail.gitUrl" target="_blank" class="git-link">{{ projectDetail.gitUrl }}</a>
            </div>
          </section>
        </div>
      </main>
    <MainFooter></MainFooter>
  </div>

</template>

<style scoped>
.body-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: Arial, sans-serif;
}

main {
  flex: 1;
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 30px;
}

h1 {
  font-size: 28px;
  color: #333;
  margin-bottom: 60px;
  text-align: center;
  font-weight: bold;
}

.student-team-container {
  align-items: center;
  margin-bottom: 30px;
}

.student-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.student-item {
  background: #e9ecef;
  border-radius: 4px;
  margin: 5px;
  padding: 10px 15px;
  transition: background 0.3s;
  font-weight: bold;
}

.git-url {
  margin-top: 20px;
}

.git-link {
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-decoration: none;
}

.git-link:hover {
  text-decoration: underline;
}

p {
  margin: 30px 0;
  color: #555;
  line-height: 1.5;
}

a {
  color: #007bff;
  text-decoration: none;
}

footer {
  margin-top: auto;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}
</style>

