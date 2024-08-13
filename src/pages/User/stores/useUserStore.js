import { defineStore } from "pinia"
import axios from "axios";
import Cookies from 'js-cookie';
import router from "@/router";
import {jwtDecode} from "jwt-decode";

export const useUserStore = defineStore("user", {
    state: () => ({
        email: "",
        uuid: "",
        nickname:"",
        userIdx: '',
        userNickName: '',
        isLoggedIn: false,
    }),
    actions: {
        //메서드
        async emailRequest(email){
            console.log("email : " + email);

            let EmailRequestDto = {
                email : email,
                uuid: "",
            };

            try{
                let response = await axios.post( "/api/user/email-send",EmailRequestDto);
                if(response.status === 200){
                    alert("이메일 요청 성공");
                }
            } catch(error){
                alert("잘못된 요청입니다.");
            }
        },

        async emailVerify(email,uuid){
            console.log("email : " + email);
            console.log("uuid : " + uuid);

            let EmailRequestDto = {
                email : email,
                uuid: uuid,
            };

            try{
                let response = await axios.post("/api/user/email-verify",EmailRequestDto);
                console.log(response);
                const result = response.data.result;
                console.log(result);
                if(response.data.result === true){
                    return true;
                } else{
                    return false;
                }
            } catch(error){
                console.log(" error ", error);
            }
        },

        async signup(email,password,name,nickname,phoneNumber,address){
            const signupDto = {
                "email" : email,
                "password" : password,
                "name" : name,
                "nickname": nickname,
                "phoneNumber" : phoneNumber,
                "address" : address
            };

            let signupResponse = {
                idx : 0,
                email : "",
                name : "",
                nickname : "",
                phoneNumber : "",
                address : "",
                createdAt : ""
            };

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            let response = await axios.post("/api/user/signup",signupDto,config);

            signupResponse = response.data.result;

            console.log(signupResponse.idx);
            console.log(signupResponse.email);
            console.log(signupResponse.name);

        },
        async login(user) {
            try {
                let response = await axios.post("/api/login", user, { withCredentials: true });
                if (response.status === 200) {

                    let atoken = await Cookies.get('AToken');
                    console.log("atoken: ", atoken);
                    const decoded = jwtDecode(atoken);
                    console.log("decoded: ", decoded);

                    this.userIdx = decoded.idx
                    this.userNickName = decoded.nickname

                    return true;
                } else{
                    return false;
                }
            } catch(error){
                console.log("로그인 실패", error);
                return false;
            }
        },

        async logout() {
            try {
                let response = await axios.post("/api/logout");
                if (response.status === 200) {
                    this.isLoggedIn = false;
                    localStorage.removeItem("user");

                    await router.push('/');
                    router.go(0);
                } else{
                    return false;
                }
            } catch(error){
                console.log(" error ", error);
            }
        },

        async getAuth() {
            try{
                const response = await axios.get("/api/user/auth", {
                    withCredentials: true
                });

                console.log(response);

                return response.data.result;
            } catch (error) {
                console.log(" error ", error);
            }
        },
    },
    persist: true

})