<script setup>
import { ref, computed, watch } from 'vue';
import SubmitBtn from '@/components/button/SubmitBtn.vue';
import router from "@/router";

const ckAll = ref(false);
const ck01 = ref(false);
const ck02 = ref(false);
const ck03 = ref(false);
const ck04 = ref(false);

const allChecked = computed(() => ck01.value && ck02.value && ck03.value && ck04.value);

watch(ckAll, (newVal) => {
  ck01.value = newVal;
  ck02.value = newVal;
  ck03.value = newVal;
  ck04.value = newVal;
});

watch([ck01, ck02, ck03, ck04], ([newCk01, newCk02, newCk03, newCk04]) => {
  ckAll.value = newCk01 && newCk02 && newCk03 && newCk04;
});

const handleSubmit = () => {
  router.push('/user/signup/info');
};
</script>

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
                <input type="checkbox" id="ck02" v-model="ck02" name="ck" required class="required-checkbox">
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
                <input type="checkbox" id="ck03" v-model="ck03" name="ck" required class="required-checkbox">
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
                <input type="checkbox" id="ck04" v-model="ck04" name="ck" required class="required-checkbox">
                <label for="ck04">동의합니다.</label>
              </div>
            </div>
            <div class="term-box">
              <p>Agree 4</p>
            </div>
          </div>
          <div class="button-container">
            <SubmitBtn :is-disabled="!allChecked" :handle-submit="handleSubmit" text="회원가입"></SubmitBtn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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