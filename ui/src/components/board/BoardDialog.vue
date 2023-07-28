<template>
    <v-dialog
          v-model="boardDialogVisible"
          max-width="500"
          @click:outside="onClickOutside"
        >
          <v-card>
              <v-card-text>
                  <div class="pt-4">
                    <v-text-field 
                      v-model="currentBoard.name"
                      :rules="nameRules"
                      label="Name"
                      :counter="30"
                      :maxlength="30"
                      color="#6200EA"
                      >
                    </v-text-field>
                    
                    <div class="mt-2 mb-2">
                      <v-col cols="10" class="d-flex flex-row justify-center flex-wrap" style="margin-left: auto; margin-right: auto;">
                        <div class="color" v-for="color in colors" :key="color" :style="{ background: color}" @click="onColorClick(color)">
                          <img src="../../assets/icons/check-mark.png" width="18px" height="18px" v-if="currentBoard.color == color" style="margin-left: auto; margin-right: 4px; display: block;" />
                        </div>
                      </v-col>
                    </div>

                    <v-textarea
                      v-model="currentBoard.description"
                      class="mb-2"
                      height="200"
                      :counter="1000"
                      :maxlength="1000"
                      no-resize
                      outlined
                      label="Description"
                      color="#6200EA"
                    ></v-textarea>
                    
                    <div class="d-flex flex-row">
                      <v-btn 
                        color="#6200EA"
                        class="dialog-btn"
                        @click="deleteBoard"
                        style="margin-right: auto; margin-left: 0;"
                        >Delete
                      </v-btn>

                      <v-btn 
                        color="#6200EA"
                        class="dialog-btn"
                        @click="editBoard"
                        style="margin-right: 0; margin-left: auto;"
                        >Save
                      </v-btn>
                    </div>
                  </div> 
              </v-card-text>
          </v-card>
      </v-dialog>
  </template>
  
  <script>
      export default {
        name: "board-dialog",
  
        data: () => ({
            nameRules: [
              v => (v && v.length >= 2 && v.length <= 30) || 'Name must be more than 2 and less than 30 characters',
            ],
            colors: [
              '#823DE1',
              '#6200EA',
              '#D81B60FF',
              '#F44336FF',
              '#00897BFF',
              '#43A047FF',
              '#FF8F00FF',
              '#FDD835FF',
              '#AFB42BFF',
              '#9E9E9EFF',
            ],
        }),
  
        methods: {
          onClickOutside(){
            this.$store.commit('hideBoardDialog');
          },
          editBoard(){
            this.$store.dispatch('updateBoard', { id: this.currentBoard._id, name: this.currentBoard.name, workspaceId: this.currentBoard.workspaceId, color: this.currentBoard.color, description: this.currentBoard.description })
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
            this.$store.dispatch('deleteBoard', {id: this.currentBoard._id, workspaceId: this.currentBoard.workspaceId})
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
          onColorClick(color){
            this.currentBoard.color = color;
          },
        },
        
        computed: {
            boardDialogVisible() {
              return this.$store.state.board.boardDialogVisible;
            },
            currentBoard(){
              return this.$store.state.board?.currentBoard;
            },
            boardError(){
              return this.$store.state.board.boardError;
            },
        },
  
      }
  </script>
  
  <style scoped>
  .dialog-btn{
    color: white!important;
  }
  .dialog-btn:hover{
      background-color: #d1b5f8!important;
  }
  .color{
    width: 60px;
    height: 60px;
    margin: 2px;
    cursor: pointer;
  }
  .color:hover{
    opacity: 0.5;
  }
  
</style>