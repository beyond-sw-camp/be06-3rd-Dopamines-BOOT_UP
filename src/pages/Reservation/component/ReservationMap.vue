<template>
  <div class="container-wrap">
    <div class="title">
      <h1>좌석 예약</h1>
    </div>
    <div class="container">
      <div class="seat-wrap">
        <div class="seat-table-wrap f3">
          <p class="seat-table-label">3층</p>
          <button class="seat-table" :class="{ 'selected': selectedSection === 'A' && selectedFloor === 3 }"
                  @click="getTime(3, 'A')">A</button>
        </div>
        <div class="seat-table-wrap f4">
          <p class="seat-table-label">4층</p>
          <button class="seat-table" :class="{ 'selected': selectedSection === 'A' && selectedFloor === 4 }"
                  @click="getTime(4, 'A')">A</button>
        </div>
        <div class="seat-table-wrap f5">
          <p class="seat-table-label">5층</p>
          <div class="seat-table-fifth">
            <button class="seat-table table-1" :class="{ 'selected': selectedSection === 'A' && selectedFloor === 5 }"
                    @click="getTime(5, 'A')">A</button>
            <button class="seat-table" :class="{ 'selected': selectedSection === 'B' && selectedFloor === 5 }"
                    @click="getTime(5, 'B')">B</button>
            <button class="seat-table t3" :class="{ 'selected': selectedSection === 'C' && selectedFloor === 5 }"
                    @click="getTime(5, 'C')">C</button>
            <button class="seat-table t4" :class="{ 'selected': selectedSection === 'D' && selectedFloor === 5 }"
                    @click="getTime(5, 'D')">D</button>
            <button class="seat-table t5" :class="{ 'selected': selectedSection === 'E' && selectedFloor === 5 }"
                    @click="getTime(5, 'E')">E</button>
          </div>
        </div>
        <div class="seating-status-wrap">
          <div class="seating-status available">
            <p>예약 가능</p>
          </div>
          <div class="seating-status selected">
            <p>선택 좌석</p>
          </div>
          <div class="seating-status unable">
            <p>예약 불가능</p>
          </div>
        </div>
      </div>
      <div class="seat-wrap seat-stat">
        <div class="seat-stat-announcement" v-show="!isTimeTableVisible">
          <p>좌석을 선택해주세요</p>
        </div>
        <div class="seat-time-table" v-show="isTimeTableVisible">
          <div class="seat-time-table-wrap">
            <div class="time-select-wrap">
              <p>{{ selectedFloor }}층 {{ selectedSection }}테이블 예약 가능 시간</p>

              <div class="time-selector" v-if="reservationStore.reservationTimeList && reservationStore.reservationTimeList.seatIdx && reservationStore.reservationTimeList.seatIdx.length > 0">
                <div v-for="(seat, index) in reservationStore.reservationTimeList.seatIdx" :key="index">
                  <input
                      type="checkbox"
                      name="time"
                      :id="'time-' + (18+index)"
                      :value="seat"
                      v-model="selectedSeats"
                      :disabled="isSeatReserved(seat)"
                  />
                  <label :for="'time-' + (18+index)">{{ 18 + index }}:00 ~ {{ 19 + index }}:00</label>
                </div>
              </div>
            </div>
            <button class="time-select-btn" @click="reserve(selectedSeats)">예약하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia';
import { useReservationStore } from '../stores/useReservationStore';

export default {
  name: 'ReservationComponent',
  data() {
    return {
      selectedFloor: null,
      selectedSection: null,
      isTimeTableVisible: false,
      selectedSeats: [],
      reservationSuccess: false,
      reservationMessage: ''
    }
  },
  computed: {
    ...mapStores(useReservationStore)
  },
  methods: {
    getTime(floor, section) {
      this.selectedFloor = floor;
      this.selectedSection = section;
      this.isTimeTableVisible = true;
      this.selectedSeats = [];

      this.reservationStore.getTimeList(floor, section);
    },
    isSeatReserved(seat) {
      return this.reservationStore.reservationTimeList.reserveSeatIdx.includes(seat);
    },
    reserve(selectedSeats) {
      if (this.selectedSeats.length !== 0) {
        selectedSeats.sort();

        const reservationData = {
          selectedSeats: this.selectedSeats
        };

        this.reservationStore.createReservation(reservationData);

      } else {
        alert("시간대를 선택해주세요.");
      }
    }
  }
}
</script>

<style>
.container-wrap{
  //margin-top: 250px;
}

.container{
  display: flex;
  gap: 10px;
}

.seat-wrap{
  padding: 20px;
  background-color: rgb(231, 219, 204);
  height: 240px;
  width: 430px;
  position: relative;
  border-radius: 5px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);
}

.seat-table-wrap{
  position: absolute;
  padding: 10px;
  background-color: rgb(236, 234, 231);
  border-radius: 5px;
  width: 100px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);
}

.seat-table-label{

}

.seat-table{
  width: 100px;
  box-sizing: border-box;
  background-color: rgb(189, 168, 141);
  display: flex;
  align-items: center;
  justify-content: center;
  color:  rgb(78, 69, 57);
  font-weight: bold;
  font-size: 18px;
  height: 50px;
  border-radius: 5px;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.1);
  &:hover{
    background-color: rgb(255, 255, 255);
    color: rgb(189, 168, 141);
  }
  &:focus{
    background-color: rgb(78, 69, 57);
    color: rgb(189, 168, 141);
  }
  &:active{
    background-color: rgb(78, 69, 57);
    color: rgb(189, 168, 141);
  }
}
.seat-table.selected {
  background-color: rgb(78, 69, 57);
  color: rgb(189, 168, 141);
}
.f3{
  top: 20px;
  left: 20px;
}

.f4{
  top: 120px;
  left: 20px;
}

.f5{
  top: 40px;
  left: 150px;
  width: 270px;
  .seat-table-fifth{
    position: relative;
  }
  /* position: relative; */
  .seat-table{
    margin-bottom: 10px;
  }

  .seat-table:nth-child(2), .seat-table:nth-child(4){
    margin-bottom: 0;
  }
  .t3{
    left: 110px;
    position: absolute;
    top: 0;
  }
  .t4{
    left: 110px;
    position: absolute;
    top: 60px;
  }
  .t5{
    left: 220px;
    position: absolute;
    top: 0px;
    height: 110px;
    width: 50px;
    &:disabled{
      background-color: rgb(168, 161, 151);
      color: rgb(236, 234, 231);
    }
  }
}

.seating-status-wrap{
  background-color: rgb(242, 239, 234);
  padding: 8px;
  box-sizing: border-box;
  position: absolute;
  bottom: 20px;
  right: 30px;
  height: 40px;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  gap: 5px;
}

.seating-status{
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 12px;
}
.seating-status.available{
  color: rgb(78, 69, 57);
  background-color: rgb(189, 168, 141);
}

.seating-status.selected{
  color: rgb(189, 168, 141);
  background-color: rgb(78, 69, 57);
}

.seating-status.unable{
  color: rgb(236, 234, 231);
  background-color: rgb(168, 161, 151);
}

.seat-stat{
  display: flex;
  /* position: relative; */
}

.seat-stat-announcement{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  top: 45%;
  left: 35%;
  color: rgb(78, 69, 57);
  font-size: 20px;
  font-weight: bold;
  z-index: 1;
  position: absolute;
}
.seat-time-table{
  z-index: 10;
  display: flex;
  /* width: 100%; */
  background-color: rgb(242, 239, 234);
  height: 85%;
  width: 90%;
  box-sizing: border-box;
  position: absolute;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
}

.seat-time-table-wrap{
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: space-between;
  p{
    font-size: 18px;
    font-weight: bold;
    color: rgb(78, 69, 57);
  }
}

.time-select-wrap{
  display: flex;
  height: 100%;
  flex-direction: column;
}

.time-selector{
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
}

.time-select-btn{
  background-color: rgb(189, 168, 141);
  color: rgb(78, 69, 57);
  padding: 5px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  &:hover{
    background-color: rgb(78, 69, 57);
    color: rgb(189, 168, 141);
  }
  &:focus{
    background-color: rgb(78, 69, 57);
    color: rgb(189, 168, 141);
  }
}
</style>