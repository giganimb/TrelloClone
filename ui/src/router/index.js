import Vue from 'vue';
import VueRouter from "vue-router";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: () => import('../pages/StartPage.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../pages/RegistrationPage.vue')
  },
  {
    path: '/authorization',
    name: 'authorization',
    component: () => import('../pages/AuthorizationPage.vue')
  },
  {
    path: '/workspaces/',
    name: 'workspaces',
    component: () => import('../pages/WorkspacesPage.vue')
  },
  {
    path: '/:id/boards',
    name: 'boards',
    component: () => import('../pages/BoardsPage.vue')
  },
  {
    path: '/:workspaceId/:id/lists',
    name: 'lists',
    component: () => import('../pages/ListsPage.vue')
  },
  {
    path: '/admin_panel',
    name: 'admin_panel',
    component: () => import('../pages/AdminPanelPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../pages/ProfilePage.vue')
  },
]

export default new VueRouter({
  routes
})
