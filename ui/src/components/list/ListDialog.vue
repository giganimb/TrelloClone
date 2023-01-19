<template>
    <v-dialog
          v-model="listDialogVisible"
          max-width="600"
          @click:outside="onClickOutside"
        >
          <v-card style="width:auto">
              <v-card-text>
                <v-row style="width: 500px; margin: auto">
                  <div style="align-items: center; margin: 20px auto" class="d-flex">
                    <v-text-field 
                      v-model="currentList.name"
                      :rules="nameRules"
                      label="Name"
                      :counter="14"
                      color="#6200EA"
                      >
                    </v-text-field>
                  
                    <v-btn 
                    color="#6200EA"
                    class="dialog-btn"
                    @click="editList"
                    >Edit</v-btn>
                  </div> 
                </v-row>
              </v-card-text>
          </v-card>
      </v-dialog>
  </template>
  
  <script>
      export default {
        name: "list-dialog",
  
        data: () => ({
            nameRules: [
              v => (v && v.length >= 2 && v.length <= 14) || 'Name must be more than 2 and less than 14 characters',
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
  
  <style>
  .dialog-btn{
    margin-left: 30px;
    color: white!important;
  }
  .dialog-btn:hover{
      background-color: #d1b5f8!important;
  }
  </style>