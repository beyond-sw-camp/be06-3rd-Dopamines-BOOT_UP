<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  postIdx: {
    type: Number,
    required: true
  },
  board: {
    type: String,
    required: true
  },
  boardTitle: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  categoryTitle: {
    type: String,
    required: true
  },
  postAuthor: {
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
  }
});
</script>

<template>
  <div class="post-container">
    <div class="post-wrapper-top">
      <div class="post-wrapper-top-line">
        <div class="post-category-container"></div>
      </div>
      <div class="post-category-wrapper">
        <div class="post-category-content">
          <!-- category-title은 url이 free나 open으로 시작할 때만 보여야해 -->
          <router-link class="post-category-title" :to="props.category">{{ props.categoryTitle }}</router-link>
          /
          <router-link class="post-board-title" :to="props.board">{{ props.boardTitle }}</router-link>
        </div>
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
                <!-- 글자 넘침 시 해결 필요 -->
                <div class="post-content">{{ props.postContents }}</div>
              </div>
              <div class="post-edit-wrap">
                <!-- TODO v-show="userIdx" 확인 로직 추가 -->
                <router-link :to="`/community/free/edit/${props.postIdx}`" class="post-edit">수정하기</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  hr {
    border: .5px solid #e06139a3;
    width: calc(100% - 10px);
  }
}
.post-wrapper-top {
  margin: 10px 0;
  position: relative;
}
.post-wrapper-top-line {
  align-items: center;
  display: flex;
  inset: 0;
  position: absolute;
}
.post-category-container {
  border-top-width: 1px;
  width: 100%;
  border-color: hsla(220, 9%, 46%, .3);
}
.post-category-wrapper {
  display: flex;
  position: relative;
  font-size: .875rem;
  line-height: 1.25rem;
  background-color: #bfb8a663;
  padding: 10px;
  border-radius: 10px;
}
.post-category-content {
  .post-category-title {
    font-weight: 600;
  }
  .post-board-title {
    font-weight: 600;
    color: #E06139;
  }
}
.post-writer-container {
  display: flex;
  justify-content: space-between;
}
.post-writer-wrapper {
  padding: 10px 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.post-writer-name {
  margin: 0;
}
.post-time-ago {
  font-size: .875rem;
}
.post-title {
  margin: 10px;
}
.post-content-container {
  font-size: 1rem;
  line-height: 1.5rem;
}
.post-content-wrapper {
  background-color: #bfb8a629;
  padding: 10px;
  border-radius: 10px;
}
.post-content {
  padding: 10px;
  background-color: #fff;
  border-radius: 5px;
}
.post-edit-wrap {
  display: flex;
  justify-content: flex-end;
}
.post-edit {
  margin-top: 10px;
  display: inline-block;
  padding: 5px 10px;
  background-color: rgba(191, 184, 166, 0.7);
  color: #212529;
  border-radius: 5px;
}
</style>