<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import ReservationComponent from "@/pages/Reservation/component/ReservationMap.vue";
import ReservationList from "@/pages/Reservation/component/ReservationList.vue";
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

const routes = [
  {
    path: '/reservation',
    name: 'reservation',
  },
];

</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
        <router-link :to="routes[0].path" class="title">
          <h3>스터디 자리 예약</h3>
        </router-link>
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
</style>
