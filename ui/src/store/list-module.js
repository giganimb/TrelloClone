import ListService from "@/services/ListService";
import CardService from "@/services/CardService";
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default{
    state: {
        lists: [],
        countOflists: null,
        listDialogVisible: false,
        cardDialogVisible: false,
        currentList: null,
        currentCard: null,
        listError: null,
        cardError: null,
    },

    mutations: {
        setLists(state, lists){
            state.lists = lists;
        },
        setCountOflists(state, countOflists){
            state.countOflists = countOflists;
        },
        showListDialog(state){
            state.listDialogVisible = true;
        },
        hideListDialog(state){
            state.listDialogVisible = false;
        },
        setCurrentList(state, list){
            state.currentList = list;
        },
        setListError(state, error){
            state.listError = error;
        },


        showCardDialog(state){
            state.cardDialogVisible = true;
        },
        hideCardDialog(state){
            state.cardDialogVisible = false;
        },
        setCurrentCard(state, card){
            state.currentCard = card;
        },
        setCardError(state, error){
            state.cardError = error;
        },
    },

    actions: {
        async init({ state, dispatch }) {
            socket.on('panel updated', () => {
              dispatch('getAllLists', state.lists[0].boardId);
            })
        },
        async joinPanel({ dispatch }, boardId) {
            socket.emit('join-panel', boardId);

            dispatch('getAllLists', boardId);
        },
        async getAllLists({ commit }, boardId){
            try{
                let lists = [];
                let position = 0;
                const listResponse = await ListService.getAllLists(boardId);
                console.log(listResponse);

                for (const list of listResponse.data) {
                    const cardResponse = await CardService.getAllCards(list._id);
                    list.cards = cardResponse.data;
                    list.position = position;
                    lists.push(list);

                    position++;
                }

                commit("setCountOflists", lists.length);
                commit("setLists", lists);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setListError", error.response?.data?.message);
            }
        },
        async createList({ commit }, list){
            try{
                const response = await ListService.createList(list.name, list.position, list.boardId);
                console.log(response);
                commit("setCurrentList", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setListError", error.response?.data?.message);
            }
        },
        async updateList({ commit }, list){
            try{
                const response = await ListService.updateList(list.id, list.name, list.boardId);
                console.log(response);
                commit("setCurrentList", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setListError", error.response?.data?.message);
            }
        },
        async deleteList({ commit }, list){
            try{
                const response = await ListService.deleteList(list.id, list.boardId);
                console.log(response);
                commit("setCurrentList", null);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setListError", error.response?.data?.message);
            }
        },


        async getAllCards({ commit }, listId){
            try{
                const response = await CardService.getAllCards(listId);
                console.log(response);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setCardError", error.response?.data?.message);
            }
        },
        async createCard({ commit }, card){
            try{
                const response = await CardService.createCard(card.name, card.listId, card.boardId, card.workspaceId);
                console.log(response);
                commit("setCurrentCard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setCardError", error.response?.data?.message);
            }
        },
        async updateCard({ commit }, card){
            try{
                const response = await CardService.updateCard(card.id, card.name, card.boardId, card.description, card.expiryDate, card.priority);
                console.log(response);
                commit("setCurrentCard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setCardError", error.response?.data?.message);
            }
        },
        async deleteCard({ commit }, card){
            try{
                const response = await CardService.deleteCard(card.id, card.boardId);
                console.log(response);
                commit("setCurrentCard", null);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setCardError", error.response?.data?.message);
            }
        },

        async updateCardsBetweenLists({ commit }, cardsData){
            try{
                const response = await CardService.updateCardsBetweenLists(cardsData);
                console.log(response);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setCardError", error.response?.data?.message);
            }
        },
    },
};