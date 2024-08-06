import {defineStore} from "pinia";
import axios from "axios";

const backend = "http://localhost:8080";
export const useMemberStore = defineStore( "member",{
    state: () => (
        { user:
                {
                    isLoggedin: false,
                    name: "seung",
                    age: 27
                }
        }),
    persist: {
        storage: sessionStorage
    },
    actions: {
        getAge(){
            this.age++;
        },
        async login(member){
            let response = await axios.post(backend + "/login", member);
            if (response.status === 200){
                this.isLoggedIn = false;
                return true;
            } else {
                return false;
            }
        }
    }});