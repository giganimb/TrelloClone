<template>
    <div style="height: 100%;">
        <v-alert
        prominent
        type="error"
        v-model="errorAlert"
        color="#823DE1"
        >
            <v-row align="center">
            <v-col class="grow">
                {{ listError ?? cardError }}
            </v-col>
            <v-col>
                <v-btn 
                color="#D1B5F8"
                style="margin-left:200px"
                @click="onClickAlertBtn">Ок</v-btn>
            </v-col>
            </v-row>
        </v-alert>
        
        <div v-if="!this.lists">
            <h1 style="text-align:center">Loading...</h1>
        </div>
        <div v-else style="height: 100%;">
            <work-navigation></work-navigation>
            
            <div class="page-title">
                <h3 style="position: absolute; margin-left: 40px; margin-top: 10px;"> <router-link class="page-title-link" to="/workspaces">Workspaces</router-link> > <router-link class="page-title-link" :to="{ name: 'boards', params: { id: this.currentBoard?.workspaceId } }">Boards</router-link> </h3>
                <h1> {{ this.currentWorkspace?.name }} / {{ this.currentBoard?.name }} </h1>
            </div>
        
            <div class="h-scroll">
                <div class="main">
                    <list-item
                        v-bind:key="list._id"
                        ref="allLists"
                        v-for="list in lists"
                        :list="list"
                        @deleteListError="onListError"
                        @deleteListSuccess="onListSuccess"
                        @createCardError="onCardError"
                        @createCardSuccess="onCardSuccess"
                        @deleteCardError="onCardError"
                        @deleteCardSuccess="onCardSuccess"
                        @updateCardError="onCardError"
                        @updateCardSuccess="onCardSuccess"
                        @updateCardsBetweenListsError="onCardError"
                        @updateCardsBetweenListsSuccess="onCardSuccess">
                    </list-item>
                    <list-draft
                        @createListError="onListError"
                        @createListSuccess="onListSuccess">
                    </list-draft>
                </div>
            </div>
            
            <list-dialog
            @updateListError="onListError"
            @updateListSuccess="onListSuccess"></list-dialog>
        </div>
    </div>
</template>

<script>
import WorkNavigation from '@/components/WorkNavigation.vue';
import ListItem from '@/components/list/ListItem.vue';
import ListDraft from '@/components/list/ListDraft.vue';
import ListDialog from '@/components/list/ListDialog.vue';
    export default {
        components: { WorkNavigation, ListItem, ListDraft, ListDialog },

        data: () => ({
            errorAlert: false,
        }),

        methods: {
            onClickAlertBtn(){
                this.errorAlert = false;
                this.$store.commit('setListError', null);
                this.$store.commit('setCardError', null);
            },
            onListError(){
                this.errorAlert = true;
            },
            onListSuccess(){
                this.$store.dispatch('getAllLists', this.boardId)
                    .then(res => {
                        const lists = this.$refs.allLists;
                        for (let i = 0; i < lists.length; i++) {
                            lists[i].sortList();
                        }
                    });
            },
            onCardError(){
                this.errorAlert = true;
            },
            onCardSuccess(){
                this.$store.dispatch('getAllLists', this.boardId)
                    .then(res => {
                        const lists = this.$refs.allLists;
                        for (let i = 0; i < lists.length; i++) {
                            lists[i].sortList();
                        }
                    });
            },
        },

        computed: {
            lists() {
                return this.$store.state.list.lists;
            },
            isAuth() {
              return this.$store.state.auth.isAuth;
            },
            boardId() {
                return this.$store.state.board.currentBoard._id;
            },
            currentBoard() {
                return this.$store.state.board.currentBoard;
            },
            currentWorkspace() {
                return this.$store.state.workspace.currentWorkspace;
            },
            listError() {
              return this.$store.state.list.listError;
            },
            cardError() {
              return this.$store.state.list.cardError;
            },
        },
        
        mounted(){
            if(!localStorage.getItem('token')){
                this.$router.push({name: 'authorization'});
            };
            this.$store.dispatch('getBoard', this.$route.params.id ?? this.boardId);
            this.$store.dispatch('getWorkspace', this.$route.params.workspaceId ?? this.currentWorkspace._id);
            this.$store.dispatch('getAllLists', this.$route.params.id ?? this.boardId);
        },

        created() {
            this.$store.dispatch('joinPanel', this.$route.params.id ?? this.boardId);
        },

        created() {
            document.title = 'Lists';
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
.h-scroll{
    height: calc(100% - 50px);
    overflow-y: hidden;
    overflow-x: auto;
}
.main{
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    width: calc(100% - 40px);
    height: 100%;
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