import { defineStore } from 'pinia';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const useLoginStore = defineStore('user', {
  state: () => ({
    email: '',
    uuid: '',
    userIdx: '',
    userNickName: '',
    isLoggedIn: false,
  }),
  actions: {
    async login(user) {
      try {
        let response = await axios.post(
          '/api/login',
          user,
          { withCredentials: true } // 쿠키 전달
        );
        if (response.status === 200) {
          this.isLoggedIn = true;
          let atoken = await Cookies.get('AToken');
          const decoded = jwtDecode(atoken);

          this.userIdx = decoded.idx
          this.userNickName = decoded.nickname
          return true;
        }
      } catch (error) {
        console.error('로그인 실패', error);
        return false;
      }
    },
    logout() {
      this.isLoggedIn = false;
    }
  },
  persist: true
});
