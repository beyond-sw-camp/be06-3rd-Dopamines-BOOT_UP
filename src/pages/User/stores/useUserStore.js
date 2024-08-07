import { defineStore } from "pinia";
import axios from '../../../config/axiosConfig';
import Cookies from 'js-cookie';

const backend = "http://localhost:8080";

export const useUserStore = defineStore("user", {
    state: () => ({
        email: "",
        uuid: "",
        nickname:"",
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
                let response = await axios.post(backend + "/user/email-send",EmailRequestDto);
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
                let response = await axios.post(backend + "/user/email-verify",EmailRequestDto);
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

            let response = await axios.post(backend + "/user/signup",signupDto,config);

            signupResponse = response.data.result;

            console.log(signupResponse.idx);
            console.log(signupResponse.email);
            console.log(signupResponse.name);
            
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
