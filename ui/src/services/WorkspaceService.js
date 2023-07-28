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

    static async getWorkspaceMembers(id){
        return $api.get(`/workspace/${id}/getMembers`);
    }

    static async addUserToWorkspace(workspaceId, userName){
        return $api.post(`/workspace/addUser`, { workspaceId: workspaceId, userName: userName});
    }

    static async deleteUserFromWorkspace(workspaceId, userId){
        return $api.post(`/workspace/deleteUser`, { workspaceId: workspaceId, userId: userId});
    }
}