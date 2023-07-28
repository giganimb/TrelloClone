import BoardService from "@/services/BoardService";
import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export default{
    state: {
        boards: [],
        boardDialogVisible: false,
        currentBoard: null,
        boardError: null,
    },

    mutations: {
        setBoards(state, boards){
            state.boards = boards;
        },
        showBoardDialog(state){
            state.boardDialogVisible = true;
        },
        hideBoardDialog(state){
            state.boardDialogVisible = false;
        },
        setCurrentBoard(state, board){
            state.currentBoard = board;
        },
        setBoardError(state, error){
            state.boardError = error;
        },
    },

    actions: {
        async initWorkspace({ state, dispatch }) {
            socket.on('workspace updated', () => {
              dispatch('getAllBoards', {workspaceId: state.boards[0].workspaceId});
            })
        },
        async joinWorkspace({ dispatch }, board) {
            socket.emit('join-workspace', board.workspaceId);

            dispatch('getAllBoards', board);
        },
        async getAllBoards({ commit }, board){
            try{
                const response = await BoardService.getAllBoards(board.workspaceId, board.sort_type, board.sort_field);
                console.log(response);
                commit("setBoards", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
        async getBoard({ commit }, id){
            try{
                const response = await BoardService.getBoard(id);
                console.log(response);
                commit("setCurrentBoard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
        async createBoard({ commit }, board){
            try{
                const response = await BoardService.createBoard(board.name, board.workspaceId);
                console.log(response);
                commit("setCurrentBoard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
        async updateBoard({ commit }, board){
            try{
                const response = await BoardService.updateBoard(board.id, board.name, board.workspaceId, board.color, board.description);
                console.log(response);
                commit("setCurrentBoard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
        async deleteBoard({ commit }, board){
            try{
                const response = await BoardService.deleteBoard(board.id, board.workspaceId);
                console.log(response);
                commit("setCurrentBoard", null);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
    },
};