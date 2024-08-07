import { defineStore } from "pinia";
import axios from "axios";

// 전역 저장소 생성
export const useReservationStore = defineStore('reservation', {
    state: () => (
        {reservationList: [{ createdAt: "", time: "", section: "", floor: 0}]},
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
            console.log(this.reservationTimeList);
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

                alert("예약이 성공적으로 완료되었습니다.");
            } catch (error) {
                console.error("Error: ", error);
                alert("예약에 실패했습니다. 다시 시도해주세요.");
            }
        }
    }
});