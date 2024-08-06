<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import MainHeader from '@/components/layout/MainHeader.vue';
import PostDetail from '@/components/post/Detail/PostDetail.vue';
import CommentComponent from '@/components/post/Detail/Comment/CommentComponent.vue';
import MainFooter from "@/components/layout/MainFooter.vue";
import { usePostStore } from '@/components/post/stores/usePostStore';


const route = useRoute();
const comments = ref([]);

const postData = {
  idx : 0,
  title : "",
  content: "",
  author : "",
  imageUrlList : [],
  created_at : "",
  likeCount : 0,
  freeCommentList : []
}

const getData = () => {
  const postStore = usePostStore();
  let postIdx = 1;
  const response = postStore.getPost(postIdx)
  .then(rs => {
    console.log(rs);
    postData.idx = rs.idx;
    postData.title = rs.title;
    postData.content = rs.content;

  })

  console.log(response);
  console.log(postData.idx)
  console.log(postData.title)
  console.log(postData.content)
  
}

//호출하는 메서드가 요소에 접근해서 요소에 값을 집어넣거나 가져올 때 .

// create : 렌더링만 됐을 때 (요소가 만들어지지도 않ㄹ았는데 가져오려고 할수도있음)
// mounted : 렌더링이 다 끝나고(?) , 요소가 다 생성 됐을 때
onMounted(() => {
  console.log(route.params.id);
  comments.value = [
    { author: 'User1', comment: 'Comment1', createAt: '2023-10-01' },
    { author: 'User2', comment: 'comment2', createAt: '2023-10-02' }
  ];
  getData(); 
});

</script>


<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="main-container">
        <div>
          <PostDetail
              post-title=response.postitle
              post-created-at="10분전"
              post-contents="컴포넌트화rk;thty'hk;,tyk';khtyo''rtgmrtcj
              gthtyc';hv;notju;u;humh'tuohuphj;ukju' 확인"
              post-author="최승은"
              comment-count="5"
              category-title="커뮤니티 게시판"
              board-title="자유 게시판"
              board-list-link="https://naver.com"
              board-link="https://naver.com"
              post-idx="0"
              board-idx="0"></PostDetail>
          <CommentComponent :comments="comments"></CommentComponent>
        </div>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
</style>