<script setup>
import { defineProps } from "vue";

const props = defineProps({
  time: {
    type: String,
    required: true,
  },
  othersMessage: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="chat-message-wrap other">
    <div class="chat-message other">
      {{ props.othersMessage }}
    </div>
    <span class="message-time">{{ props.time }}</span>
  </div>
</template>

<style scoped>
.chat-message-wrap {
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}
.chat-message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  position: relative;
  font-size: 14px;
  word-wrap: break-word;
}
.message-time {
  font-size: 12px;
  color: #888;
  height: fit-content;
  margin-top: auto;
}
.chat-message.other {
  background-color: #e1e1e1;
  color: black;
  border-bottom-left-radius: 0;
}
.other .message-time {
  left: 0;
}
</style>