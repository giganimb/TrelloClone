import authService from "@/services/AuthService";
import axios from "axios";

export default{
    state: {
        userData : {},
        isAuth : false,
        loginError: null,
        signupError: null,
    },

    mutations: {
        setAuth(state, isAuth){
            state.isAuth = isAuth;
        },
        setUserData(state, userData){
            state.userData = userData;
        },
        setLoginError(state, error){
            state.loginError = error;
        },
        setSignupError(state, error){
            state.signupError = error;
        },
    },

    actions: {
        async login({ commit }, user){
            try{
                const response = await authService.login(user.email, user.password);
                console.log(response);
                localStorage.setItem("token", response.data.userData.accessToken);
                localStorage.setItem("userId", response.data.userData.user.id);
                commit("setAuth", true);
                commit("setUserData", response.data.userData);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setLoginError", error.response?.data?.message);
            }
        },

        async signup({ commit }, user){
            try{
                const response = await authService.signup(user.email, user.userName, user.name, user.surname, user.password);
                console.log(response);
                localStorage.setItem("token", response.data.userData.accessToken);
                localStorage.setItem("userId", response.data.userData.user.id);
                commit("setAuth", true);
                commit("setUserData", response.data.userData);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setSignupError", error.response?.data?.message);
            }
        },

        async logout({ commit }){
            try{
                const response = await authService.logout();
                console.log(response);
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                commit("setAuth", false);
                commit("setUserData", {});
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
            }
        },

        async checkAuth({ commit }) {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/auth/refresh", {withCredentials: true});
                console.log(response);
                localStorage.setItem("token", response.data.userData.accessToken);
                commit("setAuth", true);
                commit("setUserData", response.data.userData);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
            }
        }
    },
};