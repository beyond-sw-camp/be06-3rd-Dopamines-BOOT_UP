<script setup>
import { reactive, onMounted, watch } from "vue";
import { defineEmits } from "vue";
import axios from "axios";
import { loadScript } from "vue-plugin-load-script";

const emit = defineEmits(['edit']);

const postReq = reactive({
  title: '',
  content: '',
  imageUrlList: []
});

watch(postReq, () => {
  emit('edit', { ...postReq });
}, { deep: true });

const submitPostEdit = () => {
  emit('edit', { ...postReq });
};

onMounted(async () => {
  await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
  await loadScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js");

  window.$('#summernote').summernote({
    placeholder: '메시지를 입력해주세요',
    tabsize: 2,
    height: 200,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'underline', 'clear']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    callbacks: {
      onImageUpload: async function (files) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);
        }
        let response = await axios.post("http://localhost:8080/free/post/upload-image", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        for (let i = 0; i < response.data.result.length; i++) {
          let imageUrl = response.data.result[i];
          postReq.imageUrlList.push(imageUrl);

          let imgTag = window.$("<img>").attr('src', imageUrl);
          window.$("#summernote").summernote("insertNode", imgTag[0]);
        }
        submitPostEdit();
      }
    }
  });
});
</script>

<template>
  <div>
    <label for="title">제목:</label>
    <input type="text" id="title" v-model="postReq.title" required />

    <label for="content">내용:</label>
    <textarea id="summernote" v-model="postReq.content" rows="10" required></textarea>
  </div>
</template>

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