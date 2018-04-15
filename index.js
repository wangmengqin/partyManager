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
import xaddColumn from "./components/back/tab/xadd_column_tab.vue";
import xsearchColumn from "./components/back/tab/xsearch_column_tab.vue";
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
import life from "./components/fore/tab/democratic_life.vue";
import excellence from "./components/fore/tab/fore_excellence.vue";
import apply from "./components/fore/tab/fore_apply.vue";
import partyFree from "./components/fore/tab/fore_partyFree.vue";
import activeFree from "./components/fore/tab/fore_activeFree.vue";
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
                path: "addColumn",
                component: xaddColumn
              },
              {
                path: "searColumn",
                component: xsearchColumn
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
            },
            {
                path:"life",
                component:life
            },
            {
              path:"excellence",
              component:excellence
            },
            {
              path:"apply",
              component:apply
            },
            {
              path:"partyFree",
              component:partyFree
            },
            {
              path:"activeFree",
              component:activeFree
            }
          ]
       }
    ]
});

import mutations from './mutation.js'
// 配置store
var store = new Vuex.Store({
    state:{
        offset: 0
    }
})

new Vue({
	el: "#app",
	router,
	store,
  mutations,
	template: `
        <div>
            <router-view></router-view> 
        </div>
    `
})
