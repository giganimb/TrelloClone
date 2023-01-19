<template>
  <div>
      <v-app-bar
        color="#6200EA"
        dense
        outlined
        dark
      >

        <v-toolbar-title>
            <router-link to="/" class="router-link">
                <div style="color:white">
                    Brello
                </div>
            </router-link>
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
  
        <router-link to="/authorization" class="router-link">
            <v-btn
                dark
                color="#6200EA"
                depressed
                >
                Sign in
            </v-btn>
        </router-link>
        
        <router-link to="/registration" class="router-link">
            <v-btn
                dark
                color="#6200EA"
                depressed
                >
                Sign up
            </v-btn>
        </router-link>
        
      </v-app-bar>
    </div>
</template>

<script>

    export default {
        name: "start-navigation",

        components:{
        },

        methods: {
            
        }
    }
</script>

<style scoped>
.v-btn:hover{
    color: #6200EA;
    background-color: white!important;
}
.router-link{
    text-decoration: none;
}
</style>