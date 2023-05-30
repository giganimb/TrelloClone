<template>
  <div>

    <v-alert
      prominent
      type="error"
      v-model="errorAlert"
      color="#823DE1"
    >
      <v-row align="center">
        <v-col class="grow">
          {{ workspaceError ?? boardError }}
        </v-col>
        <v-col>
          <v-btn 
          color="#D1B5F8"
          style="margin-left:200px"
          @click="onClickAlertBtn">Ок</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    
    <div v-if="!this.authId">
      <h1 style="text-align:center">Loading...</h1>
    </div>
    <div v-else>
      <work-navigation></work-navigation>
      <div class="page-title">
        <h1>Workspaces</h1>
      </div>
      <v-container>
        <create-workspace-form
        @createWorkspaceError="onWorkspaceError"
        @createWorkspaceSuccess="onWorkspaceSuccess"></create-workspace-form>
        <v-row>
          <workspace-item
            v-bind:key="workspace._id"
            v-for="workspace in this.workspaces"
            :workspace="workspace"
            @getBoardsError="onBoardError"
          />
        </v-row>
        <workspace-dialog
        @updateWorkspaceError="onWorkspaceError"
        @updateWorkspaceSuccess="onWorkspaceSuccess"
        @deleteWorkspaceError="onWorkspaceError"
        @deleteWorkspaceSuccess="onWorkspaceSuccess"></workspace-dialog>
      </v-container>
    </div>
  </div>
</template>

<script>
import WorkNavigation from '@/components/WorkNavigation.vue';
import CreateWorkspaceForm from '@/components/workspace/CreateWorkspaceForm.vue';
import WorkspaceItem from '@/components/workspace/WorkspaceItem.vue';
import WorkspaceDialog from '@/components/workspace/WorkspaceDialog.vue';
    export default {
        components:{ WorkNavigation, CreateWorkspaceForm, WorkspaceItem, WorkspaceDialog },
        data: () => ({
          errorAlert: false,
        }),

        methods: {
          onClickAlertBtn(){
            this.errorAlert = false;
            this.$store.commit('setWorkspaceError', null);
            this.$store.commit('setBoardError', null);
          },
          onWorkspaceError() {
            this.errorAlert = true;
          },
          onWorkspaceSuccess() {
            this.$store.dispatch('getAllWorkspaces', this.authId);
          },
          onBoardError(){
            this.errorAlert = true;
          },
        },

        computed: {
          isAuth() {
            return this.$store.state.auth.isAuth;
          },
          authId() {
            return this.$store.state.auth.userData.user.id;
          },
          workspaces() {
            return this.$store.state.workspace.workspaces;
          },
          workspaceError() {
            return this.$store.state.workspace.workspaceError;
          },
          boardError() {
            return this.$store.state.board.boardError;
          },
        },
        
        created(){
          document.title = 'Workspaces';
          if(!this.isAuth){
              this.$router.push({name: 'authorization'});
          };
          this.$store.dispatch('getUser', this.authId);
          this.$store.dispatch('getAllWorkspaces', this.authId);
        },

    }
</script>

<style>
.page-title{
  color: #0d001f;
  text-align: center;
  margin-top: 20px;
}
.v-alert {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>