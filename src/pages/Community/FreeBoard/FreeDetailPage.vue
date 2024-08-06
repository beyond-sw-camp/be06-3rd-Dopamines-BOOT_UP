<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  console.log(route.params.id);
});
</script>

<template>
  <div>
    <h1>자유게시판 리스트 페이지</h1>
    <ul>
      <li>
        <div class="list-item">
          <h1>제목</h1>
          <h3>{{ route.params.id }}</h3>
          <p>리스트 설명</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>