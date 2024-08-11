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
              <p class="ck-title">1. 이용자 정보 제공 및 관리</p>
              <div class="checkbox">
                <input type="checkbox" id="ck01" v-model="ck01" name="ck" required value="first" class="required-checkbox">
                <label for="ck01">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>회원가입 시, 이용자는 정확하고 최신의 정보를 제공해야 합니다. 잘못된 정보 제공으로 인한 불이익에 대해서는 이용자가 책임을 집니다. 이용자는 회원정보의 변경 사항이 있을 경우 즉시 수정해야 하며, 관리 소홀로 발생한 문제에 대한 책임은 이용자 본인에게 있습니다.</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">2. 계정 보안 및 관리</p>
              <div class="checkbox">
                <input type="checkbox" id="ck02" v-model="ck02" name="ck" required class="required-checkbox">
                <label for="ck02">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>이용자는 본인의 계정과 비밀번호에 대한 보안을 유지할 책임이 있습니다. 계정의 부정 사용 또는 제3자에 의한 이용으로 인한 모든 결과는 이용자 본인에게 있으며, 커뮤니티 운영자는 이에 대한 책임을 지지 않습니다. 계정이 무단으로 사용되거나 보안이 위협받았다고 의심될 경우, 즉시 운영자에게 통보해야 합니다.</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">3. 서비스 이용 제한 및 중단</p>
              <div class="checkbox">
                <input type="checkbox" id="ck03" v-model="ck03" name="ck" required class="required-checkbox">
                <label for="ck03">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>커뮤니티 운영자는 이용자가 이용약관을 위반하거나 불법적인 활동을 한 경우, 사전 통지 없이 서비스 이용을 제한하거나 계정을 중단할 수 있습니다. 또한, 운영자는 필요에 따라 사전 통지 없이 서비스의 일부를 변경하거나 종료할 수 있습니다.</p>
            </div>
          </div>
          <div class="ck-list">
            <div class="ck-wrap">
              <p class="ck-title">4. 개인정보 보호 및 활용</p>
              <div class="checkbox">
                <input type="checkbox" id="ck04" v-model="ck04" name="ck" required class="required-checkbox">
                <label for="ck04">동의합니다.</label>
              </div>
            </div>
            <div class="agree-content-box">
              <p>회원가입 시 제공된 개인정보는 BOOT_UP 커뮤니티의 서비스 제공 및 개선을 위해 사용됩니다. 커뮤니티는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않으며, 이용자는 개인정보의 수집, 이용, 보관에 동의해야 합니다. 단, 법적 요구가 있을 경우 이에 따릅니다.</p>
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
  text-align: left;
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
  font-size: 17px;
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