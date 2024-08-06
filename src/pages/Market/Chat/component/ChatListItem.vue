<script setup>

</script>

<template>
  <div class="chat-list-item">
    <div class="chat-list-item-title">
      <strong>User 1</strong>
      <span class="message-time">12:30 PM</span>
    </div>
    <p>Last message preview...</p>
  </div>
</template>

<style scoped>
.chat-list-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
  .chat-list-item-title{
    display: flex;
    justify-content: space-between;
  }
  strong{
    line-height: 40px;
  }
}
.chat-list-item:hover {
  background-color: #f9f9f9;
}
.chat-list-item strong {
  font-size: 16px;
}
.chat-list-item .message-time {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}
</style>