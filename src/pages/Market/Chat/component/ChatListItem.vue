<script setup>
</script>

<template>
  <div class="chat-list-item" @click="$emit('isSelected', chatRoom.idx)">
    <div class="chat-list-item-title">
      <strong>{{ chatRoom.buyer }}</strong>
      <span class="message-time">{{ chatRoom.updatedAt }}</span>
    </div>
    <div class="chat-list-item-content">
      <img
        :src="chatRoom.product.mainImage"
        alt="Product Image"
        class="product-image"
      />
      <div class="product-info">
        <p class="product-title">{{ chatRoom.product.title }}</p>
        <p class="product-price">{{ chatRoom.product.price }}원</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChatListItem",
  props: ["chatRoom"],
  emits: ["isSelected"],
  computed: {},
};
</script>

<style scoped>
.chat-list-item {
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.3s;
  .chat-list-item-title {
    display: flex;
    justify-content: space-between;
  }
  strong {
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

.chat-list-item-content {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.product-title,
.product-price {
  margin: 0; /* 텍스트 사이의 기본 마진을 제거합니다 */
  line-height: 1.5; /* 줄 간격을 조정합니다 */
}

.product-image {
  width: 60px; /* 이미지 크기를 조정합니다 */
  height: 60px;
  object-fit: cover;
  margin-right: 20px; /* 이미지와 텍스트 사이의 간격을 조정합니다 */
  border-radius: 5px; /* 이미지에 라운드를 줍니다 */
}
</style>