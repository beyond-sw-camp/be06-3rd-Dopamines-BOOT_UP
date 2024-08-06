<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import CommentInput from './CommentInput.vue';
import CommentView from './CommentView.vue';

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['update:comments']);
const localComments = ref([...props.comments]);

watch(() => props.comments, (newComments) => {
  localComments.value = [...newComments];
});

function commentSubmit(comment) {
  localComments.value.push(comment);
  emit('update:comments', localComments.value);
}
</script>

<template>
  <div>
    <CommentInput @comment-submit="commentSubmit"></CommentInput>
    <div>
      <div class="comment-view-container">
        <div class="top-line"></div>
        <div class="comment-view-wrapper">
          <ul class="comment-view-detail-container">
            <li v-for="(comment, index) in localComments" :key="index" :id="'answer-' + index">
              <CommentView v-bind="comment"></CommentView>
            </li>
          </ul>
        </div>
        <div class="bottom-line"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>