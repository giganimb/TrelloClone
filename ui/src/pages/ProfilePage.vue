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

    <v-card style="margin-left: auto; margin-right: auto;" width="700" elevation="24">
      <div class="page-title">
        <h1>Profile</h1>
      </div>
      <div>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <div class="d-flex flex-row justify-space-around">
            <div style="width: 200px;">
              <v-avatar size="128" style="margin-left: auto; margin-right: auto; display: block; margin-bottom: 34px;">
                <img
                  :src='`http://localhost:3000/images/${this.user?.imgPath?.split("\\")[1]}`'
                >
              </v-avatar>
              <v-file-input
                v-model="image"
                :rules="avatarRules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Pick an avatar"
                prepend-icon="mdi-camera"
                label="Avatar"
                color="#6200EA"
                dense
                truncate-length="14"
              ></v-file-input>
            </div>
            <div style="width: 380px;">
              <v-text-field
                class="mb-4"
                v-model="userName"
                :counter="20"
                :rules="userNameRules"
                label="Username"
                required
                color="#6200EA"
              ></v-text-field>

              <v-text-field
                class="mb-4"
                v-model="name"
                :counter="20"
                :rules="nameRules"
                label="Name"
                required
                color="#6200EA"
              ></v-text-field>

              <v-text-field
                class="mb-4"
                v-model="surname"
                :counter="20"
                :rules="surnameRules"
                label="Surname"
                required
                color="#6200EA"
              ></v-text-field>

              <div class="d-flex flex-row" style="width: 160px">
                <v-btn
                color="#6200EA"
                class="ml-2 btn"
                @click="getUser"
                block
                >
                  Reset
                </v-btn>
                
                <v-btn
                :disabled="!valid"
                color="#6200EA"
                class="ml-10 btn"
                @click="save"
                block
                >
                  Save changes
                </v-btn>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </v-card>
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
          image: null,

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

          avatarRules: [
            value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!',
          ],
        }),
        
        methods: {
          save(){
            this.$refs.form.validate();
            console.log(this.image);
            this.$store.dispatch('updateUser', { id: this.user._id, userName: this.userName, name: this.name, surname: this.surname, image: this.image })
            .then((response) => {
              if(this.userError){
                this.errorMessage = this.userError;
                this.errorAlert = true;
                this.$store.commit('setUserError', null);
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
          if(!this.isAuth && !localStorage.getItem('token')){
              this.$router.push({name: 'authorization'});
          }
          this.$store.dispatch('getUser', localStorage.getItem('userId') ?? this.user)
            .then(() => {
              this.getUser();
            });
        },

        created() {
          document.title = 'Profile';
        },
    }
</script>

<style scoped>
.btn{
  margin-top: 20px;
  margin-bottom: 20px;
  color: white!important;
}
.btn:hover{
    background-color: #d1b5f8!important;
}
.page-title{
  color: #0d001f;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
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