<script setup>
</script>

<template>
  <div class="search-area">
    <div class="search-wrap">
      <div class="search-box">
        <input
          autocomplete="off"
          type="text"
          placeholder="검색어를 입력하세요"
          v-model="searchQuery"
        />
        <button
          aria-label="search"
          type="button"
          @click="$emit('isSearched', searchQuery)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            aria-hidden="true"
          >
            <g fill="none" fill-rule="evenodd" stroke="#222" stroke-width="2">
              <circle
                cx="11.111"
                cy="11.111"
                r="7.111"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></circle>
              <path d="m20 20-3.867-3.867"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBarComponent",
  emits: ["isSearched"],
  data() {
    return {
      searchQuery: "",
    };
  },
};
</script>


<style scoped>
.search-area {
  position: relative;
}

.search-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1060px;
  margin: 0px auto;
  display: flex;
  align-items: center;
}

.search-box {
  width: 480px;
  height: 40px;
  padding: 0px 20px;
  background-color: rgb(255, 255, 255);
  position: relative;
  border-radius: 100px;
  border: 1px solid #e06139;
  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 40px 0px 44px;
    height: 40px;
    border: none;
    color: rgb(0, 0, 0);
    position: absolute;
    right: 0px;
    background-color: transparent;
    font-size: 16px;
    line-height: 24px;
  }
  button {
    position: absolute;
    left: 10px;
    top: 8px;
    g {
      stroke: #e06139;
    }
  }
}
</style>