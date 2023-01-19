<template>
    <div>
        <div v-if="!this.user">
            <h1 style="text-align:center">Loading...</h1>
        </div>
        <div v-else>
            <v-app-bar
            color="#6200EA"
            dense
            outlined
            dark
            >

                <v-toolbar-title>
                    <router-link to="/workspaces" class="router-link">
                        <div style="color:white">
                            Brello
                        </div>
                    </router-link>
                </v-toolbar-title>
                
                <!-- <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            dark
                            color="#6200EA"
                            depressed
                            class="ml-5"
                            v-bind="attrs"
                            v-on="on"
                            >
                            Work spaces
                        </v-btn>
                    </template>
                    <div></div>
                    <v-list min-width="200px">
                        <div class="work-spaces-text">Work spaces</div>
                        <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            >
                            <v-list-item-title>
                                <div>
                                    <v-divider class="my-3"></v-divider>
                                </div>
                                <div class="work-spaces-text">{{ item.title }}</div>
                            </v-list-item-title>
                            
                        </v-list-item>
                    </v-list>
                </v-menu> -->

                <v-btn
                v-if="userRoles.includes('admin')"
                dark
                color="#6200EA"
                depressed
                @click="onAdminPanelBtnClick"
                class="ml-4">
                        Admin Panel
                </v-btn>

                <v-spacer></v-spacer>
                
                <div>
                    <v-menu
                        bottom
                        min-width="200px"
                        rounded
                        offset-y
                    >
                        <template v-slot:activator="{ on }">
                        <v-btn
                            icon
                            small
                            v-on="on"
                            color="#6200EA"
                        >
                            <v-avatar
                            color="#0d001f"
                            size="40"
                            >
                            <span class="white--text text-h6">{{ userInfo.initials }}</span>
                            </v-avatar>
                        </v-btn>
                        </template>
                        <v-card>
                            <v-list-item-content class="justify-center">
                                <div class="mx-auto text-center">
                                    <v-avatar
                                        color="#0d001f"
                                    >
                                        <span class="white--text text-h5">{{ userInfo.initials }}</span>
                                    </v-avatar>
                                    <h3 style="color: #0d001f; margin: 10px">{{ userInfo.fullName }}</h3>
                                    <p class="text-caption mt-1" style="color: #0d001f;">
                                        {{ userInfo.email }}
                                    </p>

                                    <v-divider class="my-3"></v-divider>
                                    
                                    <router-link to="/profile" class="router-link">
                                        <v-btn
                                            depressed
                                            text
                                            style="color: #0d001f;"
                                        >
                                            Edit Account
                                        </v-btn>
                                    </router-link>

                                    <v-divider class="my-3"></v-divider>

                                    <v-btn
                                        depressed
                                        text
                                        style="color: #0d001f;"
                                        @click="logout"
                                    >
                                        Exit
                                    </v-btn>
                                </div>
                            </v-list-item-content>
                        </v-card>
                    </v-menu>
                </div>
            </v-app-bar>
        </div>
    </div>
</template>

<script>
    export default {
        name: "work-navigation",

        data: () => ({
            // items: [
            //     { title: 'Click Me' },
            //     { title: 'Click Me' },
            //     { title: 'Click Me' },
            //     { title: 'Click Me 2' },
            // ],
        }),

        methods: {
            logout(){
                this.$store.dispatch('logout');
                localStorage.removeItem('userId');
                this.$router.push({name: 'start'});
            },
            getInitials(name, surname){
                return name.charAt(0).toUpperCase() + surname.charAt(0).toUpperCase();
            },
            getFullName(name, surname){
                return name + ' ' + surname;
            },
            onAdminPanelBtnClick(){
                this.$store.dispatch("getAllUsers")
                    .then((response) => {
                        if(this.userError){
                            this.$emit("getUsersError");
                        }
                        else{
                            this.$router.push({name: 'admin_panel'});
                        }
                    })
                    .catch((error) => {
                            console.log(error);
                    });
            },
        },

        computed: {
            userRoles() {
                return this.$store.state.auth.userData.user.roles;
            },
            user() {
                return this.$store.state.user.user;
            },
            authId() {
                return this.$store.state.auth.userData.user.id;
            },
            userInfo(){
                return {
                    email: this.user.email,
                    initials: this.getInitials(this.user.name, this.user.surname),
                    fullName: this.getFullName(this.user.name, this.user.surname),
                }
            },
            userError() {
                return this.$store.state.user.userError;
            },
        },

        mounted(){
            this.$store.dispatch('getUser', localStorage.getItem('userId') ?? this.authId);
        },

        // created() {
        //     this.$store.dispatch('getUser', this.authId);
        // },
    }
</script>

<style>
.v-btn:hover{
    color: #6200EA;
    background-color: white!important;
}
.router-link{
    text-decoration: none;
}
.work-spaces-text{
    text-align: center;
    color: #0d001f;
}
</style>