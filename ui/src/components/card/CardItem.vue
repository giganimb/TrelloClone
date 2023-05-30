<template>
  <div class="card" draggable="true" @drop="onDrop" @dragstart="onDragStart" @dragover.prevent>
    <div class="d-flex flex-row align-center" style="width: 100%; height: 100%;">
      <div class="body">
          {{ card.name }}
      </div>
      <div class="icons align-self-center d-flex flex-row">
        <div class="edit-button" @click="editCard">
          <img class="icon" src="@/assets/icons/info.png" width="20px" height="20px">
        </div>
        <div class="close-button" @click="removeCardFromList">
          <img class="icon" src="@/assets/icons/trash-can.png" width="20px" height="20px">
        </div>
      </div>
    </div>
    <div class="d-flex flex-row justify-end align-center" style="padding: 10px;">
      <div v-show="card?.expiryDate" style="margin-left: 0; margin-right: auto;">
        {{ getFullDate(new Date(card.expiryDate)) }}
      </div>
      <img style="margin-right: 4px;" v-show="card?.expiryDate" :class="{ 'green-dot': checkIsGreen(), 'yellow-dot': checkIsYellow(), 'red-dot': checkIsRed() }" width="14px" height="14px">
      <img v-show="card?.priority" :class="{ 'green-flag': checkIsLow(), 'yellow-flag': checkIsMedium(), 'red-flag': checkIsHigh() }" width="24px" height="24px">
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

        data: () => ({
        }),

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
            getFullDate(date){
              return `${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()}`;
            },
            getIsoDate(date){
              return `${date.getFullYear()}.${(date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}`;
            },
            checkIsGreen(){
              return (this.card?.expiryDate && (((new Date(this.card?.expiryDate)).getTime() - (new Date(this.getIsoDate(new Date()))).getTime()) / 86400000 > 7));
            },
            checkIsYellow(){
              return (this.card?.expiryDate && (((new Date(this.card?.expiryDate)).getTime() - (new Date(this.getIsoDate(new Date()))).getTime()) / 86400000 > 3) && (((new Date(this.card?.expiryDate)).getTime() - (new Date(this.getIsoDate(new Date()))).getTime()) / 86400000 <= 7));
            },
            checkIsRed(){
              return (this.card?.expiryDate && (((new Date(this.card?.expiryDate)).getTime() - (new Date(this.getIsoDate(new Date()))).getTime()) / 86400000 <= 3));
            },
            checkIsLow(){
              return this.card?.priority == 1;
            },
            checkIsMedium(){
              return this.card?.priority == 2;
            },
            checkIsHigh(){
              return this.card?.priority == 3;
            },
        },
    }
</script>

<style lang="scss" scoped>
.card {
  margin-bottom: 15px;
  position: relative;
  background-color: #ffffff;
  border-radius: 8px;
  width: calc(100% - 30px);
  min-height: 50px;
  max-height: 600px;
  cursor: grab;

  .close-button {
    display: none;
    margin-left: 4px;
    margin-right: 10px;
  }

  .edit-button {
    display: none;
  }

  &:hover {
    .body{
      width: 70%
    }
    .close-button {
      display: block;
      cursor: pointer;
    }

    .edit-button {
      display: block;
      cursor: pointer;
    }
  }

  .icons{
    margin-right: 0; 
    margin-left: auto;
  }

  .icon{
    border-radius: 4px;
  }
  
  .icon:hover{
    background: #cccccc;
  }

  .date-text {
    font-size: 20px;
    padding: 10px;
  }

  .body {
    font-size: 20px;
    width: 100%;
    height: 100%;
    word-wrap: break-word;
    padding: 10px;
  }
}

.green-dot{
  content: url('@/assets/icons/green-dot.png');
}

.yellow-dot{
  content: url('@/assets/icons/yellow-dot.png');
}

.red-dot{
  content: url('@/assets/icons/red-dot.png');
}

.green-flag{
  content: url('@/assets/icons/green-flag.png');
}

.yellow-flag{
  content: url('@/assets/icons/yellow-flag.png');
}

.red-flag{
  content: url('@/assets/icons/red-flag.png');
}

.card:last-child {
  margin-bottom: 0;
}
</style>