<script>
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import ReservationComponent from "@/pages/Reservation/component/ReservationMap.vue";
import ReservationList from "@/pages/Reservation/component/ReservationList.vue";

export default {
  name: 'ReservationPage',
  components: {
    MainFooter,
    MainHeader,
    ReservationComponent,
    ReservationList
  },
}
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
      <div class="content-area">
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
    flex-direction: column;
    gap: 20px;
  }
</style>