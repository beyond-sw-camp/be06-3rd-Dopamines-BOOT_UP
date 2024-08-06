<script setup>
import SubmitBtn from '../../components/button/SubmitBtn.vue';
import {ref} from "vue";

const signupUser = ref('');
signupUser.value = '회원1';
</script>

<template>
  <div>
    <div class="success-container">
      <div class="">
        <div class="success-item">
          <img src="@/assets/img/signupSuccessImg.svg" alt=""/>
          <h2 class="welcome-text-wrapper">
            <p class="welcome-text">
              <span>환영합니다!</span>
              <span><span class="welcome-name">{{ signupUser }}</span>님</span>
            </p>
          </h2>
        </div>
        <div class="">
          <div class="success-container-down">
            <div class="">
              <p class="success-text">
                회원가입이 성공적으로 완료되었습니다. <br>
                아래 로그인 버튼을 눌러 다시한번 로그인 해주세요.
              </p>
            </div>
          </div>
          <div class="button-container">
            <SubmitBtn text="로그인"></SubmitBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.success-container{
  margin-top: 8rem;
  justify-content: center;
  display: flex;
  width: 100%
}
.success-item{
  align-items: center;
  flex-direction: column;
  display: flex;
}
.welcome-text-wrapper{
  font-size: 1.875rem;
  line-height: 2.25rem;
  text-align: center;
  margin-top: .125rem;
  margin-bottom: 0;
}
.welcome-text{
  flex-direction: column;
  display: flex;
  margin-bottom: 0;
}
.welcome-name{
  color: #E06139;
}

.success-container-down{
  padding: 1rem;
  width: 100%;
}
.success-text{
  text-align: center
}
.button-container{
  width: 200px;
  margin-left: 100px;
}
</style>