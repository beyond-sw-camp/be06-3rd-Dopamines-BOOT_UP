<script setup>
import { defineProps } from "vue";

const props = defineProps({
  time: {
    type: String,
    required: true,
  },
  userMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="chat-messages-wrap user">
    <span class="message-time">{{ props.time }}</span>
    <div class="chat-message user">
      {{ props.userMessage }}
    </div>
  </div>
</template>

<style scoped>
.chat-messages-wrap {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}
.chat-messages-wrap user {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
}
.chat-message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  font-size: 14px;
  word-wrap: break-word;
}
.message-time {
  font-size: 12px;
  color: #888;
  top: -20px;
  height: fit-content;
  margin-top: auto;
}
.chat-message.user {
  background-color: #e06139;
  color: white;
  border-bottom-right-radius: 0;
  text-align: right;
}
.user .message-time {
  height: fit-content;
  margin-top: auto;
}
</style>