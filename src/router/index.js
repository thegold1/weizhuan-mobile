import {
  createWebHistory,
  createRouter,
  createWebHashHistory,
} from "vue-router";
import Layout from "@/layout";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    name: "Login",
    meta: {},
  },
  {
    path: "/user-agreement",
    component: () => import("@/views/login/components/UserAgreement.vue"),
    name: "UserAgreement",
    meta: {},
  },
  {
    path: "/disclaimer-statement",
    component: () => import("@/views/login/components/DisclaimerStatement.vue"),
    name: "DisclaimerStatement",
    meta: {},
  },
  {
    path: "/module",
    component: () => import("@/views/home/module.vue"),
    name: "module",
    meta: { showTabBar: false },
  },
  {
    path: "/content",
    component: () => import("@/views/home/content.vue"),
    name: "content",
    meta: { showTabBar: false },
  },
  {
    path: "/copyright",
    component: () => import("@/views/mine/CopyRight.vue"),
    name: "CopyRight",
    meta: { showTabBar: false },
  },
  {
    path: "/about",
    component: () => import("@/views/mine/about.vue"),
    name: "about",
    meta: { showTabBar: false },
  },
  {
    path: "/PrivacyPolicy",
    component: () => import("@/views/mine/PrivacyPolicy.vue"),
    name: "PrivacyPolicy",
    meta: { showTabBar: false },
  },
  {
    path: "",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "/index",
        component: () => import("@/views/home/index.vue"),
        name: "Index",
        meta: {},
      },
      {
        path: "/document",
        component: () => import("@/views/document/index.vue"),
        name: "Document",
        meta: {},
      },
      {
        path: "/document-info",
        component: () => import("@/views/document/info.vue"),
        name: "Document-Info",
        meta: {
          showTabBar: false,
        },
      },
      {
        path: "/ai-chat",
        component: () => import("@/views/aiChat/index.vue"),
        name: "Ai-Chat",
        meta: {},
      },
      {
        path: "/mine",
        component: () => import("@/views/mine/index.vue"),
        name: "Mine",
        meta: {},
      },
      {
        path: "/billing",
        component: () => import("@/views/billing/index.vue"),
        name: "billing",
        meta: { showTabBar: false },
      },
      {
        path: "/info",
        component: () => import("@/views/mine/info.vue"),
        name: "info",
        meta: { showTabBar: false },
      },
    ],
  },
];

const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
