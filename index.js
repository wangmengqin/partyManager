import Vue from "vue";
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 状态管理
import Vuex from 'vuex'
Vue.use(Vuex);

// 全局样式
import "./template/base.css";
//后台组件
import xaddnews from "./components/back/tab/xadd_news_tab.vue";
import xsearchnews from "./components/back/tab/xsearch_news_tab.vue";
import xeditpassword from "./components/back/container/xedit_password.vue";
import tab from "./components/back/container/tab.vue";
//前端组件
import foretab from "./components/fore/container/foretab.vue";
import xindex from "./components/fore/tab/xindex.vue";
import studyKnow from "./components/fore/tab/forestudy_know.vue";
import allActivities from "./components/fore/tab/foreactivities.vue";
import message from "./components/fore/tab/foremessage.vue";
import mine from "./components/fore/tab/foremine.vue";
import organize from "./components/fore/tab/foreorganization.vue";
//登录组件
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
               },
               {
                    path: "editpassword",
                    component: xeditpassword
                }
            ]
       },
       {
			path: "/fore",
            component: foretab,
            children: [
            	{
                    path: "index",
                    component: xindex
	            },
	            {
	              	path:"studyKnow",
	              	component:studyKnow
	            },
	            {
	              	path:"allActivities",
	              	component:allActivities
	            },
	            {
	              	path:"message",
	              	component:message
	            },
	            {
	              	path:"mine",
	              	component:mine
	            },
	            {
	              	path:"organize",
	              	component:organize
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
