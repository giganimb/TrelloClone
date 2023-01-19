import AdminService from "@/services/AdminService";

export default{
    state: {
        users: [],
        userDialogVisible: false,
        userStats: null,
        userError: null,
    },

    mutations: {
        setUsers(state, users){
            state.users = users;
        },
        showUserDialog(state){
            state.userDialogVisible = true;
        },
        hideUserDialog(state){
            state.userDialogVisible = false;
        },
        setUserStats(state, stats){
            state.userStats = stats;
        },
        setUserError(state, error){
            state.userError = error;
        },
    },

    actions: {
        async getAllUsers({ commit }){
            try{
                const response = await AdminService.getAllUsers();
                console.log(response);
                commit("setUsers", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setUserError", error.response?.data?.message);
            }
        },
        async getUserStatistics({ commit }, userId){
            try{
                const response = await AdminService.getUserStatistics(userId);
                console.log(response);
                commit("setUserStats", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setUserError", error.response?.data?.message);
            }
        },
        
        async deleteUser({ commit }, id){
            try{
                const response = await AdminService.deleteUser(id);
                console.log(response);
                commit("setUserStats", null);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setUserError", error.response?.data?.message);
            }
        },
    },
};