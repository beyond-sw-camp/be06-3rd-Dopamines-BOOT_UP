<script setup>
import { reactive, onMounted, watch } from "vue";
import { defineEmits } from "vue";
import axios from "axios";
import { loadScript } from "vue-plugin-load-script";

const emit = defineEmits(['edit']);


const postReq = reactive(Object.assign({}, props.postReq, {
  images: props.postReq.images || []
}));


watch(postReq, () => {
  emit('edit', { ...postReq });
}, { deep: true });

const submitPostEdit = () => {
  emit('edit', { ...postReq });
};

onMounted(async () => {
  await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
  await loadScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js");

  console.log("넌뭔데");
  console.log(postReq);
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

        let response = await axios.post("/api/free/post/upload-image", formData, {
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

// freePostReq.value.idx = 14;

// // 게시물 세부 정보 가져오기
// if (props.postIndex !== null && props.postIndex !== undefined) {
//
//     await communityStore.getPostDetail(props.postIdx); // props.postIdx로 바꿔야함
//     if (communityStore.postDetail) {
//       postReq.title = communityStore.postDetail.title;
//       postReq.content = communityStore.postDetail.content;
//       window.$("#summernote").summernote("code", postReq.content);
//     }
// }

// send 함수
const create = async () => {
  postReq.content = window.$('#summernote').summernote('code');

  console.log(postReq);
  emit('postReq', postReq);
};

// update 함수
const update = async () => {
  postReq.content = window.$('#summernote').summernote('code');
  postReq.idx = props.postIndex;
  console.log(postReq);

  emit('postReq', postReq);
}

const handleAction = () => {
  if (props.postIndex != null) {
    update()
  } else {
    create()
  }
}
</script>

<template>
  <div class="board-create-container">
    <form @submit.prevent="handleAction">
      <label for="title">제목:</label>
      <input type="text" id="title" name="title" v-model="postReq.title" required>
>>>>>>> 45e225e0f32611fca3c7548b53815b629fccb0df

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