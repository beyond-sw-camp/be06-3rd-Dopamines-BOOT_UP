import { defineStore } from "pinia";
import axios from "axios";

// 전역 저장소 생성
export const useReservationStore = defineStore('reservation', {
    state: () => (
        {reservationList: [{ idx: 0, createdAt: "", time: "", section: "", floor: 0}]},
            {reservationTimeList: [[{ idx: 0 }], [{idx: 0,}]]}
    ),
    actions: {
        async getReservationDetail() {
            const response = await axios.get(
                `api/reservation/reservation-list?`,{ // 쿠키 포함
                    withCredentials: true
                }
            );

            console.log(response);

            this.reservationList = response.data.result;
        },

        async getTimeList(floor, section) {
            const response = await axios.get(
                `api/reservation/time-list?floor=${floor}&section=${section}`,
            );

            console.log(response);

            this.reservationTimeList = response.data.result;

            return response.data.result;
        },

        async createReservation(reservationData) {
            try{
                const response = await axios.post(
                    `api/reservation/reserve`,
                    reservationData,
                    // 쿠키 포함
                    { withCredentials: true }
                );

                console.log(response);

                return true;
            } catch (error) {
                console.error("Error: ", error);

                return false;
            }
        },

        async deleteReservation(idx) {
          try{
              const response = await axios.delete(`/api/reservation/cancel/${idx}`);

              console.log(response);
              return true;
          } catch (error) {
              console.error('Failed to delete post:', error);
              return false;
          }
        }
    }
});