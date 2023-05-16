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

    <div v-if="loading">
      <h1 style="text-align:center">Loading...</h1>
    </div>
    <div v-else>
      <div>
        <img src="@/assets/images/logo.png" class="logo" @click="onLogoClick">
      </div>
      
      <v-card
      width="600"
      elevation="5"
      class="reg-form rounded-lg">

      <p class="form-label">
        Registration
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
              :counter = "50"
              color="#6200EA"
          ></v-text-field>

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

          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.minMax]"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            :counter = "15"
            @click:append="showPassword = !showPassword"
            color="#6200EA"
          ></v-text-field>

          <v-text-field
            v-model="passwordConfirmation"
            :append-icon="showPasswordConfirmation ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passwordRules.required, passwordRules.minMax, (this.passwordConfirmation === this.password) || 'Passwords must match']"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            label="Password confirmation"
            :counter = "15"
            @click:append="showPasswordConfirmation = !showPasswordConfirmation"
            color="#6200EA"
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="#6200EA"
            class="sign-in-btn"
            @click="signup"
            block
          >
            Sign up
          </v-btn>

          <p class="footer-form-text">
            Or
          </p>

          <router-link to="/authorization" class="router-link">
            <p class="footer-form-link">
              Log in
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
        
        userName: '',
        userNameRules: [
          v => !!v || 'Username is required',
          v => (v && v.length > 2 && v.length <= 20) || 'Username must be more than 2 and less than 20 characters',
        ],

        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length > 2 && v.length <= 20) || 'Name must be more than 2 and less than 20 characters',
        ],

        surname: '',
        surnameRules: [
          v => !!v || 'Surname is required',
          v => (v && v.length > 2 && v.length <= 20) || 'Surname must be more than 2 and less than 20 characters',
        ],
        
        password: "",
        passwordConfirmation: "",
        showPassword: false,
        showPasswordConfirmation: false,
        passwordRules: {
            required: value => !!value || 'Password is required',
            minMax: v => v.length >= 8 && v.length <= 15 || 'Password must be more than 8 and less than 15 characters',
          },
      }),

      methods: {
        signup() {
          this.loading = true;
          this.$refs.form.validate();
          this.$store.dispatch('signup', { email: this.email, userName: this.userName, name: this.name,
                                           surname: this.surname, password: this.password })
            .then((response) => {
              if(this.signupError){
                this.loading = false;
                this.errorMessage = this.signupError;
                this.errorAlert = true;
                this.$store.commit('setSignupError', null);
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
        signupError() {
          return this.$store.state.auth.signupError;
        },
      }
    }
</script>

<style scoped>
.reg-form{
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