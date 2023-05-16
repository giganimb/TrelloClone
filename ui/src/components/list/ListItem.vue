<template>
  <div class="list" @dragover.prevent>
    <div class="edit-button" @click="editList">
      <img src="@/assets/icons/edit.png" width="16px" height="16px">
    </div>
    <div class="close-button" @click="removeList">
      <img src="@/assets/icons/close.png" width="20px" height="20px">
    </div>
    <div class="title">
      {{ list.name }}
    </div>
    <div class="cards d-flex flex-column align-center" v-if="cardCount > 0">
      <card-item
        v-bind:key="card._id"
        v-for="card in list.cards"
        :card="card"
        @deleteCardError="onDeleteCardError"
        @deleteCardSuccess="onDeleteCardSuccess"
        @updateCardsBetweenListsError="onUpdateCardsBetweenListsError"
        @updateCardsBetweenListsSuccess="onUpdateCardsBetweenListsSuccess">
      </card-item>
    </div>
    <card-draft
      :listId="this.list._id"
      @createCardError="onCreateCardError"
      @createCardSuccess="onCreateCardSuccess">
    </card-draft>
    <card-dialog
      @updateCardError="onUpdateCardError"
      @updateCardSuccess="onUpdateCardSuccess">
    </card-dialog>
  </div>
</template>

<script>
import CardItem from '../card/CardItem.vue';
import CardDraft from '../card/CardDraft.vue';
import CardDialog from '../card/CardDialog.vue';
    export default {
        name: "list-item",
        components: { CardItem, CardDraft, CardDialog },
        props: {
          list: {
              type: Object,
              required: true
          },
        },
    
        methods: {
            removeList() {
              this.$store.dispatch('deleteList', { id: this.list._id, boardId: this.$route.params.id})
                      .then((response) => {
                      if(this.listError){
                        this.$emit("deleteListError");
                      }
                      else{
                        this.$emit("deleteListSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                });
            },
            editList() {
              this.$store.commit("setCurrentList", this.list);
              this.$store.commit("showListDialog");
            },
            onCreateCardError(){
              this.$emit("createCardError");
            },
            onCreateCardSuccess(){
              this.$emit("createCardSuccess");
            },
            onDeleteCardError(){
              this.$emit("deleteCardError");
            },
            onDeleteCardSuccess(){
              this.$emit("deleteCardSuccess");
            },
            onUpdateCardError(){
              this.$emit("updateCardError");
            },
            onUpdateCardSuccess(){
              this.$emit("updateCardSuccess");
            },
            onUpdateCardsBetweenListsError(){
              this.$emit("updateCardsBetweenListsError");
            },
            onUpdateCardsBetweenListsSuccess(){
              this.$emit("updateCardsBetweenListsSuccess");
            },
        },

        computed: {
            cardCount() {
                return this.list.cards.length;
            }
        },
    }
    
</script>

<style lang="scss" scoped>
.list {
  margin: 0 10px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 290px;
  width: 290px;
  background-color: #d1b5f8;
  border-radius: 8px;
  padding: 15px;

  .close-button {
    position: absolute;
    z-index: 50;
    top: 2px;
    right: 14px;
    font-size: 28px;
    cursor: pointer;
    transition: transform 0.5s;
  }

  .close-button:hover {
    transform: rotate(360deg);
  }

  .edit-button {
    z-index: 50;
    cursor: pointer;
    transition: transform 0.5s;
  }

  .edit-button:hover {
    transform: rotate(360deg);
  }

  .title {
    position: absolute;
    top: 3px;
    text-align: center;
    margin-bottom: 20px;
    margin: 5px 0;
    font-size: 24px;
    width: calc(100% - 20px);
    word-break: break-word;
  }
 
  .cards {
    margin-top: 40px;
    width: 100%;
  }
}
</style>