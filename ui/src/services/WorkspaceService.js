import $api from "@/http";

export default class WorkspaceService{
    static async getAllWorkspaces(userId){
        return $api.get(`/workspace/all`, {params: { userId: userId} });
    }

    static async getWorkspace(id){
        return $api.get(`/workspace/${id}`);
    }

    static async createWorkspace(name, userId){
        return $api.post(`/workspace/`, { name: name, userId: userId});
    }

    static async updateWorkspace(id, name, userId){
        return $api.patch(`/workspace/${id}`, { name: name, userId: userId });
    }

    static async deleteWorkspace(id){
        return $api.delete(`/workspace/${id}`);
    }
}