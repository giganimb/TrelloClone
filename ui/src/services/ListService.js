import $api from "@/http";

export default class ListService{
    static async getAllLists(boardId){
        return $api.get(`/list/all`, {params: { boardId: boardId} });
    }

    static async createList(name, position, boardId, workspaceId){
        return $api.post(`/list/`, { name: name, position: position, boardId: boardId, workspaceId: workspaceId});
    }

    static async updateList(id, name, boardId){
        return $api.patch(`/list/${id}`, { name: name, boardId: boardId });
    }

    static async deleteList(id, boardId){
        return $api.delete(`/list/${id}`, {params: { boardId: boardId} });
    }
}