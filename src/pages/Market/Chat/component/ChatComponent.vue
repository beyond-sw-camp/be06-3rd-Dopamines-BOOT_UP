<script setup>
import { ref } from "vue";
import ChatListItem from "@/pages/Market/Chat/component/ChatListItem.vue";
import ChatMessageUser from "@/pages/Market/Chat/component/ChatMessageUser.vue";
import ChatMessageOther from "@/pages/Market/Chat/component/ChatMessageOther.vue";
const userInfo = ref(JSON.parse(localStorage.getItem("user")));
</script>

<template>
  <div class="chat-list">
    <div v-for="chatRoom in chatRoomList" v-bind:key="chatRoom.idx">
      <ChatListItem
        :chatRoom="chatRoom"
        @isSelected="getMessages"
      ></ChatListItem>
    </div>
  </div>
  <div class="chat-window">
    <div class="chat-header"></div>
    <div class="chat-messages">
      <div class="chat-messages-container">
        <div v-for="message in chatStore.messages" v-bind:key="message.idx">
          <ChatMessageUser
            v-if="message.senderIdx == userInfo.userIdx"
            :time="message.createdAt"
            :user-message="message.content"
          ></ChatMessageUser>
          <ChatMessageOther
            v-else
            :time="message.createdAt"
            :others-message="message.content"
          ></ChatMessageOther>
        </div>
      </div>
    </div>
    <div class="chat-input">
      <input
        v-model="currentChat"
        type="text"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
      />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>
<script>
import { mapStores } from "pinia";
import { useChatStore } from "@/pages/Market/stores/UseChatStore";

export default {
  name: "ChatComponent",
  props: ["chatRoomList"],
  data() {
    return {
      currRoomIdx: "",
      currentChat: "",
    };
  },
  computed: {
    ...mapStores(useChatStore),
  },
  methods: {
    getMessages(roomIdx) {
      this.currRoomIdx = roomIdx;
      console.log("idx: " + roomIdx);
      this.chatStore.joinRoom(roomIdx);
    },
    sendMessage() {
      if (this.currentChat !== "" && this.currentChat !== " ") {
        this.chatStore.sendMessage(this.currRoomIdx, this.currentChat);
        this.currentChat = "";
      }
    },
  },
};
</script>

<style scoped>
.chat-list {
  width: 25%;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  background-color: white;
}
.chat-window {
  width: 75%;
  display: flex;
  flex-direction: column;
  background-color: white;
}
.chat-header {
  padding: 15px;
  border-bottom: 1px solid #ccc;
  background-color: #e06139;
  color: white;
  font-weight: bold;
}
.chat-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #fafafa;
  display: flex;
  flex-direction: column-reverse;
  gap: 10px;
  height: 100%;
  overflow-y: auto;
}
.chat-messages-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.chat-input {
  padding: 15px;
  border-top: 1px solid #ccc;
  background-color: #fff;
  display: flex;
}
.chat-input input {
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
}
.chat-input button {
  padding: 10px 20px;
  border: none;
  background-color: #e06139;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.chat-input button:hover {
  background-color: #cc5232;
}
</style>