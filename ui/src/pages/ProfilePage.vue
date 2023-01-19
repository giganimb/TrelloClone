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
          {{ errorMessage }}
        </v-col>
        <v-col>
          <v-btn 
          color="#D1B5F8"
          style="margin-left:200px"
          @click="errorAlert = false">Ок</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <v-alert
      prominent
      type="success"
      v-model="successAlert"
      color="#823DE1"
    >
      <v-row align="center">
        <v-col class="grow">
          Сhanges saved successfully
        </v-col>
        <v-col class="grow">
          <v-btn 
          color="#D1B5F8"
          style="margin-left:200px"
          @click="successAlert = false">OK</v-btn>
        </v-col>
      </v-row>
    </v-alert>

    <work-navigation></work-navigation>
    <div class="page-title">
      <h1>Profile</h1>
    </div>
    
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="form"
    >
      <v-text-field
          v-model="userName"
          :counter="20"
          :rules="userNameRules"
          label="Username"
          required
          color="#6200EA"
      ></v-text-field>

      <v-text-field
        v-model="name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
        color="#6200EA"
      ></v-text-field>

      <v-text-field
        v-model="surname"
        :counter="20"
        :rules="surnameRules"
        label="Surname"
        required
        color="#6200EA"
      ></v-text-field>

      <v-row>
        <v-col>
          <v-btn
            color="#6200EA"
            class="save-btn"
            @click="getUser"
            block
          >
            Reset
          </v-btn>
        </v-col>
        
        <v-col>
          <v-btn
          :disabled="!valid"
          color="#6200EA"
          class="save-btn"
          @click="save"
          block
        >
          Save changes
        </v-btn>
        </v-col>
      </v-row>

    </v-form>
  </div>
</template>

<script>
import WorkNavigation from '@/components/WorkNavigation.vue';
    export default {
        components:{ WorkNavigation },
        data: () => ({
          valid: true,
          errorMessage: '',
          errorAlert: false,
          successAlert: false,

          userName: '',
          userNameRules: [
            v => (v && v.length > 2 && v.length <= 20) || 'Username must be more than 2 and less than 20 characters',
          ],

          name: '',
          nameRules: [
            v => (v && v.length > 2 && v.length <= 20) || 'Name must be more than 2 and less than 20 characters',
          ],

          surname: '',
          surnameRules: [
            v => (v && v.length > 2 && v.length <= 20) || 'Surname must be more than 2 and less than 20 characters',
          ],
        }),
        
        methods: {
          save(){
            this.$refs.form.validate();
            this.$store.dispatch('updateUser', { id: this.user._id, userName: this.userName, name: this.name, surname: this.surname })
            .then((response) => {
              if(this.userError){
                this.errorMessage = this.userError;
                this.errorAlert = true;
                this.$store.commit('userError', null);
              }
              else{
                this.successAlert = true;
              }
            })
            .catch((error) => {
              console.log(error);
            });
          },
          getUser(){
            this.userName = this.user.userName;
            this.name = this.user.name;
            this.surname = this.user.surname;
          },
        },

        computed: {
          isAuth() {
            return this.$store.state.auth.isAuth;
          },
          user() {
            return this.$store.state.user.user;
          },
          userError() {
            return this.$store.state.user.userError;
          },
        },
        
        mounted(){
          if(!localStorage.getItem('token')){
              this.$router.push({name: 'authorization'});
          }
          this.$store.dispatch('getUser', localStorage.getItem('userId') ?? this.user)
            .then(() => {
              this.getUser();
            });
        },

        // created(){
        //   if(!localStorage.getItem('token')){
        //       this.$router.push({name: 'authorization'});
        //   }
        //   this.getUser();
        // },
    }
</script>

<style>
.save-btn{
  margin-top: 20px;
  margin-bottom: 20px;
  color: white!important;
}
.save-btn:hover{
    background-color: #d1b5f8!important;
}
.form{
  margin: 20px 500px 40px 500px;
}
.page-title{
  color: #0d001f;
  text-align: center;
  margin-top: 20px;
}
.v-alert {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
</style>