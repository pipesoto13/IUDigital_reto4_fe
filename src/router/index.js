import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import CreateSubject from '@/components/CreateSubject'
import EditSubject from '@/components/EditSubject'
import ShowSubject from '@/components/ShowSubject'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/add-subject',
      name: 'add-subject',
      component: CreateSubject
    },
    {
      path: '/edit-subject',
      name: 'edit-subject',
      component: EditSubject
    },
    {
      path: '/show-subject',
      name: 'show-subject',
      component: ShowSubject
    }
  ]
})
