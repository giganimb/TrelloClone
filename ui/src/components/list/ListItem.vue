<template>
  <div class="list" @dragover.prevent>
      <div class="d-flex flex-row" style="width: 100%;">
        <div class="edit-button" @click="editList">
          <img class="edit-button-animation" src="@/assets/icons/edit.png" width="16px" height="16px">
        </div>
        <v-menu offset-y :close-on-content-click="false" :nudge-width="160">
          <template #activator="{ on: onMenu }">
            <v-tooltip top>
              <template #activator="{ on: onTooltip }">
                <div class="sort-button" v-on="{ ...onMenu, ...onTooltip }">
                  <img class="sort-button-animation" src="@/assets/icons/settings.png" width="20px" height="20px">
                </div>
              </template>
              <span>Sort list's cards</span>
            </v-tooltip>
            
          </template>
          <v-card>
            <div class="pa-4" style="width: 240px;">
              <v-select
                v-model="sortType"
                :items="sortTypeItems"
                label="Sort type"
                @change="sortList"
                outlined
                color="#6200EA"
                dense
              ></v-select>
              <v-select
                v-model="sortValue"
                :items="sortValueItems"
                label="Sort value"
                @change="sortList"
                outlined
                color="#6200EA"
                dense
              ></v-select>
            </div>
          </v-card>
        </v-menu>

        <div class="close-button" @click="removeList" style="margin-left: auto; margin-right: 0;">
          <img class="close-button-animation" src="@/assets/icons/close.png" width="20px" height="20px">
        </div>
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
      @createCardSuccess="onCreateCardSuccess"
      @updateCardsBetweenListsError="onUpdateCardsBetweenListsError"
      @updateCardsBetweenListsSuccess="onUpdateCardsBetweenListsSuccess">
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

        data: () => ({
          isSorted: false,
          sortType: '',
          sortValue: '',
          sortTypeItems: [
            {
              text: 'None',
              value: null,
            },
            {
              text: 'Expiry date',
              value: 'expiryDate',
            },
            {
              text: 'Priority',
              value: 'priority',
            },
          ],
          sortValueItems: [
            {
              text: 'None',
              value: null,
            },
            {
              text: 'Asc',
              value: 'asc',
            },
            {
              text: 'Desc',
              value: 'desc',
            },
          ],
        }),
    
        methods: {
          sortList(){
              this.isSorted = true;
              if(!this.sortValue || !this.sortType){
                this.list.cards.sort((a, b) => {
                    let da = new Date(a.position),
                        db = new Date(b.position);
                    return da - db;
                });
                return;
              }
              if(this.sortValue == 'asc'){
                  this.list.cards.sort((a, b) => {
                    let da = new Date(a[`${this.sortType}`]),
                        db = new Date(b[`${this.sortType}`]);
                    return da - db;
                });
              }
              if(this.sortValue == 'desc'){
                this.list.cards.sort((a, b) => {
                    let da = new Date(a[`${this.sortType}`]),
                        db = new Date(b[`${this.sortType}`]);
                    return db - da;
                });
              }
              
              const tail = [];
              for (let i = this.list.cards.length - 1; i >= 0; i--) {
                if(!this.list.cards[i][`${this.sortType}`]){
                  tail.push(this.list.cards[i]);
                  this.list.cards.splice(i, 1);
                }
              }
              this.list.cards = this.list.cards.concat(tail);
            },
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
  background-color: #d1b5f8cb;
  border-radius: 8px;
  padding: 15px;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 10px 10px rgba(0, 0, 0, 0.12);

  .close-button {
    cursor: pointer;
      .close-button-animation {
        transition: transform 0.5s;
      }
      &:hover {
        .close-button-animation {
        transform: rotate(360deg);
      }
    }
  }

  .edit-button {
    cursor: pointer;
    .edit-button-animation {
      transition: transform 0.5s;
    }
    &:hover {
        .edit-button-animation {
        transform: rotate(360deg);
      }
    }
  }

  .sort-button {
    margin-left: 10px;
    cursor: pointer;
    .sort-button-animation {
      transition: transform 0.5s;
    }
    &:hover {
      .sort-button-animation {
        transform: rotate(360deg);
      }
    }
  }

  .title {
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