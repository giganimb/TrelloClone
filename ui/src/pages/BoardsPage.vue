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
  
      <work-navigation></work-navigation>
      
      <div>
        <div class="page-title">
          <h1>Boards</h1>
        </div>
        <v-container>
          <create-board-form
          @createBoardError="onBoardError"
          @createBoardSuccess="onBoardSuccess"></create-board-form>
          <v-combobox
            label="Sort by name"
            v-model="select"
            :items="items"
            color="#823DE1"
            @change="onComboboxChange"
            outlined
            style="margin: 0px 220px"
          ></v-combobox>
          <v-row>
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
          @deleteBoardSuccess="onBoardSuccess"></board-dialog>
        </v-container>
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
            select: 'Asc',
            items: [
              'Asc',
              'Desc',
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
                                                     sort_type: this.select.toLowerCase()});
            },
            onBoardError() {
              this.errorAlert = true;
            },
            onBoardSuccess() {
              this.$store.dispatch('getAllBoards', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.select.toLowerCase()});
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
            if(!localStorage.getItem('token')){
                this.$router.push({name: 'authorization'});
            };
            // this.$store.dispatch('getAllWorkspaces', this.authId);
            // this.$store.dispatch('getUser', this.authId);
            this.$store.dispatch('getWorkspace', this.$route.params.id ?? this.workspaceId);
            this.$store.dispatch('getAllBoards', { workspaceId: this.$route.params.id ?? this.workspaceId, 
                                                     sort_type: this.select.toLowerCase()});
          },

          // created(){
          //   if(!this.isAuth){
          //       this.$router.push({name: 'authorization'});
          //   };
          //   this.$store.dispatch('getAllBoards', this.workspaceId);
          // },
  
      }
  </script>
  
  <style>
  .page-title{
    color: #0d001f;
    text-align: center;
    margin-top: 20px;
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