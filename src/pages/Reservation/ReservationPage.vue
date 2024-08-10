<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import ReservationComponent from "@/pages/Reservation/component/ReservationMap.vue";
import ReservationList from "@/pages/Reservation/component/ReservationList.vue";
import PostList from "@/components/post/List/PostList.vue";
import {onMounted} from "vue";

onMounted(() => {
  const paragraphs = document.querySelectorAll('.post-list-container p');
  paragraphs.forEach(paragraph => {
    paragraph.textContent = '';
  });

  const routerLinks = document.querySelectorAll('.post-list-container router-link');
  routerLinks.forEach(routerLink => {
    const boardValue = routerLink.getAttribute('to'); // 기존의 board 값 가져오기
    if (boardValue) {
      routerLink.setAttribute('to', 'reservation'); // :to 속성을 'reservation'으로 설정
    }
  });
});

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <PostList title="스터디 자리 예약" :reservation="reservation" :data-list="dataList" :show-status="isStatusShow"></PostList>
        <ReservationComponent></ReservationComponent>
        <ReservationList></ReservationList>
      </div>
    </main>
    <MainFooter></MainFooter>
  </div>
</template>

<style scoped>
.content-area{
  display: flex;
  gap: 10px;
  flex-direction: column;
  max-width: 1000px;
  width: 100%;
}
</style>
