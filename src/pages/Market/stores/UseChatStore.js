import { defineStore } from "pinia";
// import { useMemberStore } from "@/stores/UseMemberStore";
import axios from "axios";
const backend = "/api";
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'


//전역 저장소 생성
export const useChatStore = defineStore("chat", {
    state: () => ({
        chatRoomList: [],
        messages: [],
        socket: null,
        stompClient: null
    }),

    actions: {
        async connect() {
            console.log("[UseChatStore] connect() ==========>")
            const serverURL = "http://localhost:8080/ws"
            // 쿠키 설정을 위한 초기 HTTP 요청
            // await axios.get(serverURL, { withCredentials: true });

            this.socket = new SockJS(serverURL);
            this.stompClient = Stomp.over(this.socket);
            console.log(`소켓 연결을 시도합니다. 서버 주소: ${serverURL}`);

            this.stompClient.connect(
                {},
                (frame) => {
                    // 소켓 연결 성공
                    // this.connected = true;
                    console.log("소켓 연결 성공", frame);
                    this.getChatRooms()
                    // // 서버의 메시지 전송 endpoint를 구독합니다.
                    // // 이런형태를 pub sub 구조라고 합니다.
                    // this.stompClient.subscribe("/send", (res) => {
                    //     console.log("구독으로 받은 메시지 입니다.", res.body);

                    //     // 받은 데이터를 json으로 파싱하고 리스트에 넣어줍니다.
                    //     this.recvList.push(JSON.parse(res.body));
                    // });
                },
                (error) => {
                    // 소켓 연결 실패
                    console.log("소켓 연결 실패", error);
                    // this.connected = false;
                }
            );
        },

        async getChatRooms() {
            console.log("[UseChatStore] getChatRooms() ==========>")
            let url = backend + `/chat/rooms`
            let response = await axios.get(url, { withCredentials: true });

            this.chatRoomList = response.data.result;
            console.log(this.chatRoomList)
        },

        async joinRoom(roomIdx) {
            console.log("[UseChatStore] joinRoom() ==========>")

            if (this.stompClient) { //구독 
                this.stompClient.subscribe(`/sub/room/${roomIdx}`, this.onMessageReceived); ///sub/room/${roomId}
            }

            console.log("roomIdx = " + roomIdx)

            let url = backend + `/chat/rooms/${roomIdx}/messages`
            const response = await axios.get(url, { withCredentials: true });

            this.messages = response.data.result;
            console.log("메시지>>" + this.messages)
        },

        async onMessageReceived(payload) {
            console.log("[UseChatStore] onMessageReceived() ==========>")
            let message = JSON.parse(payload.body);
            console.log("메시지가 왔습니다! : " + message)
            this.messages.push(message)

        },


        async sendMessage(roomIdx, message) {
            console.log("[UseChatStore] sendMessage() ==========>")

            let values = JSON.parse(localStorage.getItem('user'))

            let chatMessage = {
                content: message,
                roomId: roomIdx,
                type: "CHAT",
                sender: values.userNickName,
                senderIdx: values.userIdx
            };

            this.stompClient.send(
                `/pub/chat.sendMessage/${roomIdx}`,
                JSON.stringify(chatMessage)
            );

        }

    }
})