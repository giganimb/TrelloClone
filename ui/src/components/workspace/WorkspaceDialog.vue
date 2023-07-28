<template>
  <v-dialog
        v-model="workspaceDialogVisible"
        max-width="610"
        @click:outside="onClickOutside"
      >
        <v-card>
            <v-card-text>
              <div class="pt-4 pb-4 d-flex flex-row align-center">
                <v-text-field 
                  style="max-width: 350px;"
                  v-model="currentWorkspace.name"
                  :rules="nameRules"
                  :maxlength="30"
                  label="Name"
                  :counter="30"
                  color="#6200EA"
                  >
                </v-text-field>
              
                <v-btn 
                color="#6200EA"
                class="dialog-btn"
                @click="editWorkspace"
                >Save</v-btn>

                <v-btn 
                color="#6200EA"
                class="dialog-btn"
                @click="deleteWorkspace"
                >Delete</v-btn>
              </div>
              <div class="pb-4 d-flex flex-row align-center">
                <v-text-field
                  style="max-width: 350px;" 
                  v-model="userName"
                  :rules="userNameRules"
                  :maxlength="20"
                  label="Input username"
                  :counter="20"
                  color="#6200EA"
                  >
                </v-text-field>
                <v-btn 
                style="margin-left: auto; margin-right: auto;"
                color="#6200EA"
                text
                @click="addUserToWorkspace"
                >Add user</v-btn>
              </div>
              <div class="pb-4">
                <v-list>
                  <v-list-group
                    :value="true"
                    prepend-icon="mdi-account-circle"
                    color="#6200EA"
                  >
                    <template v-slot:activator>
                      <v-list-item-title>Users</v-list-item-title>
                    </template>

                      <v-list-item
                        color="#6200EA"
                        v-for="member in currentWorkspace?.workspaceMembers"
                        :key="member._id"
                        link
                      >
                        <v-list-item-title class="d-flex flex-row align-center">
                          <img class="mr-2" v-show="member._id == currentWorkspace.ownerId" src="@/assets/icons/crown.png" width="20px" height="20px">
                          {{ member.userName }} - {{ member.email }}
                        </v-list-item-title>

                        <v-list-item-icon @click="deleteUserFromWorkspace(member._id)" v-show="member._id != currentWorkspace.ownerId">
                          <img class="icon" src="@/assets/icons/trash-can.png" width="24px" height="24px">
                        </v-list-item-icon>
                      </v-list-item>
                  </v-list-group>
                </v-list>
              </div> 
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
      name: "workspace-dialog",

      data: () => ({
          nameRules: [
            v => (v && v.length >= 2 && v.length <= 30) || 'Name must be more than 2 and less than 30 characters',
          ],
          userName: '',
          userNameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length > 2 && v.length <= 20) || 'Username must be more than 2 and less than 20 characters',
          ],
      }),

      methods: {
        onClickOutside(){
          this.$store.commit('hideWorkspaceDialog');
        },
        editWorkspace(){
          this.$store.dispatch('updateWorkspace', { id: this.currentWorkspace._id, name: this.currentWorkspace.name, userId: this.userId })
                    .then((response) => {
                    if(this.workspaceError){
                        this.$emit("updateWorkspaceError");
                    }
                    else{
                      this.$store.commit('hideWorkspaceDialog');
                      this.$emit("updateWorkspaceSuccess");
                    }
                })
                    .catch((error) => {
                    console.log(error);
                });
        },
        deleteWorkspace(){
          this.$store.commit('hideWorkspaceDialog');
          this.$store.dispatch('deleteWorkspace', this.currentWorkspace._id)
                    .then((response) => {
                    if(this.workspaceError){
                        this.$emit("deleteWorkspaceError");
                    }
                    else{
                      this.$emit("deleteWorkspaceSuccess");
                    }
                })
                    .catch((error) => {
                    console.log(error);
                });
        },
        addUserToWorkspace(){
          this.$store.dispatch('addUserToWorkspace', {workspaceId: this.currentWorkspace._id, userName: this.userName})
            .then((response) => {
                      if(this.workspaceError){
                          this.$emit("addUserToWorkspaceError");
                      }
                      else{
                        this.$store.dispatch("getWorkspace", this.currentWorkspace._id);
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
        },
        deleteUserFromWorkspace(memberId){
          console.log(this.currentWorkspace._id);
          console.log(memberId);
          this.$store.dispatch('deleteUserFromWorkspace', {workspaceId: this.currentWorkspace._id, userId: memberId})
            .then((response) => {
                      if(this.workspaceError){
                          this.$emit("deleteUserFromWorkspaceError");
                      }
                      else{
                        this.$store.dispatch("getWorkspace", this.currentWorkspace._id);
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
        },
      },

      computed: {
        workspaceDialogVisible() {
            return this.$store.state.workspace.workspaceDialogVisible;
        },
        currentWorkspace(){
          return this.$store.state.workspace.currentWorkspace;
        },
        workspaceError(){
          return this.$store.state.workspace.workspaceError;
        },
        userId() {
          return this.$store.state.user.user._id;
        },
      },

    }
</script>

<style scoped>
.dialog-btn{
  margin-left: 20px;
  color: white!important;
}
.dialog-btn:hover{
  background-color: #d1b5f8!important;
}
.icon{
  border-radius: 4px;
}

.icon:hover{
  background: #cccccc;
}
</style>