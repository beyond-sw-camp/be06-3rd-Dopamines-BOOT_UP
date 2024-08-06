<script setup>
import {defineProps} from 'vue';

const props = defineProps({
  postIdx:{
    type: Number,
    required: true
  },
  boardLink:{
    type: String,
    required: true
  },
  categoryTitle:{
    type: String,
    required: true
  },
  boardListLink:{
    type: String,
    required: true
  },
  boardTitle:{
    type: String,
    required: true
  },
  postAuthor:{
    type: String,
    required: true
  },
  postCreatedAt: {
    type: String,
    required: true
  },
  postTitle: {
    type: String,
    required: true,
  },
  postContents: {
    type: String,
    required: true,
  },
  commentCount:{
    type: Number,
    required: true
  }
});
</script>

<template>
  <div :id="'post-' + props.postIdx">
    <div class="post-container">
    <div class="post-wrapper-top">
      <div class="post-wrapper-top-line">
        <div class="post-category-container"></div>
      </div>
      <div class="post-category-wrapper">
        <div class="post-category-content">
          <a class="post-category-title" href="{{ props.boardLink }}">{{ categoryTitle }}</a>
          /
          <a class="post-board-title" href="{{ props.boardListLink }}">{{ props.boardTitle }}</a></div>
      </div>
    </div>
      <hr>
    <div class=".post-info-container">
      <div class="">
        <div class="">
          <div class="post-writer-container">
            <div class="post-writer-wrapper">
              <p class="post-writer-name">{{ props.postAuthor }}</p>
              <div class="post-time-ago">
                <span>{{ props.postCreatedAt }}</span>
              </div>
            </div>
          </div>
          <div class="post-content-wrapper">
            <h1 class="post-title"> {{ props.postTitle }} </h1>
            <hr style="border:.5px solid #bfb8a6">
            <div class="post-content-container">
              <div contenteditable="false" role="textbox" aria-multiline="true"
                       aria-readonly="true" aria-label=""
                       aria-placeholder="내용을 입력해주세요." translate="no"
                       class="ProseMirror remirror-editor remirror-a11y-dark">
<!--                글자 넘침 시 해결 필요-->
                <div class="post-content">{{ props.postContents }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="">
      <div>
        <div class="post-wrapper-bottom"></div>
        <h2 id="notes-title" class="post-comment-count">{{ props.commentCount }}개의 답변</h2>
      </div>
    </div>
  </div>
  </div>
</template>



<style scoped>
.post-container{
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  hr{
    border: .5px solid #e06139a3;
    width: calc(100% - 10px);
  }
}
.post-wrapper-top{
  margin: 10px 0;
  position: relative;
}
.post-wrapper-top-line{
  align-items: center;
  display: flex;
  inset: 0;
  position: absolute;
}
.post-category-container{
  border-top-width: 1px;
  width: 100%;
  border-color: hsla(220, 9%, 46%, .3);
}
.post-category-wrapper{
  display: flex;
  position: relative;
  font-size: .875rem;
  line-height: 1.25rem;
  background-color: #bfb8a663;
  padding: 10px;
  border-radius: 10px;
}
.post-category-content{
  .post-category-title{
    font-weight: 600;
  }
  .post-board-title{
    font-weight: 600;
    color: #E06139;
  }
}

.post-writer-container{
  display: flex;
  justify-content: space-between;
}
.post-writer-wrapper{
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.post-writer-name{
  margin: 0;
}
.post-time-ago{
  font-size: .875rem;
}
.post-title{
  margin: 10px;
}
.post-content-container{
  font-size: 1rem;
  line-height: 1.5rem;
}
.post-content-wrapper{
  background-color: #bfb8a629;
  /* border: 1px solid #bfb8a6; */
  padding: 10px;
  border-radius: 10px;
}
.post-content{
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.post-wrapper-bottom{
  border-top-width: 1px;
  border-color: hsla(220, 9%, 46%, .3);
  margin-bottom: 40px;
}
.post-comment-count{
  font-size: .875rem;
}
</style>