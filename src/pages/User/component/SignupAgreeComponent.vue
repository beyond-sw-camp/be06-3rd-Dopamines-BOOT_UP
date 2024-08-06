<template>
  <div class="signup-container">
    <div class="signup-wrapper">
      <div class="agree-main-container step01-wrap">
        <div class="agree-all-container checkbox">
          <input type="checkbox" id="ckAll" v-model="ckAll">
          <label for="ckAll">아래 약관 및 개인정보처리방침 등에 대해 모든 내용에 동의합니다.</label>
        </div>
        <div class="agree-content-container list-ck-wrap">
          <div class="agree-content-wrapper ck-list">
            <div class="ck-wrap">
              <p class="ck-title">이용약관1</p>
              <div class="checkbox">
                <input type="checkbox" id="ck01" v-model="ck01" name="ck" required value="first" class="required-checkbox">
                <label for="ck01">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>Agree 1</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">이용약관2</p>
              <div class="checkbox">
                <input type="checkbox" id="ck02"  v-model ="ck02" name="ck" required class="required-checkbox">
                <label for="ck02">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>Agree 2</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">이용약관3</p>
              <div class="checkbox">
                <input type="checkbox" id="ck03" v-model ="ck03" name="ck" required class="required-checkbox">
                <label for="ck03">동의합니다.</label>
              </div>
            </div>
            <div class="term-box">
              <p>Agree 3</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">이용약관4</p>
              <div class="checkbox">
                <input type="checkbox" id="ck04" v-model ="ck04" name="ck" required class="required-checkbox">
                <label for="ck04">동의합니다.</label>
              </div>
            </div>
            <div class="term-box">
              <p>Agree 4</p>
            </div>
          </div>
          <div class="button-container">
            <SubmitBtn text="회원가입"></SubmitBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubmitBtn from '@/components/button/SubmitBtn.vue';

export default {
  name: 'SignupAgreePage',
  components: {
    SubmitBtn,
  },
  data() {
    return {
      ckAll : false,
      ck01 : false,
      ck02 : false,
      ck03 : false,
      ck04 : false
    };
  },
  methods: {
    checkAllClick() {
      if(this.ckAll) {
        this.ck01 = true;
        this.ck02 = true;
        this.ck03 = true;
        this.ck04 = true;
      }
    },
    checkAllUnclick() {
      if((this.ck01 && this.ck02 && this.ck03 && this.ck04)===true && this.ckAll === false ){
        this.ck01 = false;
        this.ck02 = false;
        this.ck03 = false;
        this.ck04 = false;
      }
    },
    checkOneClick() {
      if(this.ck01 && this.ck02 && this.ck03 && this.ck04) {
        this.ckAll = true;
      }
      else {
        this.ckAll=false;
        if(!this.ck01) this.ck01=false;
        if(!this.ck02) this.ck02=false;
        if(!this.ck03) this.ck03=false;
        if(!this.ck04) this.ck04=false;
      }
    }
  },
  watch: {
    ckAll() {
      this.checkAllClick();
      this.checkAllUnclick();
    },
    ck01() {
      this.checkOneClick();
    },
    ck02() {
      this.checkOneClick();
    },
    ck03() {
      this.checkOneClick();
    },
    ck04() {
      this.checkOneClick();
    }
  }
}


</script>

<style scoped>
.signup-container {
  max-width: 800px;
  width: 100%;
  margin: 0;
  box-sizing: border-box;
  padding: 60px 0 120px;
  border-color: #459729;
  font-weight: 500;
  text-align: center;
}

.signup-wrapper {}

.agree-main-container {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-style: normal;
  box-sizing: border-box;
}

.agree-all-container {
  margin: 0;
}

.agree-content-container {
  padding-top: 40px;
  margin: 0;
}

.agree-content-box {
  margin: 0;
  padding: 0;
  font-size: 100%;
  font-style: normal;
  box-sizing: border-box;
  background: #fff;
  border: 1px solid #d3d3d3;
  height: 160px;
  overflow-y: auto;
  padding: 12px;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
}



.button-container {
  margin-top: 30px;
}


.checkbox input:checked~label:before,
.radiobox input:checked~label:before {
  border: 0 none;
  background: #E06139 url(../../../assets/icon/checkbox_on.svg) no-repeat center center;
  background-size: 100% 100%;
}

.signup-wrapper .step01-wrap {
  margin-top: 30px;
}

.signup-wrapper .join-top .step-list li.on i {
  background-color: #fff;
  box-shadow: 0px 3px 16px rgba(0, 0, 0, 0.0588235294);
  border-color: #459729;
}


.signup-wrapper .join-top .step-list li i {
  margin-bottom: 12px;
  display: block;
  width: 80px;
  height: 80px;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
}

.signup-wrapper .join-top .step-list li span {
  display: block;
  text-align: center;
}

.signup-wrapper .step01-wrap .list-ck-wrap .ck-list:not(:first-child) {
  padding-top: 30px;
}


.signup-wrapper input {
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  padding: 0 14px;
  font-size: 15px;
}


.checkbox>input,
.radiobox>input {
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
}

.signup-wrapper .step01-wrap .all-ck-wrap .checkbox label {
  font-size: 20px;
  line-height: 24px;
}

.signup-wrapper .step01-wrap .list-ck-wrap .ck-list .term-box {
  background: #fff;
  border: 1px solid #d3d3d3;
  height: 160px;
  overflow-y: auto;
  padding: 12px;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
}


.checkbox>label:before,
.radiobox>label:before {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 0;
  margin-top: -13px;
  width: 24px;
  height: 24px;
  background: #fff no-repeat center center;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  box-sizing: border-box;
}

.checkbox>label,
.radiobox>label {
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding-left: 31px;
  font-size: 15px;
  color: #222;
  line-height: 22px;
}

.signup-wrapper .step01-wrap .list-ck-wrap {
  padding-top: 40px;
}

.signup-wrapper .step01-wrap .list-ck-wrap .ck-list .ck-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
}

.signup-wrapper .step01-wrap .list-ck-wrap .ck-list .ck-wrap .ck-title {
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
}

.signup-wrapper .step01-wrap .list-ck-wrap .ck-list .ck-wrap label {
  font-size: 16px;
  line-height: 24px;
}
</style>