<script>

import {defineComponent} from "vue";
import MainHeader from "@/components/layout/MainHeader.vue";
import SocialLoginBtn from "@/pages/User/component/SocialLoginBtn.vue";
import SubmitBtn from "@/components/button/SubmitBtn.vue";

export default defineComponent({
  name: "LoginPage",
  data(){
    return {
    }
  },
  components: {
    SocialLoginBtn,
    MainHeader,
    SubmitBtn
  }
})
</script>

<template>
  <div class="body-container">
    <MainHeader></MainHeader>
    <main>
        <div class="login-container">
          <h2 class="login-title">Beyond SW 에 오신것을 환영합니다.</h2>
          <div class="content-container">
            <span class="social-login-title">SNS 로그인</span>
            <SocialLoginBtn></SocialLoginBtn>
            <div class="login-subtitle">
              <hr>
              <span> BOOT UP 아이디로 로그인 </span>
              <hr>
            </div>
            <form class="login-form">
              <div class="login-form-container">
                <div class="id-wrapper">
                  <label for="user-id">아이디</label>
                  <input id="user-id" type="text" autocomplete="name" class="login-input" name="userId">
                </div>
                <div class="pw-wrapper">
                  <label for="user-pw">비밀번호</label>
                  <input id="user-pw" type="password" autocomplete="current-password" class="login-input" name="password">
                </div>
              </div>
              <div class="button-container">
                <SubmitBtn text="로그인"></SubmitBtn>
              </div>
              <p class="not-member-wrapper"><span>아직 회원이 아니신가요?</span>
                <router-link class="signup-link" to="/signup-agree">회원가입</router-link>
              </p>
            </form>
          </div>
        </div>
    </main>
  </div>
</template>

<style>
.body-container{
  width: 100%;
  //max-width: 800px;
}
.login-container {
  max-width: 800px;
  width: 100%;
}

.login-title {
  text-align: center;
}

.login-subtitle {
  margin-top: 30px;
  text-align: center;
  font-weight: 700;
  color: #E06139;
  display: flex;
  hr{
    width: 300px;
    height: 2px;
    background-color: #E06139;
    border: 0;
    border-radius: 5px;
  }
}

.login-form {
  margin-top: 20px;
}

.login-form-container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.login-input{
  border-radius: 5px;
  border: 1px solid hsla(220, 9%, 46%, .3);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  box-sizing: border-box;
  line-height: 1.5rem;
  width: 100%;
  border-radius: 5px;
  margin-top: 10px;
}

.button-container {
  margin-top: 30px;
}

.not-member-wrapper {
  gap : 10px;
  display: flex;
  justify-content: center;
}

.signup-link {
  color: #E06139;
}
</style>