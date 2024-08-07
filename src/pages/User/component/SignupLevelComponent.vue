<template>
  <h2 class="signup-title">회원가입</h2>
  <div class="join-top">
    <div class="step-container">
      <ul class="step-wrapper">
        <li class="step-content-wrapper">
          <div class="step-num">Step 01</div>
          <div class="step-txt">약관동의</div>
        </li>
        <li class="step-content-wrapper">
          <div class="step-num">Step 02</div>
          <div class="step-txt">정보입력</div>
        </li>
        <li class="step-content-wrapper">
          <div class="step-num">Step 03</div>
          <div class="step-txt">가입완료</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name : 'SignupComponent',
  props : {
    msg: String
  }
}
</script>

<style scoped>
.join-top{
  width: 100%;
}
.signup-title {
  font-size: 40px;
  line-height: 60px;
  text-align: center;
}

.info-box {
  background: #fff;
  border-radius: 3px;
}

.step-container {
  margin: 30px auto 0;
  border-top: 2px solid #252d32;
  border-bottom: 2px solid #252d32;
  padding: 30px 0;
}

.step-wrapper {
  display: flex;
  justify-content: space-between;
  max-width: 683px;
  margin: 0 auto;
  list-style: none;
}

.step-content-wrapper {
  list-style: none;
  padding: 0;
  margin: 0;
  text-decoration: none;
  color: #19191A;
}

ul,
li {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-style: normal;
  list-style: none;
}
</style>