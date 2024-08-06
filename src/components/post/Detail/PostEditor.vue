<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  boardTitle:{
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="board-create-container">
    <div class="board-create-title">
      <h1>{{ props.boardTitle }}</h1>
    </div>
    <form>
      <label for="title">제목:</label>
      <input type="text" id="title" name="title" required>

      <label for="file-upload" class="file-label">파일 첨부:</label>
      <input type="file" id="file-upload" name="file-upload">

      <label for="content">내용:</label>
      <textarea id="content" name="content" rows="10" required></textarea>

      <button type="submit">제출</button>
    </form>
  </div>
</template>

<style scoped>
.board-create-container {
  max-width: 1000px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
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

button {
  padding: 10px;
  background-color: #E06139;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #cd3d11;
}
</style>