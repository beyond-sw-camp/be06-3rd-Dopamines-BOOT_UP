<script setup>
import { defineProps } from 'vue';

defineProps({
  author: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createAt: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="comment-view">
    <p><strong>{{ author }}</strong> - {{ createAt }}</p>
    <p>{{ comment }}</p>
  </div>
</template>

<style scoped>
.comment-view {
  padding: 1rem;
  border-bottom: 1px solid #ccc;
}
</style>