<template>
  <v-card
    class="mx-auto"
    width="360"
    style="margin-bottom: 30px"
  >
    <v-card-text>
      <p>Created at: {{ getFullDate(new Date(user.createdAt)) }}</p>
      <div class="text-h6 text--primary">
        Email: {{ user.email }}
      </div>
      <div class="text-h6 text--primary">
        Username: {{ user.userName }}
      </div>
      <div class="text-h6 text--primary">
        Name: {{ user.name }}
      </div>
      <div class="text-h6 text--primary">
        Surname: {{ user.surname }}
      </div>
      <div class="text-h6 text--primary">
        Roles: {{ getRolesStr(user.roles) }}
      </div>
      <br>
      <p>Updated at: {{ getFullDate(new Date(user.updatedAt)) }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="#6200EA"
        @click="getUserStats"
      >
        Get user statistics
      </v-btn>
      <v-btn
        text
        color="#6200EA"
        style="margin-left: 40px;"
        @click="deleteUser"
      >
        Delete user
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        name: "user-item",

        props: {
            user: {
                type: Object,
                required: true
            }
        },

        methods: {
            getFullDate(date){
              return `${date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate()}.${(date.getMonth() + 1).toString().length == 1 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}.${date.getFullYear()}  ${date.getHours().toString().length == 1 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes().toString().length == 1 ? '0' + date.getMinutes() : date.getMinutes()}`;
            },
            getRolesStr(rolesArr){
              let rolesStr = rolesArr.join(', ');

              return rolesStr;
            },
            getUserStats(){
                this.$store.dispatch("getUserStatistics", this.user._id)
                    .then((response) => {
                        if(this.userError){
                            this.$emit("getUserStatsError");
                        }
                        else{
                            this.$store.commit("showUserDialog");
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },
            deleteUser(){
              this.$store.dispatch("deleteUser", this.user._id)
                  .then((response) => {
                      if(this.userError){
                          this.$emit("deleteUserError");
                      }
                      else{
                        this.$store.dispatch("getAllUsers");
                      }
                  })
                  .catch((error) => {
                          console.log(error);
                  });
            }
        },

        computed:{
          userError() {
            return this.$store.state.admin.userError;
          },
        },
    }
</script>

<style>

</style>