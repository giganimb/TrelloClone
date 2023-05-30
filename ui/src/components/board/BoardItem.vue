<template>
  <v-col cols="4">
    <v-card width="400" min-height="120" elevation="10" :style="{ background: board.color }">
      <v-card-text>
        <div class="d-flex flex-row align-center justify-space-between mt-2">
          <div @click="onBoardClick">
            <span class="board-name">
              {{ board.name }}
            </span>
          </div>
        
          <div>
            <v-btn 
            class="edit-in-btn"
            fab
            small
            outlined
            @click="onBoardEditBtnClick"
            >
            <v-icon dark>
              mdi-pencil
            </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="d-flex flex-column justify-space-between card-text mt-2">
          <div v-show="board.description" style="max-height: 400px;">
            <span style="font-weight: bolder;">Description:</span> 
            <v-textarea
              v-model="board.description"
              readonly
              solo
              no-resize
            ></v-textarea>
          </div>
          <div>
            <span style="font-weight: bolder;">Created at:</span> {{ getFullDate(new Date(board.createdAt)) }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
    export default {
        name: "board-item",

        props: {
            board: {
                type: Object,
                required: true
            }
        },

        methods: {
            getFullDate(date){
              return `${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()}  ${date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()}`;
            },
            onBoardEditBtnClick() {
              this.$store.commit("setCurrentBoard", this.board);
              this.$store.commit("showBoardDialog");
            },
            onBoardClick(){
              this.$store.commit("setCurrentBoard", this.board);
              this.$store.dispatch("getAllLists", this.board._id)
              .then((response) => {
                if(this.listError){
                  this.$emit("getListsError");
                }
                else{
                  this.$router.push({name: 'lists', params: { id: this.board._id, workspaceId: this.board.workspaceId }});
                }
              })
              .catch((error) => {
                      console.log(error);
              });
            },
        },
    }
</script>

<style>
.edit-in-btn{
  color: #ffffff!important;
}
.edit-in-btn:hover{
  background-color: #d1b5f8!important;
}
.board-name{
  text-align: left; 
  font-size: 20px; 
  font-weight: 600; 
  color:#ffffff; 
  margin-right: 30px;
  word-break: break-word;
}
.card-text{
  text-align: left; 
  font-size: 16px; 
  font-weight: 400; 
  color:#ffffff; 
}
.board-name:hover{
  cursor: pointer;
  text-decoration: underline;
}
</style>