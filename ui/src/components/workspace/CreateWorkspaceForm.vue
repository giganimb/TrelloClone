<template>
  <v-container style="margin: 0px 20px">
    <v-row style="width: 500px; margin: auto">
        <v-text-field 
            v-model="name"
            :rules="nameRules"
            label="Name"
            :counter="14"
            color="#6200EA"
            >
        </v-text-field>

        <v-btn 
        color="#6200EA"
        class="add-in-btn"
        @click="createWorkspace"
        >Create</v-btn>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "create-workspace-form",

        data: () => ({
            name: "",
            nameRules: [
                v => (v && v.length >= 2 && v.length <= 14) || 'Name must be more than 2 and less than 14 characters',
            ],
        }),

        methods: {
            createWorkspace() {
                this.$store.dispatch('createWorkspace', { name: this.name, userId: this.authId })
                    .then((response) => {
                    if(this.workspaceError){
                        this.$emit("createWorkspaceError");
                        
                    }
                    else{
                        this.$emit("createWorkspaceSuccess");
                    }
                })
                    .catch((error) => {
                    console.log(error);
                });
            },
        },

        computed:{
            authId() {
                return this.$store.state.auth.userData.user.id;
            },
            workspaceError() {
                return this.$store.state.workspace.workspaceError;
            },
        },
    }
</script>

<style>
.add-in-btn{
  margin-top: 20px;
  margin-left: 20px;
  color: white!important;
}
.add-in-btn:hover{
    background-color: #d1b5f8!important;
}
</style>