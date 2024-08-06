<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import ChatListItem from "@/pages/Market/Chat/component/ChatListItem.vue";
import ChatMessageUser from "@/pages/Market/Chat/component/ChatMessageUser.vue";
import ChatMessageOther from "@/pages/Market/Chat/component/ChatMessageOther.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <div class="chat-container">
      <div class="chat-list">
        <ChatListItem></ChatListItem>
      </div>
      <div class="chat-window">
        <div class="chat-header">Chat with User 1</div>
        <div class="chat-messages">
          <ChatMessageUser
            time="11:40 PM"
            user-message="Hi How are you!"
          ></ChatMessageUser>
          <ChatMessageOther
            others-message="I'm fine thank you~"
            time="11: 50 PM"
          ></ChatMessageOther>
        </div>
        <div class="chat-input">
          <input type="text" placeholder="Type your message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  width: 1000px;
  display: flex;
  margin-top: 150px;
}
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