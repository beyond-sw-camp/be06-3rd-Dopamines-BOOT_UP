<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const searchInput = ref('');
const router = useRouter();

const handleSearch = () => {
  router.push({ path: '/search', query: { q: searchInput.value } });
};

router.afterEach(() => {
  const nav = document.querySelector('.category');
  const navItems = nav.querySelectorAll('li');
  navItems.forEach((item) => {
    if (item.querySelector('a').href === window.location.href) {
      item.classList.add('nav-on');
    } else {
      item.classList.remove('nav-on');
    }
  });
});
</script>

<template>
  <header>
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
              <input v-model="searchInput" @keyup.enter="handleSearch" autocomplete="off" type="text" placeholder="검색어를 입력하세요">
              <button aria-label="search" type="button" @click="handleSearch">
                <img src="../../assets/icon/searchIcon.svg" alt="">
              </button>
            </div>
          </div>
        </div>
      </div>
      <nav>
        <ul class="category">
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
        <ul class="login">
          <li>
            <router-link to="/user/login">로그인</router-link>
          </li>
          <li>
            <router-link to="/user/signup/agree">회원가입</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header-wrap{
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
}

.header-area{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  transition: all ease 0.3s;
}

.logo-area{
  padding-top: 5px;
}

.search-area{
  position: relative;
}

.search-wrap{
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  max-width: 1060px;
  margin: 0px auto;
  display: flex;
  align-items: center;
}

.search-box{
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
  &:focus-within{
    width: 480px;
  }
  input{
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
  button{
    position: absolute;
    left: 10px;
    top: 8px;
  }
}

nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 56px;
  /* box-shadow: 2px 2px 10px 0px rgb(0 0 0 / 10%); */
  .category{
    display: flex;
    margin-left: -20px;
    li{
      height: 30px;
      align-items: center;
      display: flex;
      position: relative;
      transition: all 0.5s;
      a{
        padding: 0 10px;
        transition: all 0.5s;
        &:hover{
          color: #fff;
        }
      }
      &:hover, .nav-on{
        background-color: rgba(224, 97, 57, 0.8);
        border-radius: 5px;
        margin: 0 10px;
      }
    }
  }
  .login{
    display: flex;
    margin-right: -12px;
    font-size: 14px;
    line-height: 20px;
    li{
      position: relative;
      padding: 0 12px;
    }
  }
}
</style>