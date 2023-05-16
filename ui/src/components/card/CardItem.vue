<template>
  <div class="card" draggable="true" @drop="onDrop" @dragstart="onDragStart" @dragover.prevent>
    <div class="d-flex flex-row" style="width: 100%;">
      <div class="body ml-4">
        {{ this.card.name }}
      </div>
      <div class="edit-button" @click="editCard" style="margin-right: 0; margin-left: auto;">
        <img class="icon" src="@/assets/icons/info.png" width="20px" height="20px">
      </div>
      <div class="close-button mr-2 ml-2" @click="removeCardFromList">
        <img class="icon" src="@/assets/icons/trash-can.png" width="20px" height="20px">
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "card-item",
        props: {
          card: {
              type: Object,
              required: true
          },
        },

        methods: {
            removeCardFromList() {
              this.$store.dispatch('deleteCard', { id: this.card._id, boardId: this.$route.params.id })
                      .then((response) => {
                      if(this.listError){
                        this.$emit("deleteCardError");
                      }
                      else{
                        this.$emit("deleteCardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
            },
            editCard(){
              this.$store.commit("setCurrentCard", this.card);
              this.$store.commit("showCardDialog");
            },
            onDragStart({ dataTransfer }) {
                this.isDrag = true;
                dataTransfer.effectAllowed = 'move';
                dataTransfer.setData("application/json", JSON.stringify({
                    from: {
                    listId: this.card.listId,
                    cardPosition: this.card.position,
                    }
                }));

            },
            onDrop({ dataTransfer }) {
                const { from } = JSON.parse(dataTransfer.getData("application/json"));
                const to = {
                    listId: this.card.listId,
                    cardPosition: this.card.position,
                }

                this.$store.dispatch('updateCardsBetweenLists', { from: from, to: to, boardId: this.$route.params.id })
                      .then((response) => {
                      if(this.listError){
                        this.$emit("updateCardsBetweenListsError");
                      }
                      else{
                        this.$emit("updateCardsBetweenListsSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                  });
            },
            
        },
    }
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  width: calc(100% - 30px);
  height: 50px;
  cursor: grab;

  .close-button {
    display: none;
  }

  .edit-button {
    display: none;
  }

  &:hover {
    .close-button {
      display: block;
      cursor: pointer;
    }

    .edit-button {
      display: block;
      cursor: pointer;
    }
    
  }

  .icon{
    border-radius: 4px;
  }
  
  .icon:hover{
    background: #cccccc;
  }

  .body {
    font-size: 18px;
    width: 100%;
    word-wrap: break-word;
  }
}

.card:last-child {
  margin-bottom: 0;
}
</style>