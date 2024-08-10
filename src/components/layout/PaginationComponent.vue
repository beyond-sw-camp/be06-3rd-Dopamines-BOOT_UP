<template>
  <div class="pagination">
    <button
        v-for="page in totalPages"
        :key="page"
        @click="$emit('page-changed', page)"
        :class="{ active: page === currentPage }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
import {computed, defineProps} from 'vue';

const props = defineProps({
  totalItems: Number,
  itemsPerPage: Number,
  currentPage: Number,
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 5px;
}

button.active {
  font-weight: bold;
}
</style>
