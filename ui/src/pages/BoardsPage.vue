<template>
    <div>
  
      <v-alert
        prominent
        type="error"
        v-model="errorAlert"
        color="#823DE1"
      >
        <v-row align="center">
          <v-col class="grow">
            {{ boardError ?? listError }}
          </v-col>
          <v-col>
            <v-btn 
            color="#D1B5F8"
            style="margin-left:200px"
            @click="onClickAlertBtn">Ок</v-btn>
          </v-col>
        </v-row>
      </v-alert>
      
      <div v-if="!this.boards">
        <h1 style="text-align:center">Loading...</h1>
      </div>
      <div v-else>
        <work-navigation></work-navigation>
        <div>
          <div class="page-title">
            <h3 style="position: absolute; margin-left: 40px; margin-top: 10px;"> <router-link class="page-title-link" to="/workspaces">Workspaces</router-link> </h3>
            <h1> {{ this.currentWorkspace.name }} </h1>
          </div>
          <v-container>
            <div class="d-flex flex-row justify-start">
              <create-board-form
                @createBoardError="onBoardError"
                @createBoardSuccess="onBoardSuccess">
              </create-board-form>
              <div style="width: 100%;" class="d-flex flex-row align-end">
                <v-combobox
                  style="max-width: 230px;"
                  class="ml-4"
                  label="Sort by"
                  v-model="fieldSelect"
                  :items="fieldItems"
                  color="#823DE1"
                  @change="onComboboxChange"
                  outlined
                  dense
                ></v-combobox>
                <v-combobox
                  style="max-width: 230px;"
                  class="ml-4"
                  label="Order"
                  v-model="typeSelect"
                  :items="typeItems"
                  color="#823DE1"
                  @change="onComboboxChange"
                  outlined
                  dense
                ></v-combobox>
              </div>
            </div>
            
            <v-row class="mt-2">
              <board-item
                v-bind:key="board._id"
                v-for="board in this.boards"
                :board="board"
                @getListsError="onListError"
              />
            </v-row>
            <board-dialog
              @updateBoardError="onBoardError"
              @updateBoardSuccess="onBoardSuccess"
              @deleteBoardError="onBoardError"
              @deleteBoardSuccess="onBoardSuccess">
            </board-dialog>
          </v-container>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import WorkNavigation from '@/components/WorkNavigation.vue';
  import CreateBoardForm from '@/components/board/CreateBoardForm.vue';
  import BoardItem from '@/components/board/BoardItem.vue';
  import BoardDialog from '@/components/board/BoardDialog.vue';
      export default {
          components:{ WorkNavigation, CreateBoardForm, BoardItem, BoardDialog },
          data: () => ({
            errorAlert: false,
            typeSelect: {
              text: 'Asc',
              value: 'asc',
            },
            typeItems: [
              {
                text: 'Asc',
                value: 'asc',
              },
              {
                text: 'Desc',
                value: 'desc',
              }
            ],
            fieldSelect: {
              text: 'Name',
              value: 'name',
            },
            fieldItems: [
              {
                text: 'Name',
                value: 'name',
              },
              {
                text: 'Creation date',
                value: 'createdAt',
              }
            ],
          }),
  
          methods: {
            onClickAlertBtn(){
              this.errorAlert = false;
              this.$store.commit('setBoardError', null);
              this.$store.commit('setListError', null);
            },
            onComboboxChange(){
              this.$store.dispatch('getAllBoards', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.typeSelect.value, sort_field: this.fieldSelect.value});
            },
            onBoardError() {
              this.errorAlert = true;
            },
            onBoardSuccess() {
              this.$store.dispatch('getAllBoards', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.typeSelect.value, sort_field: this.fieldSelect.value});
            },
            onListError(){
              this.errorAlert = true;
            },
          },
  
          computed: {
            isAuth() {
              return this.$store.state.auth.isAuth;
            },
            authId() {
              return this.$store.state.auth.userData.user.id;
            },
            workspaceId() {
                return this.$store.state.workspace.currentWorkspace._id;
            },
            currentWorkspace() {
                return this.$store.state.workspace.currentWorkspace;
            },
            boards() {
              return this.$store.state.board.boards;
            },
            boardError() {
              return this.$store.state.board.boardError;
            },
            listError() {
              return this.$store.state.list.listError;
            },
          },
          
          mounted(){
            if(!this.isAuth && !localStorage.getItem('token')){
              this.$router.push({name: 'authorization'});
            }
            // this.$store.dispatch('getAllWorkspaces', this.authId);
            // this.$store.dispatch('getUser', this.authId);
            this.$store.dispatch('getWorkspace', this.$route.params.id ?? this.workspaceId);
            this.$store.dispatch('getAllBoards', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.typeSelect.value, sort_field: this.fieldSelect.value});
          },

          created() {
            document.title = 'Boards';
            this.$store.dispatch('joinWorkspace', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.typeSelect.value, sort_field: this.fieldSelect.value});
          },
      }
  </script>
  
  <style scoped>
  .page-title{
    color: #0d001f;
    text-align: center;
    margin-top: 20px;
  }
  .page-title-link{
    text-decoration: none;
    color: #0d001f;
  }
  .page-title-link:hover{
    text-decoration: underline;
  }
  .v-alert {
    position: fixed;
    z-index: 100;
    left: 50%;
    bottom: 80%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
  </style>