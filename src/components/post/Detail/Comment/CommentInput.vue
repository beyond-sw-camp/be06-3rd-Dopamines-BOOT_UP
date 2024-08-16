<script setup>
// import { defineProps, defineEmits, ref } from 'vue';
//


// const emit = defineEmits(['delete', 'edit', 'reply', 'update:likeCount']);
// const localLikeCount = ref(props.likeCount);
//
// function handleDelete() {
//   emit('delete');
// }
//
// function handleEdit() {
//   const newComment = prompt('Edit your comment:', props.content);
//   if (newComment !== null) {
//     emit('edit', newComment);
//   }
// }
//
// function handleReply() {
//   emit('reply');
// }
import {useFreeCommentStore} from "@/pages/Community/FreeBoard/stores/useFreeCommentStore";
import {defineProps, ref} from "vue";
import router from "@/router";

const props = defineProps({
  author: {
    type: String,
    required: true
  },
  postIdx: {
    type: Number,
    required: true
  },
  boardType: {
    type: String,
    required: true
  }
});

const freeCommentStore = useFreeCommentStore();
const commentReq = ref({
  postIdx: 0,
  content: "",
});

const commentCreate = async () => {
  try {
    commentReq.value.postIdx = props.postIdx;
    const response = await freeCommentStore.createComment(commentReq.value);

    if (response) {
      if (confirm("댓글이 등록되었습니다.")) {
        console.log(props.boardType);
        console.log(props.postIdx);
        await router.push(`/${props.boardType}/detail/${props.postIdx}`);
        window.location.reload();
      }
    } else {
      alert("댓글 작성에 실패했습니다. 다시 요청해주세요.");
    }
  } catch (error) {
    console.error("댓글 작성 중 오류 발생:", error);
    alert("댓글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
};
</script>

<template>
  <h3> 댓글</h3>
  <div class="comment-view">
    <div class="comment-wrap">
      <div>
        <input type="text" v-model="commentReq.content">
      </div>
    </div>
    <div class="comment-method-container">
      <div>
        <button class="comment-create-btn" @click="commentCreate">등록</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.comment-view {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
}
.comment-wrap {
  width: 90%;
}
.comment-wrap input {
  width: 100%;
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  outline: none;
}
.comment-wrap input:focus{
  border-bottom: 2px solid #e06139a3;
}
.comment-create-btn {
  font-size: 1rem;
  padding: 6px 10px;
  background-color: rgba(191, 184, 166, 0.7);
  color: #212529;
  border-radius: 5px;
}
.comment-method-container {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: column;
}
.like-wrap {
  display: flex;
  align-items: center;
}
.like-wrap p {
  margin: 0;
}
</style>