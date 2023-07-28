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
          {{ userError }}
        </v-col>
        <v-col>
          <v-btn 
          color="#D1B5F8"
          style="margin-left:200px"
          @click="onClickAlertBtn">Ок</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <work-navigation
    @getUsersError="onUserError"></work-navigation>

    <div style="margin-top: 30px; margin-left: 10%; margin-right: 10%;">
        <div class="d-flex flex-row justify-space-around flex-wrap">
          <user-item
            v-bind:key="user._id"
            v-for="user in this.users"
            :user="user"
            @getUserStatsError="onUserError"
            @deleteAdminError="onUserError"
            @deleteUserError="onUserError"
            >
          </user-item>
        </div>
        <user-info-dialog></user-info-dialog>
    </div>

  </div>
</template>

<script>
import WorkNavigation from '@/components/WorkNavigation.vue';
import UserItem from '@/components/user/UserItem.vue';
import UserInfoDialog from '@/components/user/UserInfoDialog.vue';
    export default {
        components:{ WorkNavigation, UserItem, UserInfoDialog },
        data: () => ({
          errorAlert: false,
        }),

        methods:{
          onClickAlertBtn(){
              this.errorAlert = false;
              this.$store.commit('setUserError', null);
          },
          onUserError() {
              this.errorAlert = true;
          },
        },

        computed: {
          isAuth() {
            return this.$store.state.auth.isAuth;
          },
          users() {
            return this.$store.state.admin.users;
          },
          userError() {
            return this.$store.state.admin.userError;
          },
        },

        mounted(){
          if(!this.isAuth && !localStorage.getItem('token')){
              this.$router.push({name: 'authorization'});
          }
          this.$store.dispatch("getAllUsers");
        },

        created() {
          document.title = 'Admin panel';
        },
    }
</script>

<style scoped>
.v-alert {
    position: fixed;
    z-index: 100;
    left: 50%;
    bottom: 80%;
    transform: translate(-50%, -50%);
    margin: 0 auto;
  }
</style> 