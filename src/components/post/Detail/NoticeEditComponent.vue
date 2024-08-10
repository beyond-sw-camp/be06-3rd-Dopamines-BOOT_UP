<template>
  <div class="parent">
    <div class="first">
      <input type="checkbox" name="isPrivate" >
      <label for="isPrivate">비공개</label>
    </div>
    <div class="second">
      <select>
        <option value="all">선택</option>
        <option value="lecture">특강</option>
        <option value="break">휴강</option>
        <option value="exsam">평가</option>
      </select>
    </div>
  </div>
</template>

<script></script>

<style scoped>
  .parent {
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
  }

  .first, .second {
    margin:30px; /* 두 div 사이의 간격 조절 */
  }
</style>