import $api from "@/http";

export default class BoardService{
    static async getAllBoards(workspaceId, sort_type, sort_field){
        return $api.get(`/board/all`, {params: { workspaceId: workspaceId, sort_type: sort_type, sort_field: sort_field} });
    }

    static async getBoard(id){
        return $api.get(`/board/${id}`);
    }

    static async createBoard(name, workspaceId){
        return $api.post(`/board/`, { name: name, workspaceId: workspaceId});
    }

    static async updateBoard(id, name, workspaceId, color, description){
        return $api.patch(`/board/${id}`, { name: name, workspaceId: workspaceId, color: color, description: description });
    }

    static async deleteBoard(id){
        return $api.delete(`/board/${id}`);
    }
}