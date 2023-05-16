import YoucomApiService from "@/services/YoucomApiService";

export default{
    state: {
        currentCardSolution: '',
        currentCardDescriptionSummarization: '',
        apiError: null,
    },

    mutations: {
        setCurrentCardSolution(state, currentCardSolution){
            state.currentCardSolution = currentCardSolution;
        },
        setCurrentCardDescriptionSummarization(state, currentCardDescriptionSummarization){
            state.currentCardDescriptionSummarization = currentCardDescriptionSummarization;
        },
        setApiError(state, error){
            state.apiError = error;
        },
    },

    actions: {
        async solveCardTask({ commit }, data){
            try{
                const response = await YoucomApiService.solveCardTask(data.task, data.email);
                console.log(response);
                commit("setCurrentCardSolution", response.data.generated_text);
                return response.data.generated_text;
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setApiError", error.response?.data?.message);
            }
        },
        async summarizeCardDescription({ commit }, data){
            try{
                const response = await YoucomApiService.summarizeCardDescription(data.text, data.email);
                console.log(response);
                commit("setCurrentCardDescriptionSummarization", response.data.generated_text);
                return response.data.generated_text;
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setApiError", error.response?.data?.message);
            }
        },
    },
};