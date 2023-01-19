<template>
    <v-dialog
          v-model="cardDialogVisible"
          max-width="600"
          @click:outside="onClickOutside"
        >
          <v-card style="width:auto">
              <v-card-text>
                <v-row style="width: 500px; margin: auto">
                  <div style="align-items: center; margin: 20px auto" class="d-flex">
                    <v-text-field 
                      v-model="currentCard.name"
                      :rules="nameRules"
                      label="Name"
                      :counter="14"
                      color="#6200EA"
                      >
                    </v-text-field>
                  
                    <v-btn 
                    color="#6200EA"
                    class="dialog-btn"
                    @click="editCard"
                    >Edit</v-btn>
                  </div> 
                </v-row>
              </v-card-text>
          </v-card>
      </v-dialog>
  </template>
  
  <script>
      export default {
        name: "card-dialog",
  
        data: () => ({
            nameRules: [
              v => (v && v.length >= 2 && v.length <= 14) || 'Name must be more than 2 and less than 14 characters',
            ],
        }),
  
        methods: {
          onClickOutside(){
            this.$store.commit('hideCardDialog');
          },
          editCard(){
            this.$store.dispatch('updateCard', { id: this.currentCard._id, name: this.currentCard.name, boardId: this.$route.params.id })
                      .then((response) => {
                      if(this.boardError){
                          this.$emit("updateCardError");
                      }
                      else{
                        this.$store.commit('hideCardDialog');
                        this.$emit("updateCardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
          },
        },
  
        computed: {
            cardDialogVisible() {
              return this.$store.state.list.cardDialogVisible;
            },
            currentCard(){
                return this.$store.state.list.currentCard;
            },
            cardError(){
                return this.$store.state.list.cardError;
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