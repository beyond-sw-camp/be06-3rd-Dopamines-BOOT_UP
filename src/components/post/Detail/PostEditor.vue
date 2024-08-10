<script setup>
import {defineProps, onMounted, reactive, defineEmits, watch, nextTick} from 'vue';
import axios from "axios";
import {loadScript} from "vue-plugin-load-script";

const props = defineProps({
  postIndex: {
    type: String,
    required: false
  },
  postReq: {
    type: Object,
    required: false
  },
  postDetail: {
    type: Object,
    required: false
  },
  boardType: {
    type: String,
    required: false
  }
})

const emit = defineEmits(['formData']);

const postReq = reactive(Object.assign({}, props.postReq, {
  images: props.postReq.images || []
}));

// props.postReq 변경 감지
watch(() => props.postReq, (newVal) => {
  // postReq.idx = newVal.idx;
  postReq.idx = newVal.idx;
  postReq.title = newVal.title;
  postReq.images = newVal.images || [];
}, { immediate: true });

onMounted(async () => {
  try {
    console.log("내용췍!!!: ", props.postDetail)
    await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
    await loadScript("https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js");

    await nextTick(); // DOM이 준비될 때까지 기다립니다.

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

          let response = await axios.post(`/api/${props.boardType}/post/upload-image`, formData, {
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
  } catch (error) {
    console.log(error);
  }

  watch(() => props.postDetail, (newVal) => {
    if (newVal) {
      postReq.idx = newVal.idx;
      postReq.title = newVal.title;
      postReq.content = newVal.content;
      window.$("#summernote").summernote("code", newVal.content);
    }
  }, { immediate: true });
});

// send 함수
const create = async () => {
  postReq.content = window.$('#summernote').summernote('code');

  console.log(postReq);
  emit('postReq', postReq);
};

// update 함수
const update = async () => {
  postReq.content = window.$('#summernote').summernote('code');

  console.log(postReq);
  emit('postReq', postReq);
}

const handleAction = () => {
  if (props.postDetail != null) {
    console.log("update실행")
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