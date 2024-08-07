<script setup>
import { defineProps, onMounted, reactive, defineEmits } from 'vue';
import axios from "axios";
import {loadScript} from "vue-plugin-load-script";

const props = defineProps({
  postIndex: {
    type: Number,
    required: true
  },
  postReq: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['formData']);

const postReq = reactive({
    ...props.postReq,
    images: props.postReq.images || []
});

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

        console.log(response);

        for (let i = 0; i < response.data.result.length; i++) {
          let imageUrl = response.data.result[i];
          (postReq.images).push(imageUrl);

          // 이미지 태그 생성 및 삽입
          let imgTag = window.$("<img>").attr('src', imageUrl);
          window.$("#summernote").summernote("insertNode", imgTag[0]);
        }
      }
    }
  });
});
  // freePostReq.value.idx = 14;

  // 게시물 세부 정보 가져오기
  // if (props.postIndex !== null && props.postIndex !== undefined) {
  //     await communityStore.getPostDetail(14); // props.postIdx로 바꿔야함
  //     if (communityStore.postDetail) {
  //       postReq.title = communityStore.postDetail.title;
  //       postReq.content = communityStore.postDetail.content;
  //       window.$("#summernote").summernote("code", postReq.content);
  //     }
  // }

// send 함수
// const create = async () => {
//   console.log(props.postIndex);
//   console.log(window.$('#summernote').summernote('code'));
//   postReq.content = window.$('#summernote').summernote('code');
//   const formData = new FormData();
//   const jsonBlob = new Blob([JSON.stringify(postReq)], { type: 'application/json' })
//   formData.append('req', jsonBlob);
//
//   emit('formData', formData);
// };

// update 함수
const update = async () => {
  postReq.content = window.$('#summernote').summernote('code');
  postReq.idx = props.postIndex;
  console.log(props.postIndex);
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(postReq)], { type: 'application/json' });
  formData.append('req', jsonBlob);

  emit('action', "update");
  emit('formData', formData);
}
</script>

<template>
  <div class="board-create-container">
    <form @submit.prevent="update">
      <label for="title">제목:</label>
      <input type="text" id="title" name="title" v-model="postReq.title" required>

      <label for="content">내용:</label>
      <textarea id="summernote" name="content" rows="10" required></textarea>

      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PostEditor',

}
</script>
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