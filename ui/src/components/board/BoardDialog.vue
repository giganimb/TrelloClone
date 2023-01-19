<template>
    <v-dialog
          v-model="boardDialogVisible"
          max-width="600"
          @click:outside="onClickOutside"
        >
          <v-card style="width:auto">
              <v-card-text>
                <v-row style="width: 500px; margin: auto">
                  <div style="align-items: center; margin: 20px auto" class="d-flex">
                    <v-text-field 
                      v-model="currentBoard.name"
                      :rules="nameRules"
                      label="Name"
                      :counter="14"
                      color="#6200EA"
                      >
                    </v-text-field>
                  
                    <v-btn 
                    color="#6200EA"
                    class="dialog-btn"
                    @click="editBoard"
                    >Edit</v-btn>
  
                    <v-btn 
                    color="#6200EA"
                    class="dialog-btn"
                    @click="deleteBoard"
                    >Delete</v-btn>
                  </div> 
                </v-row>
              </v-card-text>
          </v-card>
      </v-dialog>
  </template>
  
  <script>
      export default {
        name: "board-dialog",
  
        data: () => ({
            nameRules: [
              v => (v && v.length >= 2 && v.length <= 14) || 'Name must be more than 2 and less than 14 characters',
            ],
        }),
  
        methods: {
          onClickOutside(){
            this.$store.commit('hideBoardDialog');
          },
          editBoard(){
            this.$store.dispatch('updateBoard', { id: this.currentBoard._id, name: this.currentBoard.name, workspaceId: this.currentBoard.workspaceId })
                      .then((response) => {
                      if(this.boardError){
                          this.$emit("updateBoardError");
                      }
                      else{
                        this.$store.commit('hideBoardDialog');
                        this.$emit("updateBoardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
          },
          deleteBoard(){
            this.$store.commit('hideBoardDialog');
            this.$store.dispatch('deleteBoard', this.currentBoard._id)
                      .then((response) => {
                      if(this.boardError){
                          this.$emit("deleteBoardError");
                      }
                      else{
                        this.$emit("deleteBoardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
          },
        },
  
        computed: {
            boardDialogVisible() {
              return this.$store.state.board.boardDialogVisible;
            },
            currentBoard(){
              return this.$store.state.board.currentBoard;
            },
            boardError(){
              return this.$store.state.board.boardError;
            },
        },
  
      }
  </script>
  
  <style>
  .dialog-btn{
    margin-left: 30px;
    color: white!important;
  }
  .dialog-btn:hover{
      background-color: #d1b5f8!important;
  }
  </style>