import $api from "@/http";

export default class UserService{
    static async getUser(id){
        return $api.get(`/profile/${id}`);
    }

    static async updateUser(id, userName, name, surname){
        return $api.patch(`/profile/${id}`, { userName: userName, name: name, surname: surname });
    }
}