<script setup>
import {computed, defineProps, ref} from 'vue';
// import { useRoute } from 'vue-router';
import PostListItem from '@/pages/component/List/PostListItem.vue';
import SearchBar from "@/components/post/Menu/SearchBar.vue";

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  dataList: {
    type: Array,
    required: false
  },
  board: {
    type: String,
    default: '/',
    required: false
  },
  searchQuery: {
    type: String,
    default: ''
  },
  performSearch: {
    type: Function,
    required: false
  },
  showSearchInput: {
    type: Boolean,
    default: false
  }
});

const searchQuery = ref(props.searchQuery);
// const route = useRoute();

const sortedDataList = computed(() => {
  return [...props.dataList].sort((a, b) => b.idx - a.idx);

});
</script>

<template>
  <div class="post-list-container">
    <router-link :to="board" class="title">
      <h3>{{ title }}</h3>
    </router-link>
    <div v-if="showSearchInput">
      <SearchBar v-model:searchInput="searchQuery" @performSearch="performSearch"></SearchBar>
    </div>

    <div class="content">
      <ul class="board-list" v-if="sortedDataList && sortedDataList.length">
        <li class="board-list-wrap" v-for="post in sortedDataList" :key="post.id">
          <div>
            <router-link class="board-post-title" :to="`${board}/detail/${post.idx!== undefined ? post.idx : 'undefined'}`">
              <PostListItem
                  :post-title="post.title"
                  :content="post.content"
                  :idx="post.idx"
                  :nick-name="post.nickName"
                  :created-at="post.createdAt"
              />
            </router-link>
          </div>
          <hr>
        </li>
      </ul>
      <!--      <p v-else-if="!route.path.includes('market')">등록된 게시글이 없습니다.</p>-->
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #bfb8a6a2;
  --text-color: #19191A;
  --secondary-color: #19191ab7;
  --text-muted-color: #19191a92;
}

.post-list-container {
  width: 100%;
}

.title {
  display: flex;
  background-color: rgb(224 97 57);
  color: #fff;
  border-radius: 0.75rem;
  height: 4rem;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 2px 2px 10px rgb(0 0 0 / 10%);
  margin-bottom: 10px;
}

.board-list {
  li {
    padding: 1rem;

    .board-post-title {
      font-weight: 600;
      word-break: break-all;
      width: fit-content;
      overflow: hidden;
    }
  }
}
</style>