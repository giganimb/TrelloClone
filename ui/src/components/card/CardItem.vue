<template>
  <div class="card" draggable="true" @drop="onDrop" @dragstart="onDragStart" @dragover.prevent>
    <div class="edit-button" @click="editCard">
      <img src="@/assets/images/edit.png" width="16px" height="16px">
    </div>
    <div class="close-button" @click="removeCardFromList">
      <img src="@/assets/images/x.png" width="14px" height="14px">
    </div>
    <div class="body">
      {{ this.card.name }}
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
  padding: 30px 15px 40px;
  background-color: #fff;
  border-radius: 8px;
  width: calc(100% - 30px);
  cursor: grab;

  .close-button {
    position: absolute;
    top: 6px;
    right: 15px;
    cursor: pointer;
  }

  .edit-button {
    position: absolute;
    top: 6px;
    left: 15px;
    cursor: pointer;
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