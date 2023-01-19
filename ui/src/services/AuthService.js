import $api from "@/http";

export default class AuthService{
    static async login(email, password){
        return $api.post("/auth/login", { email: email, password: password });
    }

    static async signup(email, userName, name, surname, password){
        return $api.post("/auth/signup", { email: email, userName: userName, name: name, surname: surname, password: password });
    }

    static async logout(){
        return $api.post("/auth/logout");
    }
}