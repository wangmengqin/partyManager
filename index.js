import Vue from "vue";
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
// 状态管理
import Vuex from 'vuex'
Vue.use(Vuex);

// 全局样式
import "./template/base.css";
// 后台组件
// 新闻组件
import xaddnews from "./components/back/tab/news/xadd_news_tab.vue";
import xsearchnews from "./components/back/tab/news/xsearch_news_tab.vue";
import xeditnews from "./components/back/tab/news/edit_news_tab.vue";
// 新闻专题组件
import xaddColumn from "./components/back/tab/xadd_column_tab.vue";
import xsearchColumn from "./components/back/tab/xsearch_column_tab.vue";
import xeditColumn from "./components/back/tab/edit_column_tab.vue";
// 用户修改密码组件
import xeditpassword from "./components/back/container/xedit_password.vue";
// tab切换组件
import tab from "./components/back/container/tab.vue";
// 活动组件
import xaddActivity from "./components/back/tab/activities/add_activity_tab.vue";
import xsearchActivity from "./components/back/tab/activities/search_activity_tab.vue";
import xeditActivity from "./components/back/tab/activities/edit_activity_tab.vue";
// 党员参加活动
import xcheckActivity from "./components/back/tab/activities/check_member_tab.vue";
import xsearchActivityMember from "./components/back/tab/activities/member_list_tab.vue";
// 支部组件
import xaddBranch from "./components/back/tab/branch/add_branch_tab.vue";
import xsearchBranch from "./components/back/tab/branch/search_branch_tab.vue";
import xeditBranch from "./components/back/tab/branch/edit_branch_tab.vue";
// 党员组件
import xsearchMember from "./components/back/tab/member/search_member_tab.vue";
import xcheckMember from "./components/back/tab/member/check_member_tab.vue";
import xeditMember from "./components/back/tab/member/edit_member_tab.vue";
// 留言组件
import xsearchMessage from "./components/back/tab/message/search_message_tab.vue";
import xcheckMessage from "./components/back/tab/message/check_message_tab.vue";
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
              path: "editnews/:id",
              component: xeditnews
            },
            {
              path: "addColumn",
              component: xaddColumn
            },
            {
              path: "searchColumn",
              component: xsearchColumn
            },
            {
              path: "editColumn/:id",
              component: xeditColumn
            },
            {
              path: "addActivity",
              component: xaddActivity
            },
            {
              path: "searchActivity",
              component: xsearchActivity
            },
            {
              path: "editActivity/:id",
              component: xeditActivity
            },
            {
              path: "checkActivityMember",
              component: xcheckActivity
            },
            {
              path: "activityMoney",
              component: xsearchActivityMember
            },
            {
              path: "addBranch",
              component: xaddBranch
            },
            {
              path: "searchBranch",
              component: xsearchBranch
            },
            {
              path: "editBranch/:id",
              component: xeditBranch
            },
            {
              path: "searchMember",
              component: xsearchMember
            },
            {
              path: "checkMember",
              component: xcheckMember
            },
            {
              path: "editMember/:id",
              component: xeditMember
            },
            {
              path: "searchMessage",
              component: xsearchMessage
            },
            {
              path: "checkMessage",
              component: xcheckMessage
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
