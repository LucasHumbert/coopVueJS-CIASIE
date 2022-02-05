import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Conversations',
    component: () => import('../views/Conversations')
  },
  {
    path: '/conversation/:id',
    name: 'UneConversation',
    component: () => import('../views/UneConversation')
  },
  {
    path: '/conversation/:id/:idMessage',
    name: 'UneConversationEnContexte',
    component: () => import('../views/UneConversation')
  },
  {
    path: '/creation-compte',
    name: 'CreationCompte',
    component: () => import('../views/CreationCompte')
  },
  {
    path: '/connexion',
    name: 'Connexion',
    component: () => import('../views/Connexion')
  },
  {
    path: '/membres',
    name: 'Membres',
    component: () => import('../views/Membres')
  },
  {
    path: '/membres/:id',
    name: 'FicheMembre',
    component: () => import('../views/FicheMembre')
  },
  {
    path: '/nouvelle-conv',
    name: 'NouvelleConversation',
    component: () => import('../views/NouvelleConversation')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
