<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import PostEditor from "@/components/post/Detail/PostEditor.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import NoticeEditComponent from "./components/NoticeEditComponent.vue";
import { useNoticeStore } from "./stores/useNoticeStore";
import { ref } from "vue";
import { useRouter } from "vue-router";

const noticeStore = useNoticeStore();
const router = useRouter();

const formData = ref({
  category: '',
  isPrivate: false,
  title: '',
  content: '',
  imageUrlList: []
});

const handleNoticeEdit = (data) => {
  formData.value.category = data.category;
  formData.value.isPrivate = data.isPrivate;
};

const handlePostEdit = (data) => {
  formData.value.title = data.title;
  formData.value.content = data.content;
  formData.value.imageUrlList = data.imageUrlList;
};

const postCreate = async () => {
  console.log("formData", formData.value);
  
  const response = await noticeStore.createNotice(formData.value);

  if (response) {
    router.push('/notice');
  } else {
    alert("게시글 작성에 실패했습니다. 다시 요청해주세요.");
    router.push('/notice/write');
  }
};
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
      <div class="board-create-title">
        <h1>공지사항 작성</h1>
      </div>
      <NoticeEditComponent @edit="handleNoticeEdit"></NoticeEditComponent>
      <PostEditor @edit="handlePostEdit"></PostEditor>
      <button @click="postCreate">게시글 작성</button>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>

main {
  flex-direction: column;
} 

.board-create-title {
  max-width: 1000px;
  width: 100%;
}

h1 {
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
}

.content-area{
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
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