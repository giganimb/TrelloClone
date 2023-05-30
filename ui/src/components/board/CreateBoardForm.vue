<template>
    <v-container style="margin: 0px 20px">
      <v-row style="width: 500px; margin: auto">
          <v-text-field 
              v-model="name"
              :rules="nameRules"
              label="Name"
              :counter="30"
              :maxlength="30"
              color="#6200EA"
              >
          </v-text-field>
  
          <v-btn 
          color="#6200EA"
          class="add-in-btn"
          @click="createBoard"
          >Create</v-btn>
      </v-row>
    </v-container>
  </template>
  
  <script>
      export default {
          name: "create-board-form",
  
          data: () => ({
              name: "",
              nameRules: [
                  v => (v && v.length >= 2 && v.length <= 30) || 'Name must be more than 2 and less than 30 characters',
              ],
          }),
  
          methods: {
                createBoard() {
                  this.$store.dispatch('createBoard', { name: this.name, workspaceId: this.workspaceId })
                      .then((response) => {
                      if(this.boardError){
                        this.$emit("createBoardError");
                          
                      }
                      else{
                        this.$emit("createBoardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
                },
          },
  
          computed:{
            workspaceId() {
                return this.$store.state.workspace.currentWorkspace._id;
            },
            boardError() {
                return this.$store.state.board.boardError;
            },
          },
      }
  </script>
  
  <style>
  .add-in-btn{
    margin-top: 20px;
    margin-left: 20px;
    color: white!important;
  }
  .add-in-btn:hover{
      background-color: #d1b5f8!important;
  }
  </style>