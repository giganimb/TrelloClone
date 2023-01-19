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
  
        <work-navigation></work-navigation>
        
        <div class="main">
            <list-item
            v-bind:key="list._id"
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
            @updateCardsBetweenListsSuccess="onCardSuccess"></list-item>
            <list-draft
            @createListError="onListError"
            @createListSuccess="onListSuccess"></list-draft>
        </div>
        <list-dialog
        @updateListError="onListError"
        @updateListSuccess="onListSuccess"></list-dialog>
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
                this.$store.dispatch('getAllLists', this.boardId);
            },
            onCardError(){
                this.errorAlert = true;
            },
            onCardSuccess(){
                this.$store.dispatch('getAllLists', this.boardId);
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
            this.$store.dispatch('getAllLists', this.$route.params.id ?? this.boardId);
        },

        created() {
            this.$store.dispatch('joinPanel', this.$route.params.id ?? this.boardId);
        },

        // created(){
        //     if(!this.isAuth){
        //         this.$router.push({name: 'authorization'});
        //     };
        //     this.$store.dispatch('getAllLists', this.boardId);
        // },
    }
</script>

<style>
.main{
    margin-top: 20px;
    padding: 0 20px;
    display: flex;
    overflow-x: scroll;
    width: calc(100% - 40px);
    height: calc(162% - 100px);
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