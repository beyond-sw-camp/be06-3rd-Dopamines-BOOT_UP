<template>
  <div class="signup-container">
    <div>
      <SignupLevelComponent></SignupLevelComponent>
    </div>
    <h2 class="signup-title">Beyond Software에 오신것을 환영합니다.</h2>
    <div class="content-container">
      <!-- Todo : div 값이 깨짐 -->
      <div class="social-signup-container">
        <span class="social-design">SNS 회원가입
          <SocialLoginBtn></SocialLoginBtn>
        </span>
      </div>
      <div class="signup-description">
        <span>회원가입에 필요한 기본정보를 입력해주세요.</span>
      </div>
    </div>

      <div>
        <div class="signup-wrapper">
          <Form :validation-schema="schema" class="signup-form" @submit="inputCheck">
            <div><label for="email-address" class="signup-wrapper-text">이메일 </label>
              <div class="signup-wrapper-distance">
                <div class="email-input-wrapper">
                  <!-- Todo : disabled되면 색깔 변하게-->
                  <input
                    id="email-address"
                    :disabled="disabledButton"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="signup-input-box signup-input-text email-input"
                    placeholder="munchkin@okky.kr"
                    name="email"
                  />        
                  <ErrorMessage name="email" />          
            <button  @click="authenticate" :disabled="disabledButton" :class="{'email-check-btn': true, 'authentication-btn-disabled': disabledButton}">인증하기</button>
                </div>
                <div v-if="showInput">
                  <input type="text" name="emailCheck" :disabled="disabledButton" v-model="uuid" class="email-check-input"> <button @click="verify" :disabled="disabledButton" :class="{'email-check-btn': true, 'authentication-btn-disabled': disabledButton}"> 확인하기 </button>
                </div>
              </div>
            </div>
          </Form>
          <div><label for="password" class="signup-wrapper-text">비밀번호</label>
            <div class="signup-wrapper-distance">
              <Field id="password" v-model="password" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" name="password"></Field></div>
          </div>

          <div><label for="passwordCheck" class="signup-wrapper-text">비밀번호 확인</label>
            <div class="signup-wrapper-distance">
              <Field id="passwordCheck" v-model="passwordCheck" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" name="password"></Field></div>
          </div>

          <div><label for="fullName" class="signup-wrapper-text">실명</label>
            <div class="signup-wrapper-distance">
              <Field id="fullName" v-model="name" type="text" required="" class="signup-input-box signup-input-text" placeholder="홍길동" name="fullName"></Field></div>
          </div>

          <div><label for="nickname" class="signup-wrapper-text">닉네임</label>
            <div class="signup-wrapper-distance">
              <Field id="nickname" v-model="nickname" type="text" required="" class="signup-input-box signup-input-text" placeholder="별명을 알파벳, 한글, 숫자를 20자 이하로 입력해주세요." name="nickname"></Field></div>
          </div>

          <div><label for="phoneNumber" class="signup-wrapper-text">휴대폰 번호</label>
            <div class="signup-wrapper-distance">
              <Field id="phoneNumber" v-model="phoneNumber" type="text" required="" class="signup-input-box signup-input-text" placeholder="4~15자 이내로 입력해주세요" name="id"></Field></div>
          </div>

          <div><label for="address" class="signup-wrapper-text">주소</label>
            <div class="signup-wrapper-distance">
              <Field id="address" v-model="address" type="text" required="" class="signup-input-box signup-input-text" placeholder="4~15자 이내로 입력해주세요" name="id"></Field></div>
          </div>
        </div>
      </div>
 
      <!-- v-if 로 활성화 및 색깔-->
      <div @click="signup">
        <SubmitBtn :isDisabled="isDisabled" text="회원가입"></SubmitBtn>  <!--자식 컴포넌트한테 emit 으로 이벤트 전달받기-->
      </div>
      <p class="lead-login-url-text"><span>이미 회원이신가요?</span><a class="lead-login-url" href="https://okky.kr/login">로그인</a></p>
  </div>
</template>


<script>
import SignupLevelComponent from '../component/SignupLevelComponent.vue'
import SubmitBtn from "@/components/button/SubmitBtn.vue";
import SocialLoginBtn from "@/pages/User/component/SocialLoginBtn.vue";
import { useUserStore } from '../stores/useUserStore';
import { Field,Form,ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: "UserInfoComponent",
  components : {
    SubmitBtn,
    SignupLevelComponent,
    SocialLoginBtn,
    Form,
    Field,
    ErrorMessage
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
      uuid:"",

      disabledButton:false,
      isAccess : true,
      showButton: true,
      showInput: false,
      isDisabled : true,

      schema : yup.object({
        email: yup.string().email('유효한 이메일을 입력해주세요').required('이메일은 필수입니다'),
        password: yup.string().min(6, '비밀번호는 최소 6자 이상이어야 합니다').required('비밀번호는 필수입니다'),
        passwordCheck: yup.string()
          .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다')
          .required('비밀번호 확인은 필수입니다'),
        name: yup.string().required('실명은 필수입니다'),
        nickname: yup.string().max(20, '닉네임은 20자 이내로 입력해주세요').required('닉네임은 필수입니다'),
        phoneNumber: yup.string().min(4, '휴대폰 번호는 4자 이상이어야 합니다').max(15, '휴대폰 번호는 15자 이내여야 합니다').required('휴대폰 번호는 필수입니다'),
        address: yup.string().min(4, '주소는 4자 이상이어야 합니다').max(15, '주소는 15자 이내여야 합니다').required('주소는 필수입니다'),
      })
    };
  },
  updated() {
    this.inputCheck();
  },

  setup(){
    // const email = ref('');
    // const password = ref('');
    // const passwordCheck = ref('');
    // const name = ref('');
    // const nickname = ref('');
    // const phoneNumber = ref('');
    // const address = ref('');
    // const uuid = ref('');
    // const disabledButton = ref(false);
    // const showInput = ref(false);
    
  },

  methods: {
    inputCheck(){
      if (this.email && this.disabledButton && this.password && this.passwordCheck &&this.name && this.nickname && this.phoneNumber && this.address) {
        this.isDisabled = false;
      }
    },
    authenticate() {
      try{
        const userStore = useUserStore();
        // userStore.email = this.email;
        userStore.emailRequest(this.email);
      } catch(error){console.log("이메일 요청 실패",error)}

      this.showInput = true;  //인증하기 버튼 누르면 인풋 활성화
      // this.showButton = false;
    },
    verify(){
      try{
        const userStore = useUserStore();
        
        userStore.emailVerify(this.email,this.uuid)
        .then(rs => {
            console.log("넘어온 result: " + rs);
          if(rs === true){
            console.log("비활성화 할게유");
            alert("이메일 인증에 성공하였습니다.")
            this.disabledButton = true;
          } else{
            alert("이메일 인증에 실패하였습니다.")
            this.disabledButton = false;
          }
        });
      } catch(error){console.log("이메일 인증 실패",error)}
    },
    signup(){
      console.log("isDisabled : " + this.isDisabled);
      if(!this.isDisabled){
        const userStore = useUserStore();
        userStore.signup(this.email, this.password, this.nickname, this.name, this.phoneNumber,this.address);
        this.$router.push('success');
      }
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
  background-color: #f5a790;
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