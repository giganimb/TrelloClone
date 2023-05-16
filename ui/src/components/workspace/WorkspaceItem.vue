<template>
  <v-col cols="4">
    <v-card>
      <v-card-text>
        <div class="d-flex flex-row align-center">
          <div @click="onWorkspaceClick" class="workspace-name">
            {{ workspace.name }}
          </div>
        
          <div style="margin-left: auto; margin-right: 0;">
            <v-btn 
              color="#6200EA"
              fab
              small
              outlined
              @click="onWorkspaceEditBtnClick"
              >
              <v-icon dark>
                mdi-pencil
              </v-icon>
            </v-btn>
          </div>
        </div>
            
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
    export default {
        name: "workspace-item",

        props: {
            workspace: {
                type: Object,
                required: true
            }
        },

        methods: {
          onWorkspaceEditBtnClick() {
              this.$store.commit("setCurrentWorkspace", this.workspace);
              this.$store.commit("showWorkspaceDialog");
          },
          onWorkspaceClick(){
            this.$store.commit("setCurrentWorkspace", this.workspace);
            this.$store.dispatch("getAllBoards", { workspaceId: this.workspace._id, 
                                                     sort_type: 'asc'})
              .then((response) => {
                if(this.boardError){
                  this.$emit("getBoardsError");
                }
                else{
                  this.$router.push({name: 'boards', params: { id: this.workspace._id }});
                }
              })
              .catch((error) => {
                      console.log(error);
              });
          },
        },

        computed: {
          boardError() {
              return this.$store.state.board.boardError;
          },
        },
    }
</script>

<style scoped>
.edit-in-btn{
  margin-left: 30px;
  color: white!important;
}
.edit-in-btn:hover{
    background-color: #d1b5f8!important;
}
.workspace-name{
  text-align: left; 
  font-size: 20px; 
  font-weight: 500; 
  color:#0d001f; 
  margin-right: 30px;
}
.workspace-name:hover{
  cursor: pointer;
  text-decoration: underline;
}
</style>