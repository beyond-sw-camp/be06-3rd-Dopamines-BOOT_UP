<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useCommunityStore } from '@/pages/Community/stores/useCommunityStore';
import axios from "axios";
import {loadScript} from "vue-plugin-load-script";

const props = defineProps({
  postIndex: {
    type: Number,
    required: true
  }
})

const communityStore = useCommunityStore();

const freePostReq = ref({
  idx: 0,
  title: "",
  content: "",
  images: []
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
          freePostReq.value.images.push(imageUrl);

          // 이미지 태그 생성 및 삽입
          let imgTag = window.$("<img>").attr('src', imageUrl);
          window.$("#summernote").summernote("insertNode", imgTag[0]);
        }
      }
    }
  });

  freePostReq.value.idx = 14;

  // 게시물 세부 정보 가져오기
  // if (props.postIndex !== null && props.postIndex !== undefined) {
  if(freePostReq.value.idx !== null && freePostReq.value.idx !== undefined){
    await communityStore.getPostDetail(14); // props.postIdx로 바꿔야함
    if (communityStore.postDetail) {
      freePostReq.value.title = communityStore.postDetail.title;
      freePostReq.value.content = communityStore.postDetail.content;
      window.$("#summernote").summernote("code", freePostReq.value.content);
    }
    // if (!props.postIndex) {
    //   freePostReq.value.idx = 5; // 임시로 설정
    // }
  }
});

// send 함수
const send = async () => {
  console.log(window.$('#summernote').summernote('code'));
  freePostReq.value.content = window.$('#summernote').summernote('code');
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(freePostReq.value)], { type: 'application/json' })
  formData.append('req', jsonBlob);

  await axios.post("http://localhost:8080/free/post/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjEsImVtYWlsIjoic3RhcmJpbjc3ODhAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfVEVNUE9SQVJZX1VTRVIiLCJuaWNrbmFtZSI6IuydteuqhTEiLCJpYXQiOjE3MjI5MzA5NTcsImV4cCI6MTcyMjk0Mjk1N30.N4PGUmQKS2OXDPC0-zKeRG_JMYm3OUZVPktCaiFQk_4"
    }
  });
};

// update 함수
const update = async () => {
  freePostReq.value.content = window.$('#summernote').summernote('code');
  // freePostReq.value.idx = props.postIndex;
  console.log(props.postIndex);
  freePostReq.value.idx = 14;
  const formData = new FormData();
  const jsonBlob = new Blob([JSON.stringify(freePostReq.value)], { type: 'application/json' });
  formData.append('req', jsonBlob);

  await axios.put(`http://localhost:8080/free/post/update`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZHgiOjEsImVtYWlsIjoic3RhcmJpbjc3ODhAbmF2ZXIuY29tIiwicm9sZSI6IlJPTEVfVEVNUE9SQVJZX1VTRVIiLCJuaWNrbmFtZSI6IuydteuqhTEiLCJpYXQiOjE3MjI5MzA5NTcsImV4cCI6MTcyMjk0Mjk1N30.N4PGUmQKS2OXDPC0-zKeRG_JMYm3OUZVPktCaiFQk_4"
    },
  });
}

const handleSubmit = () => {
  // if (props.postIndex) {
  //   update();
  // } else {
  //   send();
  // }
  if (freePostReq.value.idx) {
    update();
  } else {
    send();
  }
}
</script>

<template>
  <div class="board-create-container">
    <form @submit.prevent="handleSubmit">
      <label for="title">제목:</label>
      <input type="text" id="title" name="title" v-model="freePostReq.title" required>

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