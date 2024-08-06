<script setup>

</script>
<template>
  <div class="content-wrap">
    <div class="content-title">
      <a>
        <span>내 예약 목록</span>
      </a>
    </div>
    <div>
      <div class="content">
        <ul class="board-list">
          <li class="board-list-wrap" v-for="(reservation, index) in reservationStore.reservationList" v-bind:key="index">
            <div class="board-post-status-header">
              <div class="board-post-status-left">
                <div class="board-post-author">
                  <span>예약 날짜: {{ reservation.createdAt }}</span>
                </div>
                <div class="board-post-time">
                  <span>시간: {{ reservation.time }}</span>
                </div>
                <div class="board-post-time">
                  <span>층: {{ reservation.floor }}층</span>
                </div>
                <div class="board-post-time">
                  <span>구역: {{ reservation.section }}</span>
                </div>
              </div>
              <div class="board-post-status-right">

              </div>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia';
import { useReservationStore } from '../stores/useReservationStore';
export default {
  name: 'ReservationList',
  data() {

  },

  methods: {
  },
  computed: {
    // mapping 시키겠다.
    ...mapStores(useReservationStore)
  },
  mounted() {
    this.reservationStore.getReservationDetail();
  }
}
</script>

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
  border-radius: 0.75rem;
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