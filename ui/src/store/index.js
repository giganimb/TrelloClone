import Vue from 'vue';
import Vuex from 'vuex';

import auth from "@/store/auth-module";
import user from "@/store/user-module";
import workspace from "@/store/workspace-module";
import board from "@/store/board-module";
import list from "@/store/list-module";
import admin from "@/store/admin-module";

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    workspace,
    board,
    list,
    admin,
  }
});

export default async function init() {
  await store.dispatch('init')

  return store
}