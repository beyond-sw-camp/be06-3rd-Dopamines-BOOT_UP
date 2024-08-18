<script setup>
import {computed, defineEmits, defineProps, onMounted, ref, watch} from 'vue';
import { useRoute } from 'vue-router';

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
  },
  editlnk: {
    type: String,
    required: true,
  },
  postLikeCount: {
    type: Number,
    required: true
  },
  postLikeStatus: {
    type: Boolean,
    required: false
  }
});
const emit = defineEmits(['update:likeCount']);
const route = useRoute();

const userNickName = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.userNickName || '';
});

// 로컬 상태로 postLikeCount 관리
const localLikeCount = ref(props.postLikeCount);
const isLiked = computed(() => props.postLikeStatus);

// props.postAuthor와 로컬 스토리지의 userNickName을 비교
const canEditPost = computed(() => {
  return userNickName.value === props.postAuthor;
});

const showCategoryTitle = computed(() => {
  return route.path.startsWith('/free') || route.path.startsWith('/open');
});

// 게시글 조회시, 해당 유저가 좋아요를 눌렀던 적이 있는지 확인 후 표시
onMounted(() => {
  const likeIcon = document.querySelector('.btn-like img');
  if (isLiked.value) {
    likeIcon.src = require('@/assets/icon/fill_marked.svg');
  } else {
    likeIcon.src = require('@/assets/icon/empty_marked.svg');
  }
});

// props 변경을 감지하고 로컬 상태 업데이트
watch(() => props.postLikeCount, (newCount) => {
  localLikeCount.value = newCount;
});

watch(() => props.postLikeStatus, (newStatus) => {
  const likeIcon = document.querySelector('.btn-like img');
  if (newStatus) {
    likeIcon.src = require('@/assets/icon/fill_marked.svg');
  } else {
    likeIcon.src = require('@/assets/icon/empty_marked.svg');
  }
});

function postLike() {
  const likeIcon = document.querySelector('.btn-like img');

  if (isLiked.value) {
    likeIcon.src = require('@/assets/icon/empty_marked.svg');
    localLikeCount.value--;
  } else {
    likeIcon.src = require('@/assets/icon/fill_marked.svg');
    localLikeCount.value++;
  }

  emit('update:likeCount', props.postIdx);
}
</script>

<template>
  <div class="post-container">
    <div class="post-wrapper-top">
      <div class="post-wrapper-top-line">
        <div class="post-category-container"></div>
      </div>
      <div class="post-category-wrapper">
        <div class="post-category-content">
          <router-link v-if="showCategoryTitle" class="post-category-title" :to="props.category">
            {{ props.categoryTitle }}
          </router-link>
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
              <p class="post-writer-name">{{ props.postAuthor }} / {{ props.postCreatedAt }}</p>
              <div class="post-time-ago">
                <button class="btn-like" @click="postLike">
                  <img :src="isLiked ? require('@/assets/icon/fill_marked.svg') : require('@/assets/icon/empty_marked.svg')"
                       alt="like icon">
                </button>
                <p class="post-count-text">{{ localLikeCount }}</p>
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
                <div class="post-content" v-html="props.postContents"></div>
              </div>
              <div class="post-edit-wrap" v-if="canEditPost">
                <!-- TODO v-show="userIdx" 확인 로직 추가 -->
                <router-link :to="`${props.editlnk}`" class="post-edit">수정하기</router-link>
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
  display: flex;
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
.post-content img {
  width: 50% !important;
  height: auto;
  display: block;
  margin: 0 auto;
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