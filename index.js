import Vue from "vue";
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 状态管理
import Vuex from 'vuex'
Vue.use(Vuex)
// 全局样式
import "./template/base.css";

import xaddnews from "./components/back/tab/xadd_news_tab.vue";
import xsearchnews from "./components/back/tab/xsearch_news_tab.vue";
import tab from "./components/back/container/tab.vue";
import login from "./components/login.vue";

// 配置路由
var router = new VueRouter({
	routes: [
		 // 默认进入页面的时候跳转到
		{
			path: '/',
			redirect: '/login'
		},
		//登录页面
		{
			path: "/login",
            component: login
       },
       {
            path: "/tab",
            component: tab,
            children: [
            	{
                    path: "addnews",
                    component: xaddnews
               },
               {
                    path: "searchnews",
                    component: xsearchnews
                }
            ]
        }
    ]
});

// 配置store
var store = new Vuex.Store({
    state:{
        count:0,
        bool:true,
       
    }
})

new Vue({
	el: "#app",
	router,
	store,
	template: `
        <div>
            <router-view></router-view> 
        </div>
    `
})
