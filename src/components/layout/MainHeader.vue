<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import {useUserStore} from "@/pages/User/stores/useUserStore";

const searchInput = ref('');
const router = useRouter();
const isLoggedIn = ref(false);

const checkLoginStatus = () => {
  const token = Cookies.get('token');
  isLoggedIn.value = !!token;
};

onMounted(() => {
  checkLoginStatus();
});

watch(
    () => Cookies.get('token'),
    () => {
      checkLoginStatus();
    }
);

const emit = defineEmits(['search']);
const handleSearch = () => {
  emit('search', searchInput.value);
  router.push({ path: '/search', query: { q: searchInput.value } });
};

const logout = async () => {
  const userStore = useUserStore(); // 괄호 추가
  await userStore.logout(); // 로그아웃이 완료될 때까지 대기

  window.location.href = "https://www.dopamines-bootup.kro.kr/";  // 로그아웃 요청을 받으면 메인페이지 리다이렉트
};

</script>

<template>
  <header>
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.css" rel="stylesheet">
    <div class="header-wrap">
      <div class="header-area">
        <div class="logo-area">
          <div class="logo">
            <a href="/">
              <img src="@/assets/img/main-logo.png" height="28px">
            </a>
          </div>
        </div>
        <div class="search-area">
          <div class="search-wrap">
            <div class="search-box">
              <input v-model="searchInput" @keyup.enter="handleSearch" type="text" placeholder="검색어를 입력하세요">
              <button aria-label="search" type="button" @click="handleSearch">
                <img src="../../assets/icon/searchIcon.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul class="category menu">
          <li>
            <router-link to="/community">커뮤니티 게시판</router-link>
          </li>
          <li>
            <router-link to="/notice">공지사항</router-link>
          </li>
          <li>
            <router-link to="/project">프로젝트</router-link>
          </li>
          <li>
            <router-link to="/market">중고 장터</router-link>
          </li>
          <li>
            <router-link to="/reservation">스터디 테이블 예약</router-link>
          </li>
        </ul>
        <ul class="login menu">
          <li v-if="Cookies.get('AToken')">
            <button @click="logout">로그아웃</button>
          </li>
          <li v-else>
            <router-link to="/user/login">로그인</router-link>
          </li>
          <li v-if="!Cookies.get('AToken')">
            <router-link to="/user/signup/agree">회원가입</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-wrap {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.header-area {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  transition: all ease 0.3s;
}

.logo-area {
  padding-top: 5px;
}

.search-area {
  position: relative;
}

.search-wrap {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1060px;
  margin: 0px auto;
  display: flex;
  align-items: center;
}

.search-box {
  width: 17px;
  height: 40px;
  padding: 0px 20px;
  background-color: rgb(255, 255, 255);
  position: relative;
  border-radius: 100px;
  border: 1px solid #E06139;
  transition: 0.5s;

  &:hover {
    width: 480px;
  }

  &:focus-within {
    width: 480px;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 40px 0px 44px;
    height: 40px;
    border: none;
    color: rgb(0, 0, 0);
    position: absolute;
    right: 0px;
    background-color: transparent;
    font-size: 16px;
    line-height: 24px;
  }

  button {
    position: absolute;
    left: 10px;
    top: 8px;
  }
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  /* box-shadow: 2px 2px 10px 0px rgb(0 0 0 / 10%); */

  .category {
    display: flex;
    margin-left: -20px;
  }

  .menu {
    li {
      height: 30px;
      align-items: center;
      display: flex;
      position: relative;
      transition: all 0.5s;

      a {
        padding: 0 10px;
        transition: all 0.5s;

        &:hover {
          color: #fff;
        }
      }

      &:hover, .nav-on {
        background-color: rgba(224, 97, 57, 0.8);
        border-radius: 5px;
        margin: 0 10px;
      }
    }
  }

  .login {
    display: flex;
    margin-right: -12px;
    font-size: 14px;
    line-height: 20px;

    li {
      position: relative;
      padding: 0 12px;
    }
  }
}
</style>