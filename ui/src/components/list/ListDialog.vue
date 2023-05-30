<template>
    <v-dialog
          v-model="listDialogVisible"
          max-width="400"
          @click:outside="onClickOutside"
        >
          <v-card>
              <v-card-text>
                <div class="pt-4 pb-4 d-flex flex-row align-center">
                  <v-text-field 
                    v-model="currentList.name"
                    :rules="nameRules"
                    label="Name"
                    :counter="30"
                    :maxlength="30"
                    color="#6200EA"
                    >
                  </v-text-field>
                
                  <v-btn 
                    color="#6200EA"
                    class="dialog-btn"
                    @click="editList"
                    >Save
                  </v-btn>
                </div> 
              </v-card-text>
          </v-card>
      </v-dialog>
  </template>
  
  <script>
      export default {
        name: "list-dialog",
  
        data: () => ({
            nameRules: [
              v => (v && v.length >= 2 && v.length <= 30) || 'Name must be more than 2 and less than 30 characters',
            ],
        }),
  
        methods: {
          onClickOutside(){
            this.$store.commit('hideListDialog');
          },
          editList(){
            this.$store.dispatch('updateList', { id: this.currentList._id, name: this.currentList.name, boardId: this.$route.params.id })
                      .then((response) => {
                      if(this.listError){
                          this.$emit("updateListError");
                      }
                      else{
                        this.$store.commit('hideListDialog');
                        this.$emit("updateListSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
          },
        },
  
        computed: {
            listDialogVisible() {
              return this.$store.state.list.listDialogVisible;
            },
            currentList(){
                return this.$store.state.list.currentList;
            },
            listError(){
                return this.$store.state.list.listError;
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