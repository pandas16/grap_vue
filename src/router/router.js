import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/HelloWorld'
import Index from '../pages/index'
import UserCenter from '../pages/userCenter'
import UserInfo from '../pages/userInfo'
// import Demo from '../pages/demo'
import Grap from '../pages/grap'

Vue.use(Router)

export default new Router({
    // base: '/grap_vue',
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: Hello
        },
        {
            path: '/index',
            name: 'index',
            component: Index
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            component: UserCenter,
            children: [
                {
                    path: 'userInfo',
                    name: 'userInfo',
                    component: UserInfo
                }
            ]
        },
        // {
        //     path: '/demo',
        //     name: 'demo',
        //     component: Demo
        // },
        {
            path: '/grap',
            name: '爪爪',
            component: Grap
        },
    ]
})