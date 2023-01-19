import $api from "@/http";

export default class AdminService{
    static async getAllUsers(){
        return $api.get(`/admin/get-users`);
    }

    static async getUserStatistics(userId){
        return $api.get(`/admin/get-user-statistics`, {params: { userId: userId} });
    }

    static async deleteUser(id){
        return $api.delete(`/admin/delete-user/${id}`);
    }
}