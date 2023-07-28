import WorkspaceService from "@/services/WorkspaceService";

export default{
    state: {
        workspaces: [],
        // workspaces: [
        //     {
        //         id: 1,
        //         name: "qwerty1",
        //     },
        //     {
        //         id: 2,
        //         name: "qwerty2",
        //     },
        //     {
        //         id: 3,
        //         name: "qwerty3",
        //     },
        //     {
        //         id: 4,
        //         name: "qwerty4",
        //     },
        //     {
        //         id: 5,
        //         name: "qwerty5",
        //     },
        // ],
        workspaceDialogVisible: false,
        currentWorkspace: null,
        workspaceError: null,
    },

    mutations: {
        setWorkspaces(state, workspaces){
            state.workspaces = workspaces;
        },
        showWorkspaceDialog(state){
            state.workspaceDialogVisible = true;
        },
        hideWorkspaceDialog(state){
            state.workspaceDialogVisible = false;
        },
        setCurrentWorkspace(state, workspace){
            state.currentWorkspace = workspace;
        },
        setWorkspaceError(state, error){
            state.workspaceError = error;
        },
    },

    actions: {
        async getAllWorkspaces({ commit }, userId){
            try{
                const response = await WorkspaceService.getAllWorkspaces(userId);
                console.log(response);
                commit("setWorkspaces", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async getWorkspace({ commit }, id){
            try{
                const response = await WorkspaceService.getWorkspace(id);
                const workspaceMembers = await WorkspaceService.getWorkspaceMembers(id);
                response.data.workspaceMembers = workspaceMembers.data;
                console.log(response);
                commit("setCurrentWorkspace", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async createWorkspace({ commit }, workspace){
            try{
                const response = await WorkspaceService.createWorkspace(workspace.name, workspace.userId);
                console.log(response);
                commit("setCurrentWorkspace", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async updateWorkspace({ commit }, workspace){
            try{
                const response = await WorkspaceService.updateWorkspace(workspace.id, workspace.name, workspace.userId);
                console.log(response);
                commit("setCurrentWorkspace", response.data);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async deleteWorkspace({ commit }, id){
            try{
                const response = await WorkspaceService.deleteWorkspace(id);
                console.log(response);
                commit("setCurrentWorkspace", null);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async addUserToWorkspace({ commit }, data){
            try{
                const response = await WorkspaceService.addUserToWorkspace(data.workspaceId, data.userName);
                console.log(response);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
        async deleteUserFromWorkspace({ commit }, data){
            try{
                const response = await WorkspaceService.deleteUserFromWorkspace(data.workspaceId, data.userId);
                console.log(response);
            }
            catch(error){
                console.log(error.response?.data?.message);
                console.log(error);
                commit("setWorkspaceError", error.response?.data?.message);
            }
        },
    },
};