import UserService from "@/services/UserService";

export default{
    state: {
        user: {},
        userError: null,
    },

    mutations: {
        setUser(state, user){
            state.user = user;
        },
        setUserError(state, error){
            state.userError = error;
        },
    },

    actions: {
        async getUser({ commit }, id){
            try{
                const response = await UserService.getUser(id);
                console.log(response);
                commit("setUser", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setUserError", error.response?.data?.message);
            }
        },
        async updateUser({ commit }, user){
            try{
                console.log(`--store: ${user.image}`);
                const response = await UserService.updateUser(user.id, user.userName, user.name, user.surname, user.image);
                console.log(response);
                commit("setUser", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setUserError", error.response?.data?.message);
            }
        },
    },
};