import { defineStore } from "pinia";
import axios from '../../../config/axiosConfig';
import Cookies from 'js-cookie';

const backend = "http://localhost:8080";

export const useUserStore = defineStore("user", {
    state: () => ({
        email: "",
        uuid: "",
        isLoggedIn: false,
    }),
    actions: {
        async emailRequest() {
            try {
                let response = await axios.post(backend + "/email-verify");
                if (response.status === 200) {
                    console.log("이메일 요청 성공");
                }
            } catch (error) {
                console.error("이메일 요청 실패", error);
            }
        },
        async login(user) {
            try {
                let response = await axios.post(backend + "/login", user);
                if (response.status === 200) {
                    this.isLoggedIn = true;
                    const token = response.headers['authorization'];
                    if (token) {
                        Cookies.set('jwt', token, { secure: true, sameSite: 'Strict' });
                    } else {
                        console.error("Token not found in response headers");
                        return false;
                    }
                    return true;
                }
            } catch (error) {
                console.error("로그인 실패", error);
                return false;
            }
        },
        logout() {
            this.isLoggedIn = false;
            Cookies.remove('jwt');
        },
        initialize() {
            const token = Cookies.get('jwt');
            if (token) {
                this.isLoggedIn = true;
            }
        },
    },
    persist: true
});
