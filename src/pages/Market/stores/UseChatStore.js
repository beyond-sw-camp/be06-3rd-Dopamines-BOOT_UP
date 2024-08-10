import { defineStore } from "pinia";
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
                    console.log("소켓 연결 성공", frame);
                    this.getChatRooms()
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

            this.chatRoomList.forEach((room) => {
                if (this.stompClient) { //구독 
                    this.stompClient.subscribe(`/sub/room/${room.idx}`, this.onMessageReceived); ///sub/room/${roomId}
                }
            })

            console.log(this.chatRoomList)
        },

        async joinRoom(roomIdx) {
            console.log("[UseChatStore] joinRoom() ==========>")
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