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

    <div v-if="loading && !this.isAuth">
      <h1 style="text-align:center">Loading...</h1>
    </div>
    <div v-else>
      <div>
        <img src="@/assets/images/logo.png" class="logo" @click="onLogoClick">
      </div>
      
      <v-card
      width="600"
      elevation="5"
      class="auth-form rounded-lg">

      <p class="form-label">
        Authorization
      </p>

        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >

          <v-text-field
              v-model="email"
              :rules="emailRules"
              label="E-mail"
              required
              :counter="50"
              color="#6200EA"
          ></v-text-field>

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.minMax]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            color="#6200EA"
            :counter = "15"
            @click:append="showPassword = !showPassword"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="#6200EA"
            class="sign-in-btn"
            @click="login"
            block
          >
            Log in
          </v-btn>

          <p class="footer-form-text">
            Or
          </p>

          <router-link to="/registration" class="router-link">
            <p class="footer-form-link">
              Sign up
            </p>
          </router-link>

        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
    export default {
      data: () => ({
        valid: true,
        loading: false,
        errorMessage: '',
        errorAlert: false,

        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          v => (v && v.length <= 50) || 'E-mail must be less than 50 characters',
        ],
        
        password: "",
        showPassword: false,
        passwordRules: {
            required: value => !!value || 'Password is required',
            minMax: v => v.length >= 8 && v.length <= 15 || 'Password must be from 8 to 15 characters',
          },
      }),

      methods: {
        login() {
          this.loading = true;
          this.$refs.form.validate();
          this.$store.dispatch('login', { email: this.email, password: this.password })
              .then((response) => {
                if(this.loginError){
                  this.loading = false;
                  this.errorMessage = this.loginError;
                  this.errorAlert = true;
                  this.$store.commit('setLoginError', null);
                }
                else{
                  this.$router.push({name: 'workspaces'});
                }
              })
              .catch((error) => {
                console.log(error);
              });
        },
        onLogoClick(){
          this.$router.push({name: 'start'});
        },
        reset () {
          this.$refs.form.reset()
        },
        resetValidation () {
          this.$refs.form.resetValidation()
        },
      },

      computed: {
        loginError() {
          return this.$store.state.auth.loginError;
        },
        isAuth() {
          return this.$store.state.auth.isAuth;
        },
        authId() {
          return this.$store.state.auth.userData.user.id;
        },
      },
      
      mounted(){
        if (localStorage.getItem('token')) {
          this.$router.push({name: 'workspaces'});
        }
      },

      created() {
        document.title = 'Authorization';
      },
    }
</script>

<style scoped>
.auth-form{
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px 50px 10px 50px;
}
.form-label{
  align-content: center;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  color: #0d001f;
}
.router-link{
  text-decoration: none;
}
.footer-form-text{
  align-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #0d001f;
  margin-top: 20px;
  margin-bottom: 20px;
}
.footer-form-link{
  align-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #6200EA;
  margin-top: 20px;
  margin-bottom: 20px;
}
.footer-form-link:hover{
  color: #d1b5f8;
}
.sign-in-btn{
  margin-top: 20px;
  margin-bottom: 20px;
  color: white!important;
}
.sign-in-btn:hover{
    background-color: #d1b5f8!important;
}
.v-alert {
  position: fixed;
  z-index: 100;
  left: 50%;
  bottom: 80%;
  transform: translate(-50%, -50%);
  margin: 0 auto;
}
.logo{
  width: 150px; 
  height: 200px; 
  margin-left: auto;
  margin-right: auto; 
  display: block; 
  margin-bottom: 30px;
  cursor: pointer;
}
</style>