<template>
  <v-dialog
        v-model="workspaceDialogVisible"
        max-width="500"
        @click:outside="onClickOutside"
      >
        <v-card>
            <v-card-text>
              <div class="pt-4 pb-4 d-flex flex-row align-center">
                <v-text-field 
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
  margin-left: 30px;
  color: white!important;
}
.dialog-btn:hover{
  background-color: #d1b5f8!important;
}
</style>