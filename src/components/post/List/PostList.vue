<script setup>
  import { defineProps } from 'vue';

  const props = defineProps({
    title: {
      type: String,
      required: true
    }
  });
</script>

<template>
  <div class="content-wrap">
    <div class="content-title">
      <a>
        <span>{{ props.title }}</span>
      </a>
    </div>
    <div>
      <div class="content">
        <ul class="board-list">
          <li class="board-list-wrap" v-for="i in 20" v-bind:key="i">
            <div class="board-post-status-header">
              <div class="board-post-status-left">
                <div class="board-post-author">
                  <span>작성자1</span>
                </div>
                <div class="board-post-time">
                  <span>18분 전</span>
                </div>
              </div>
              <div class="board-post-status-right">
                <div class="board-post-right-detail">
                  <img src="../../../assets/icon/thumbIcon.svg" alt="Icon" width="20px">
                  <span class="board-post-right-detail-text">0</span>
                </div>
                <div class="board-post-right-detail">
                  <img src="../../../assets/icon/commentIcon.svg" alt="Icon" width="20px">
                  <span class="board-post-right-detail-text">0</span>
                </div>
              </div>
            </div>
            <div>
              <a class="board-post-title" href="https://okky.kr/questions/1508768">안드로이드 앱 구현시 라이브러리 업데이트 관련</a>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrap{
  display: flex;
  width: 100%;
  flex-direction: column;
}
.content-title{
  background-color:#bfb8a6a2;
  color: #19191A;
  border-radius: 0.75rem;
  height: 4rem;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  align-items: center;
  a{
    align-items: center;
    display: flex;
    height: 100%;
    span{
      font-weight: 600;
    }
  }
}
.board-list{
  li{
    padding-top: 1rem;
    padding-bottom: 1rem;
    .board-post-status-header{
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      .board-post-status-left{
        align-items: center;
        display: flex;
        .board-post-author{
          font-weight: 500;
          color:#19191ab7;
          margin: 0;
        }
        .board-post-time{
          font-size: 0.875rem;
          color: #19191a92;
          margin-left: 0.5rem;
        }
      }
      .board-post-status-right{
        display: flex;
        color: #19191a92;
        gap: 0.5rem;
        .board-post-right-detail{
          column-gap: 0.125rem;
          align-items: center;
          flex: 1 1 0%;
          display: flex;
          svg{
            flex-shrink: 0;
            width: 1rem;
          }
        }
      }
    }
    .board-post-title{
      font-weight: 600;
      word-break: break-all;
      width: fit-content;
      overflow: hidden;
    }
  }
}
</style>