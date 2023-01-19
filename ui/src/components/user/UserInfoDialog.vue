<template>
  <v-dialog
          v-model="userDialogVisible"
          width="360"
          @click:outside="onClickOutside"
        >
          <v-card class="mx-auto">
              <v-card-text>
                <br>
                <div class="text-h6 text--primary">Count of workspaces: {{ userStats.workspacesCounter }}</div>
                <div class="text-h6 text--primary">Count of boards: {{ userStats.boardsCounter }}</div>
                <div class="text-h6 text--primary">Count of lists: {{ userStats.listsCounter }}</div>
                <div class="text-h6 text--primary">Count of cards: {{ userStats.cardsCounter }}</div>
              </v-card-text>
          </v-card>
      </v-dialog>
</template>

<script>
    export default {
        name: "user-info-dialog",

        methods: {
            onClickOutside(){
                this.$store.commit('hideUserDialog');
            },
        },

        computed: {
            userDialogVisible() {
              return this.$store.state.admin.userDialogVisible;
            },
            userStats(){
                return this.$store.state.admin.userStats;
            },
        }
    }
</script>

<style>

</style>