import BoardService from "@/services/BoardService";

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
        async getAllBoards({ commit }, board){
            try{
                const response = await BoardService.getAllBoards(board.workspaceId, board.sort_type);
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
                const response = await BoardService.updateBoard(board.id, board.name, board.workspaceId);
                console.log(response);
                commit("setCurrentBoard", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setBoardError", error.response?.data?.message);
            }
        },
        async deleteBoard({ commit }, id){
            try{
                const response = await BoardService.deleteBoard(id);
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