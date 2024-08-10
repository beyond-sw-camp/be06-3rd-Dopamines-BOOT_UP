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
          <li class="board-list-wrap"
              v-for="(reservation, index) in sortedReservationList"
              :key="index">
            <div class="board-post-status-header">
              <div class="board-post-status-left">
                <div class="board-post-author">
                  <span>예약 날짜: {{ formatDate(reservation.createdAt) }} | </span>
                </div>
                <div class="board-post-time">
                  <span>시간: {{ reservation.time }} | </span>
                </div>
                <div class="board-post-time">
                  <span>{{ reservation.floor }}층</span>
                </div>
                <div class="board-post-time">
                  <span>구역: {{ reservation.section }} </span>
                </div>
              </div>
              <div class="board-post-status-right">
                <div class="board-post-author">
                  <button v-if="isSameDate(reservation.createdAt)"
                          class="cancel-btn"
                          @click="cancelReservation(reservation.idx)">취소</button>
                </div>
              </div>
            </div>
            <hr>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import { useReservationStore } from '../stores/useReservationStore';
import { useRouter } from "vue-router";

const reservationStore = useReservationStore();
const router = useRouter();

const reservationList = computed(() => reservationStore.reservationList);

const sortedReservationList = computed(() => {
  const list = reservationList.value;
  if (!Array.isArray(list)) {
    return [];
  }
  return [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
});

onMounted(async () => {
  try {
    await reservationStore.getReservationDetail();
  } catch (error) {
    console.error('예약 세부 정보를 가져오는 데 오류가 발생했습니다:', error);
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const isSameDate = (dateString) => {
  const today = new Date();
  const reservationDate = new Date(dateString);

  return today.getFullYear() === reservationDate.getFullYear() &&
      today.getMonth() === reservationDate.getMonth() &&
      today.getDate() === reservationDate.getDate();
};

const cancelReservation = async (idx) => {
  console.log("this is reservation idx: ", idx);
  if (confirm("예약을 취소하시겠습니까?")) {
    const result = reservationStore.deleteReservation(idx);

    if (result) {
      if (confirm("예약이 취소되었습니다.")) {
        await router.push("/reservation");
      }
    } else {
      if (confirm("예약 취소에 실패하였습니다.")) {
        router.push(router.currentRoute.value.fullPath)
      }
    }
  }
};
</script>

<style scoped>
.content-wrap {
  display: flex;
  width: 100%;
  flex-direction: column;
}

.content-title {
  background-color: #bfb8a6a2;
  color: #19191A;
  border-radius: 0.75rem;
  height: 4rem;
  padding: 0 2rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.content-title a {
  display: flex;
  height: 100%;
  align-items: center;
}

.content-title a span {
  font-weight: 600;
}

.board-list {
  padding: 0;
  list-style: none;
  margin-top: 20px;
}

.board-list-wrap {
  padding: 1rem 0;
}

.board-post-status-header {
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
}

.board-post-status-left {
  display: flex;
  align-items: center;
}

.board-post-author {
  font-weight: 500;
  color: #19191ab7;
  margin: 0;
}

.board-post-time {
  font-size: 0.875rem;
  color: #19191a92;
  margin-left: 0.5rem;
}

.cancel-btn {
  background: #D6D2C8;
  border-radius: 5px;
  font-size: 0.8rem;
  padding: 5px 10px;
}
</style>
