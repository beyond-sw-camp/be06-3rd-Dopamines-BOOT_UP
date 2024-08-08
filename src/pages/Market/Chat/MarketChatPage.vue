<script setup>
import MainHeader from "@/components/layout/MainHeader.vue";
import ChatComponent from "@/pages/Market/Chat/component/ChatComponent.vue";
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <div class="chat-container">
      <ChatComponent
        :chatRoomList="this.chatStore.chatRoomList"
      ></ChatComponent>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useChatStore } from "@/pages/Market/stores/UseChatStore";

export default {
  name: "MarketChatPage",
  data() {
    return {};
  },
  computed: {
    ...mapStores(useChatStore),
  },
  mounted() {
    console.log("mounted 입니다.");
    this.chatStore.connect();
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.chat-container {
  width: 1000px;
  height: 600px;
  display: flex;
  margin: 0 auto;
  margin-top: 180px;
}
</style>