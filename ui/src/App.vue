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
      
    },
    mounted(){
      if(localStorage.getItem("token")) {
        this.$store.dispatch("checkAuth");
      }
    },
    // created(){
    //   if(localStorage.getItem("token")) {
    //     this.$store.dispatch("checkAuth");
    //   }
    // }
  };
</script>
