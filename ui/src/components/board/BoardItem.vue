<template>
  <v-col cols="4">
    <v-card>
      <v-card-text>
        <v-row align="center" justify="center">
          <v-col>
            <div @click="onBoardClick" class="board-name">
              {{ board.name }}
            </div>
          </v-col>
          
          <v-col>
            <div style="margin-left: 70%;">
              <v-btn 
              color="#6200EA"
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
          </v-col>
          
        </v-row>
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
                  this.$router.push({name: 'lists', params: { id: this.board._id }});
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
  margin-left: 30px;
  color: white!important;
}
.edit-in-btn:hover{
    background-color: #d1b5f8!important;
}
.board-name{
  text-align: left; 
  font-size: 20px; 
  font-weight: 500; 
  color:#0d001f; 
  margin-right: 30px;
}
.board-name:hover{
  cursor: pointer;
}
</style>