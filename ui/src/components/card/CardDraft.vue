<template>
  <form :class="classList" @submit.prevent="addCardToList" @drop="onDrop" @dragover.prevent>
    <input type="text" class="text-input" maxlength="100" contenteditable="true" v-model="name" ref="textInput" placeholder="Add new card" @focusin="startEditing" @focusout="finishEditing">
    <button type="submit" class="add-button" v-if="isEditing || isAddable">
      Add
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex';
    export default {
        name: "card-draft",

        props: {
          listId: {
            type: String,
            required: true,
          },
        },

        data: () => ({
            isEditing: false,
            name: ''
        }),

        methods: {
            startEditing() {
            this.isEditing = true;
            },
            finishEditing() {
            this.isEditing = false;
            },
            addCardToList() {
              this.$store.dispatch('createCard', { name: this.name, listId: this.listId, boardId: this.$route.params.id })
                      .then((response) => {
                      if(this.cardError){
                        this.$emit("createCardError");
                      }
                      else{
                        this.$emit("createCardSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                });
              this.name = '';
            },
            onDrop({ dataTransfer }) {
                const { from } = JSON.parse(dataTransfer.getData("application/json"));
                const to = {
                    listId: this.listId,
                    cardPosition: null,
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
            ...mapMutations({
                moveCardToList: 'moveCardtoList'
            })
        },

        computed: {
            classList() {
                const classList = ['card-draft'];

                if(this.isEditing) {
                    classList.push('active');
                }

                if(this.bodyExists) {
                    classList.push('addable');
                }

                return classList;
            },
            bodyExists() {
                return this.name.length > 0;
            },
            isAddable() {
                return this.bodyExists
            },
            // listId() {
            //     return this.$store.state.list.currentList._id;
            // },
            cardError() {
                return this.$store.state.list.cardError;
            },
        },
    }
</script>

<style lang="scss" scoped>
.card-draft {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .text-input {
    padding: 15px;
    width: calc(100% - 30px);
    background-color: #cccccc;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #0d001f;
    cursor: pointer;
    overflow: overlay;
  }

  .text-input:focus {
    outline: 0;
    cursor: initial;
  }

  .add-button {
    margin-top: 15px;
    padding: 15px 18px;
    align-self: flex-start;
    margin-left: 15px;
    background-color: #999999;
    border: none;
    border-radius: 8px;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
  }

  .add-button:hover {
    opacity: 0.8;
  }
}

.card-draft.active, .card-draft.addable {
  .text-input {
    background-color: #fff;
  }
}

.card-draft.active {
  .add-button {
    pointer-events: none;
  }
}

.card-draft.addable {
  .add-button {
    background-color: #6200EA;
    pointer-events: auto;
    cursor: pointer;
  }

  .add-button:hover {
    background-color: #823de1;
  }

  .add-button:active {
    background-color: #823de1;
  }
}
</style>