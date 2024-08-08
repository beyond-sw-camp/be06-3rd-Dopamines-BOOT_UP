<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import MainHeader from '@/components/layout/MainHeader.vue';
import SocialLoginBtn from '@/pages/User/component/SocialLoginBtn.vue';
import SubmitBtn from '@/components/button/SubmitBtn.vue';
import { useLoginStore } from '@/pages/User/stores/useLoginStore';
import MainFooter from "@/components/layout/MainFooter.vue";

const loginStore = useLoginStore();
const router = useRouter();
const userEmail = ref('');
const password = ref('');
const error = ref('');

const handleLogin = async () => {
  error.value = ''; // Reset error message
  try {
    const success = await loginStore.login({ email: userEmail.value, password: password.value });
    if (success) {
      await router.push('/');
    } else {
      error.value = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
    }
  } catch (e) {
    console.error(e);
    error.value = '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.';
  }
};

const isDisabled = computed(() => {
  return !userEmail.value || !password.value;
});
</script>

<template>
  <div class="body-container">
    <MainHeader />
    <main>
      <div class="login-container">
        <h2 class="login-title">Beyond SW에 오신 것을 환영합니다.</h2>
        <div class="content-container">
          <span class="social-login-title">SNS 로그인</span>
          <SocialLoginBtn />
          <div class="login-subtitle">
            <hr />
            <span>BOOT UP 아이디로 로그인</span>
            <hr />
          </div>
          <form class="login-form" @submit.prevent="handleLogin">
            <div class="login-form-container">
              <div class="id-wrapper">
                <label for="user-id">아이디</label>
                <input id="user-id" type="text" autocomplete="name" class="login-input" v-model="userEmail" />
              </div>
              <div class="pw-wrapper">
                <label for="user-pw">비밀번호</label>
                <input id="user-pw" type="password" autocomplete="current-password" class="login-input" v-model="password" />
              </div>
            </div>
            <div class="button-container">
              <SubmitBtn :handle-submit="handleLogin" :is-disabled="isDisabled" text="로그인"></SubmitBtn>
            </div>
            <p class="not-member-wrapper">
              <span>아직 회원이 아니신가요?</span>
              <router-link class="signup-link" to="/user/signup/agree">회원가입</router-link>
            </p>
            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>
      </div>
    </main>
    <MainFooter />
  </div>
</template>

<style>
.body-container {
  width: 100%;
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

  hr {
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

.login-input {
  border-radius: 5px;
  border: 1px solid hsla(220, 9%, 46%, .3);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, .05);
  box-sizing: border-box;
  line-height: 1.5rem;
  width: 100%;
  margin-top: 10px;
}

.button-container {
  margin-top: 30px;
}

.not-member-wrapper {
  gap: 10px;
  display: flex;
  justify-content: center;
}

.signup-link {
  color: #E06139;
}
</style>