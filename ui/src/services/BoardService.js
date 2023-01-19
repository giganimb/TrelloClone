import $api from "@/http";

export default class BoardService{
    static async getAllBoards(workspaceId, sort_type){
        return $api.get(`/board/all`, {params: { workspaceId: workspaceId, sort_type: sort_type} });
    }

    static async getBoard(id){
        return $api.get(`/board/${id}`);
    }

    static async createBoard(name, workspaceId){
        return $api.post(`/board/`, { name: name, workspaceId: workspaceId});
    }

    static async updateBoard(id, name, workspaceId){
        return $api.patch(`/board/${id}`, { name: name, workspaceId: workspaceId });
    }

    static async deleteBoard(id){
        return $api.delete(`/board/${id}`);
    }
}