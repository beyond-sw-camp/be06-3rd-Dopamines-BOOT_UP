<template>
  <div class="signup-container">
    <div>
      <SignupTopComponent></SignupTopComponent>
    </div>
    <h2 class="signup-title">Beyond Software에 오신것을 환영합니다.</h2>
    <div class="content-container">
      <!-- Todo : div 값이 깨짐 -->
      <div class="social-signup-container">
        <span class="social-design">SNS 회원가입
          <SocialButtonComponent></SocialButtonComponent>
        </span>
      </div>
      <div class="signup-description">
        <span>회원가입에 필요한 기본정보를 입력해주세요.</span>
      </div>
    </div>
    <form class="signup-form " method="POST"><input type="hidden" name="remember" value="true">
      <div>
        <div class="signup-wrapper">

          <div><label for="email-address" class="signup-wrapper-text">이메일 </label>
            <div class="signup-wrapper-distance">
              <div class="email-input-wrapper">
                <input id="email-address" v-model="email" type="email" autocomplete="email" required="" class="signup-input-box signup-input-text email-input" placeholder="munchkin@okky.kr" name="email">
                <button  @click="authenticate" class="authentication-btn">인증하기</button>
              </div>
              <div v-if="showInput">
                <input type="text" v-model="emailCheck" class="email-check-input"> <button class="email-check-btn"> 확인하기 </button>
              </div>
            </div>
          </div>

          <div><label for="password" class="signup-wrapper-text">비밀번호</label>
            <div class="signup-wrapper-distance">
              <input id="password" v-model="password" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" name="password"></div>
          </div>

          <div><label for="passwordCheck" class="signup-wrapper-text">비밀번호 확인</label>
            <div class="signup-wrapper-distance">
              <input id="passwordCheck" v-model="passwordCheck" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" name="password"></div>
          </div>

          <div><label for="fullName" class="signup-wrapper-text">실명</label>
            <div class="signup-wrapper-distance">
              <input id="fullName" v-model="name" type="text" required="" class="signup-input-box signup-input-text" placeholder="홍길동" name="fullName"></div>
          </div>

          <div><label for="nickname" class="signup-wrapper-text">닉네임</label>
            <div class="signup-wrapper-distance">
              <input id="nickname" v-model="nickname" type="text" required="" class="signup-input-box signup-input-text" placeholder="별명을 알파벳, 한글, 숫자를 20자 이하로 입력해주세요." name="nickname"></div>
          </div>

          <div><label for="phoneNumber" class="signup-wrapper-text">휴대폰 번호</label>
            <div class="signup-wrapper-distance">
              <input id="phoneNumber" v-model="phoneNumber" type="text" required="" class="signup-input-box signup-input-text" placeholder="4~15자 이내로 입력해주세요" name="id"></div>
          </div>

          <div><label for="address" class="signup-wrapper-text">주소</label>
            <div class="signup-wrapper-distance">
              <input id="address" v-model="address" type="text" required="" class="signup-input-box signup-input-text" placeholder="4~15자 이내로 입력해주세요" name="id"></div>
          </div>
        </div>
      </div>
      <router-link to="/signup-success-page">
        <SubmitButtonComponent :isAccess="isAccess"></SubmitButtonComponent>
      </router-link>
      <p class="lead-login-url-text"><span>이미 회원이신가요?</span><a class="lead-login-url" href="https://okky.kr/login">로그인</a></p>
    </form>
  </div>
</template>


<script>
import SignupTopComponent from '@/components/signup/SignupTopComponent.vue'
import SubmitButtonComponent from '@/components/common/SubmitButtonComponent.vue'
import SocialButtonComponent from '@/components/common/SocialButtonComponent'

export default {
  name: "UserInfoComponent",
  components : {
    SignupTopComponent,
    SubmitButtonComponent,
    SocialButtonComponent
  },
  data(){
    return {
      email:"",
      emailCheck:"",
      password: "",
      passwordCheck: "",
      name: "",
      nickname: "",
      phoneNumber: "",
      address: "",

      isAccess : false,
      showButton: true,
      showInput: false
    };
  },
  updated() {
    this.inputCheck();
  },
  methods: {
    inputCheck(){
      if (this.email && this.emailCheck && this.password &&this.passwordCheck &&this.name && this.nickname && this.phoneNumber && this.address) {
        this.isAccess = true;
      }
    },
    authenticate() {
      this.showButton = false;
      this.showInput = true;
    }
  }
}
</script>

<style scoped>
.signup-container{
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width:1200px;
  margin-top: 150px;
}
.signup-title{
  text-align: center;
}
.social-signup-container{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.signup-description{
  margin: 10px 0;
  text-align: center;
}
.signup-wrapper{
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.signup-wrapper-text{
  /* font-size: .875rem;
  line-height: 1.25rem; */
}
.signup-input-box{
  padding-left: 10px;
  width: 100%;
  padding-top: .5rem;
  padding-bottom: .5rem;
  border-color: hsla(220, 9%, 46%, .3);
  border-width: 1px;
  border-radius: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
}
.singup-input-text{
  /* font-size: .875rem; */
  /* line-height: 1.25rem; */
}
.email-input-wrapper{
  display: flex;
  justify-content: space-between;
}
.email-input{
  width: calc(100% - 150px);
}
.email-check-input{
  height: 20px;
  border-radius: 5px;
  border-color: hsla(220, 9%, 46%, .3);
}
.email-check-btn{
  width: 130px;
  height: 30px;
  margin-bottom: 10px;
  background-color: #E06139;
  border-radius: 5px;
  color: #fff;
  border: 0px;
}

.signup-wrapper-distance {
  margin-top: 10px;
}
.authentication-btn{
  width: 130px;
  margin-bottom: 10px;
  background-color: #E06139;
  border-radius: 5px;
  color: #fff;
  border: 0px;
}
.authentication-btn-disabled{
  width: 130px;
  margin-bottom: 10px;
  background-color: #82827F;
  border-radius: 5px;
  color: #fff;
  border: 0px;
}
.lead-login-url-text{
  display : flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  /* text-align: center; */
  /* font-size: .875rem; */
}
.lead-login-url{
  font-size: .875rem;
  display: flex;
  text-align: center;
  --tw-text-opacity: 1;
  color : #E06139
}
</style>