<script setup>
import { onMounted } from "vue";
import { useChatStore } from "@/pages/Market/stores/UseChatStore";
import MainHeader from "@/components/layout/MainHeader.vue";
import MainFooter from "@/components/layout/MainFooter.vue";
import ChatComponent from "@/pages/Market/Chat/component/ChatComponent.vue";

const chatStore = useChatStore();

onMounted(() => {
  chatStore.connect();
});
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <div class="chat-container">
      <ChatComponent :chatRoomList="chatStore.chatRoomList" />
    </div>
  </div>
  <MainFooter></MainFooter>
</template>

<style scoped>
.chat-container {
  width: 1000px;
  height: 600px;
  display: flex;
  margin: 0 auto;
  margin-top: 180px;
}
</style>
