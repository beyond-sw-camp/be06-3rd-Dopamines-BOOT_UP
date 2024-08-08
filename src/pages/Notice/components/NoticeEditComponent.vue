<script setup>
import { ref, watch } from "vue";
import { defineEmits } from "vue";

const emit = defineEmits(['edit']);

const category = ref('');
const isPrivate = ref(false);

watch([category, isPrivate], () => {
  emit('edit', { category: category.value, isPrivate: isPrivate.value });
});

</script>

<template>
  <div>
    <div>
      <label for="category">Category:</label>
      <input id="category" v-model="category" />
    </div>
    <div>
      <label for="isPrivate">Private:</label>
      <input id="isPrivate" type="checkbox" v-model="isPrivate" />
    </div>
  </div>
</template>
