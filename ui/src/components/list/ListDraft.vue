<template>
  <form :class="classList" @submit.prevent="addList">
    <input type="text" class="text-input" maxlength="30" contenteditable="true" v-model="name" ref="textInput" placeholder="Add new list" @focusin="startEditing" @focusout="finishEditing">
    <button type="submit" class="add-button" v-if="isEditing || isAddable">
      Add
    </button>
  </form>
</template>

<script>
    export default {
        name: "list-draft",

        data: () => ({
            isEditing: false,
            name: '',
        }),

        methods: {
            startEditing() {
                this.isEditing = true;
            },
            finishEditing() {
                this.isEditing = false;
            },
            addList() {
                this.$store.dispatch('createList', { name: this.name, position: (this.countOflists + 1), boardId: this.boardId, workspaceId: this.currentBoard.workspaceId })
                      .then((response) => {
                      if(this.listError){
                        this.$emit("createListError");
                      }
                      else{
                        this.$emit("createListSuccess");
                      }
                  })
                      .catch((error) => {
                      console.log(error);
                });
                this.name = '';
            }
        },

        computed: {
            classList() {
                const classList = ['list-draft'];

                if(this.isEditing) {
                    classList.push('active');
                }

                if(this.titleExists) {
                    classList.push('addable');
                }

                return classList;
            },
            titleExists() {
                return this.name.length > 0;
            },
            isAddable() {
                return this.titleExists
            },
            boardId() {
                return this.$store.state.board.currentBoard._id;
            },
            currentBoard() {
                return this.$store.state.board.currentBoard;
            },
            listError() {
                return this.$store.state.list.listError;
            },
            countOflists(){
              return this.$store.state.list.countOflists;
            },
        },
    }
</script>

<style lang="scss" scoped>
.list-draft {
  margin: 0 10px auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 320px;
  width: 320px;

  .text-input {
    margin-top: 40px;
    padding: 20px 15px;
    width: calc(100% - 30px);
    background-color: #cccccc;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 24px;
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
    background-color: #999999;
    border: none;
    border-radius: 8px;
    font-family: "Noto Sans Japanese", "Noto Sans", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #ffffff;
  }

  .add-button:hover {
    opacity: 0.8;
  }
}

.list-draft.active, .card-draft.addable {
  .text-input {
    background-color: #cccccc;
  }
}

.list-draft.active {
  .add-button {
    pointer-events: none;
  }
}

.list-draft.addable {
  .add-button {
    background-color: #6200EA;
    pointer-events: auto;
    cursor: pointer;
  }

  .add-button:active {
    background-color: #823de1;
  }
}
</style>