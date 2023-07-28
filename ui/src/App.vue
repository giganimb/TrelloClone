<template>
  <v-app>
    <!-- <h1>{{isAuth}}</h1> -->
    <!-- <h1>{{ isAuth ? `Auth: ${userEmail}` : "Not Auth"}}</h1> -->
      <router-view></router-view>
  </v-app>
</template>

<script>
  export default {
    name: 'App',

    data: () => ({
    }),

    computed: {
      isAuth() {
        return this.$store.state.auth.isAuth;
      },
      userEmail() {
        return this.$store.state.auth.userData.user.email;
      },
      authId() {
        return this.$store.state.auth.userData.user.id;
      },
    },
    created(){
      if(localStorage.getItem("token")) {
        this.$store.dispatch("checkAuth")
          .then(res => {
            if(!this.isAuth){
              this.$router.push({name: 'authorization'});
            }
            else {
              this.$store.dispatch('getUser', localStorage.getItem('userId') ?? this.authId);
            }
          })
          .catch(er => {
            console.log(er)
          })
      }
    },
  };
</script>
