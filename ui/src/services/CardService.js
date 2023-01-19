import $api from "@/http";

export default class CardService{
    static async getAllCards(listId){
        return $api.get(`/card/all`, {params: { listId: listId} });
    }

    static async createCard(name, listId, boardId){
        return $api.post(`/card/`, { name: name, listId: listId, boardId: boardId});
    }

    static async updateCard(id, name, boardId){
        return $api.patch(`/card/${id}`, { name: name, boardId: boardId });
    }

    static async deleteCard(id, boardId){
        return $api.delete(`/card/${id}`, { params: { boardId: boardId } });
    }

    static async updateCardsBetweenLists(cardsData){
        return $api.post(`/moveCard/`, { from: cardsData.from, to: cardsData.to, boardId: cardsData.boardId});
    }
}