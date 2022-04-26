import {createRouter, createWebHistory} from 'vue-router'
import Home from '../pages'
import Todos from '../pages/todos'
import Todo from '../pages/todos/_id'
import TodoCreate from '../pages/todos/create'

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/create',
            name: 'TodoCreate',
            component: TodoCreate
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        },
    ]
});

// 1 / home 2 / todos 3 / todos/create 4 / todos/:id

export default router