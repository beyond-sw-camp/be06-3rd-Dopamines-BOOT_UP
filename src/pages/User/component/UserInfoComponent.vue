<template>
  <div class="signup-container">
    <div>
      <SignupLevelComponent></SignupLevelComponent>
    </div>
    <h2 class="signup-title">Beyond Software에 오신것을 환영합니다.</h2>
    <div class="content-container">
      <div class="social-signup-container">
        <span class="social-design">SNS 회원가입</span>
        <SocialLoginBtn></SocialLoginBtn>
      </div>
      <div class="signup-description">
        <span>회원가입에 필요한 기본정보를 입력해주세요.</span>
      </div>
    </div>

      <div class="signup-area">
        <div class="signup-wrapper">
          <Form :validation-schema="schema" class="signup-form">
              <div class="signup-wrapper-distance">
                <label for="email-address" class="signup-wrapper-text">이메일 </label>
                <div class="email-input-wrapper">
                  <!-- Todo : disabled되면 색깔 변하게-->
                  <div style="display: flex; justify-content: space-between">
                    <Field
                        id="email-address"
                        :disabled="disabledButton"
                        v-model="email"
                        name="email"

                        class="signup-input-box signup-input-text email-input"
                        placeholder="이메일@test.com"
                    />
                    <button @click="authenticate"
                            :disabled="!email"
                            :class="{'email-check-btn': true, 'authentication-btn-disabled': !email}">인증하기
                    </button>
<!--                   email-address Field에 value 들어왔을 때 authenticate email-check btn이 활성화 됐으면 좋겠어 -->
                  </div>
                  <div class="email-verify-wrapper">
                    <ErrorMessage name="email" class="warning-alert" style="margin-bottom: 0; width: 70%"/>
                    <div v-if="showInput" class="email-verify-input">
                      <Field type="text" name="emailCheck" :disabled="disabledButton" v-model="uuid" class="email-check-input signup-input-box"/>
                      <button @click="verify" :disabled="disabledButton" :class="{'email-check-btn': true, 'authentication-btn-disabled': !uuid}"> 확인하기 </button>
                    </div>
                  </div>
              </div>
            </div>
  
          <div class="input-wrapper">
            <label for="password" class="signup-wrapper-text">비밀번호</label>
            <div class="signup-wrapper-distance">
              <Field id="password" name="password" v-model="password" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" ></Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="password" class="warning-alert"/>
            </div>
          </div>
  
          <div class="input-wrapper">
            <label for="passwordConfirm" class="signup-wrapper-text">비밀번호 확인</label>
            <div class="signup-wrapper-distance">
              <Field id="passwordConfirm" name="passwordConfirm" v-model="passwordConfirm" type="password" autocomplete="current-password" required="" class="signup-input-box signup-input-text" placeholder="최소 6자 이상(알파벳, 숫자 필수)" ></Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="passwordConfirm" class="warning-alert"/>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="fullName" class="signup-wrapper-text">실명</label>
            <div class="signup-wrapper-distance">
              <Field id="fullName" name="name" v-model="name" type="text" required="" class="signup-input-box signup-input-text" placeholder="홍길동" ></Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="name" class="warning-alert"/>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="nickname" class="signup-wrapper-text">닉네임</label>
            <div class="signup-wrapper-distance">
              <Field id="nickname" name="nickname" v-model="nickname" type="text" required="" class="signup-input-box signup-input-text" placeholder="별명을 알파벳, 한글, 숫자를 20자 이하로 입력해주세요."></Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="nickname" class="warning-alert"/>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="phoneNumber" class="signup-wrapper-text">휴대폰 번호</label>
            <div class="signup-wrapper-distance">
              <Field id="phoneNumber" 
                v-model="phoneNumber" 
                type="text" 
                required="" 
                class="signup-input-box signup-input-text" 
                placeholder="4~15자 이내로 입력해주세요" 
                name="phoneNumber">
              </Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="phoneNumber" class="warning-alert"/>
            </div>
          </div>

          <div class="input-wrapper">
            <label for="address" class="signup-wrapper-text">주소</label>
            <div class="signup-wrapper-distance">
              <Field id="address" 
                v-model="address" 
                type="text" 
                required="" 
                class="signup-input-box signup-input-text" 
                placeholder="4~15자 이내로 입력해주세요" 
                name="address">
              </Field>
            </div>
            <div class="warning-alert-wrapper">
              <ErrorMessage name="address" class="warning-alert"/>
            </div>
          </div>
        </Form>
        </div>
      </div>

      <!-- v-if 로 활성화 및 색깔-->
      <div @click="signup">
        <SubmitBtn :isDisabled="isDisabled" text="회원가입" handle-submit=""></SubmitBtn>  <!--자식 컴포넌트한테 emit 으로 이벤트 전달받기-->
      </div>
      <p class="lead-login-url-text"><span>이미 회원이신가요?</span>
        <router-link to="/user/login" class="lead-login-url">로그인</router-link>
      </p>
  </div>
</template>


<script>
import SignupLevelComponent from '../component/SignupLevelComponent.vue'
import SubmitBtn from "@/components/button/SubmitBtn.vue";
import SocialLoginBtn from "@/pages/User/component/SocialLoginBtn.vue";
import { useUserStore } from '../stores/useUserStore';
import { Field,Form,ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

var phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/

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
      passwordConfirm: "",
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
        passwordConfirm: yup.string().oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.').required('비밀번호 확인은 필수입니다'),
        name: yup.string().required('실명은 필수입니다'),
        nickname: yup.string().max(20, '닉네임은 20자 이내로 입력해주세요').required('닉네임은 필수입니다'),
        phoneNumber: yup.string().matches(phoneRegExp, 'xxx-xxxx-xxxx 의 형식을 지켜주세요'),
        address: yup.string().required('주소는 필수입니다'),
      })
    };
  },
  updated() {
    this.inputCheck();
  },
  watch: {
    password() {
      this.inputCheck();
    },
    passwordConfirm() {
      this.inputCheck();
    },
    nickname() {
      this.inputCheck();
    },
    phoneNumber() {
      this.inputCheck();
    },
    address() {
      this.inputCheck();
    },
  },

  setup(){
  },

  methods: {
    inputCheck(){
      // console.log(this.email);
      // console.log(this.disabledButton);
      // console.log(this.password);
      // console.log(this.passwordConfirm);
      // console.log(this.name);
      // console.log(this.nickname);
      // console.log(this.phoneNumber);
      // console.log(this.address);
      if (this.email && this.disabledButton && this.password && this.passwordConfirm &&this.name && this.nickname && this.phoneNumber && this.address) {
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
        this.$router.push('/user/signup/success');
      }
    }
  }
}
</script>

<style scoped>
signup-area{
  margin-bottom: 20px;
}
.signup-form{
  display: flex;
  flex-direction: column;
  gap: 20px;
}
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
  margin-bottom: 10px;
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
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}
.email-input{
  width: calc(100% - 150px);
}
.email-verify-wrapper{
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
.email-verify-input{
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: flex-end;
  input{
    margin-bottom: 0;
  }
  button{
    margin-bottom: 0;
    width: 130px;
  }
}

.warning-alert{
  background-color: rgba(224, 97, 57, 0.1);
  color: #e06139;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  box-sizing: border-box;
}
.email-check-input{
  border-radius: 5px;
  border-color: hsla(220, 9%, 46%, .3);
  width: fit-content;
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
  //margin-top: 10px;
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
.input-wrapper{
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>