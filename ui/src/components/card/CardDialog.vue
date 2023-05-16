<template>
    <v-dialog
          v-model="cardDialogVisible"
          max-width="500"
          @click:outside="onClickOutside"
        >
          <v-card style="width:auto">
              <v-card-text>
                  <div class="pt-4 d-flex flex-column align-center">
                    <div class="d-flex flex-row align-center justify-space-around" style="width: 100%;">
                      <div style="max-width: 300px; width: 100%; min-width: 100px;">
                        <v-text-field 
                          v-model="currentCard.name"
                          :rules="nameRules"
                          label="Name"
                          :counter="14"
                          :maxlength="14"
                          color="#6200EA"
                          >
                        </v-text-field>
                      </div>
                      
                      <div class="question-button" @click="solveTask">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <img class="icon" src="@/assets/icons/question.png" width="20px" height="20px" v-bind="attrs" v-on="on">
                          </template>
                          <span>Show solution</span>
                        </v-tooltip>
                      </div>
                    </div>

                    <div class="mt-4" v-show="currentCardSolution" style="width: 100%; max-width: 400px; min-width: 200px;">
                      <v-textarea
                        v-model="currentCardSolution"
                        readonly
                        outlined
                        shaped
                        no-resize
                        label="Task solution"
                        color="#6200EA"
                      ></v-textarea>
                    </div>

                    <div class="mt-4" style="width: 100%; max-width: 400px; min-width: 200px;">
                      <v-textarea
                        v-model="currentCard.description"
                        class="mb-2"
                        height="200"
                        :counter="1000"
                        :rules="descriptionRules"
                        no-resize
                        outlined
                        label="Description"
                        color="#6200EA"
                      ></v-textarea>
                    </div>
                    
                    <div v-show="currentCardDescriptionSummarization" style="width: 100%; max-width: 400px; min-width: 200px;">
                      <v-textarea
                        v-model="currentCardDescriptionSummarization"
                        readonly
                        outlined
                        shaped
                        no-resize
                        label="Description sumarization"
                        color="#6200EA"
                      ></v-textarea>
                    </div>

                    <div class="d-flex flex-row justify-space-between" style="width: 100%">
                      <v-btn 
                        :disabled="!currentCard.description"
                        color="#6200EA"
                        class="dialog-btn"
                        @click="summarizeDescription"
                        >Summarize description
                      </v-btn>
                      <v-btn 
                        color="#6200EA"
                        class="dialog-btn"
                        @click="editCard"
                        >Save
                      </v-btn>
                    </div>
                    
                    <div class="text mt-4 d-flex flex-row justify-space-between" style="width: 100%;">
                      <div>
                        <span style="font-weight: bolder;">Created at:</span> {{ getFullDate(new Date(currentCard.createdAt)) }}
                      </div>

                      <div>
                        <span style="font-weight: bolder;">Updated at:</span> {{ getFullDate(new Date(currentCard.updatedAt)) }}
                      </div>
                    </div> 

                  </div>
              </v-card-text>
          </v-card>
      </v-dialog>
</template>
  
<script>
      export default {
        name: "card-dialog",
  
        data: () => ({
            taskSolution: '',
            descriptionSummarization: '',
            nameRules: [
              v => (v && v?.length >= 2 && v?.length <= 14) || 'Name must be more than 2 and less than 14 characters',
            ],
            descriptionRules: [
              v => (v.length <= 1000) || 'Description must be less than 1000 characters',
            ],
        }),
  
        methods: {
          getFullDate(date){
              return `${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()}  ${date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()}`;
          },
          onClickOutside(){
            this.$store.commit('setCurrentCardSolution', '');
            this.$store.commit('setCurrentCardDescriptionSummarization', '');
            this.$store.commit('hideCardDialog');
          },
          editCard(){
            this.$store.dispatch('updateCard', { id: this.currentCard._id, name: this.currentCard.name, boardId: this.$route.params.id, description: this.currentCard.description })
                      .then((response) => {
                      if(this.boardError){
                          this.$emit("updateCardError");
                      }
                      else{
                        this.$store.commit('setCurrentCardSolution', '');
                        this.$store.commit('setCurrentCardDescriptionSummarization', '');
                        this.$store.commit('hideCardDialog');
                        this.$emit("updateCardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
          },
          solveTask(){
            this.$store.dispatch('solveCardTask', { task: this.currentCard.name, email: this.currentUser.email })
              .then((response) => {
                this.taskSolution = response;
              })
              .catch((error) => {
                console.log(error);
              });
          },
          summarizeDescription(){
            this.$store.dispatch('summarizeCardDescription', { text: this.currentCard.description, email: this.currentUser.email })
              .then((response) => {
                this.descriptionSummarization = response;
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
              return this.$store.state.list?.currentCard;
            },
            currentCardSolution(){
              return this.$store.state.youcomApi?.currentCardSolution;
            },
            currentCardDescriptionSummarization(){
              return this.$store.state.youcomApi?.currentCardDescriptionSummarization;
            },
            currentUser() {
              return this.$store.state.user?.user;
            },
            cardError(){
              return this.$store.state.list.cardError;
            },
        },
  
      }
</script>
  
<style scoped>
  .dialog-btn{
    color: #ffffff!important;
  }
  .dialog-btn:hover{
      background-color: #d1b5f8!important;
  }
  .text{
    color: #0d001f;
  }

  .question-button {
    cursor: pointer;
  }

  .icon{
    border-radius: 4px;
  }

  .icon:hover{
    background: #cccccc;
  }
</style>