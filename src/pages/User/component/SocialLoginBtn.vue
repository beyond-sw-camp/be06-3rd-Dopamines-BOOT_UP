<template>
  <div class="social-button-wrapper">
    <a class="social-button" href="http://localhost:8080/login/oauth2/code/kakao">
    </a>
  </div>
</template>

<script>
export default {
  name: 'SocialLoginBtn',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.social-button-wrapper {
  margin-top: 5px;
  width: 100%;
}

.social-button {
  display: inline-flex;
  background-image: url("../../../assets/icon/kakao-logo.svg");
  width: 100%;
  color : black;
  padding: 15px;
  box-sizing: border-box;
  border: 1px solid hsla(220, 9%, 46%, .3);
  justify-content: center;
  border-radius: 5px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 20px;

}
</style>