import NProgress from "nprogress";
import "nprogress/nprogress.css";
import router from "./router";
import useUserStore from '@/store/modules/user'
import cache from "@/plugins/cache.js";
NProgress.configure({
  showSpinner: false
});

const whiteList = [
  "/login"
];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (useUserStore().userInfo.uid) {
    if (to.path === '/login') {
      next();
      NProgress.done();
    }
    next();
  } else {
    const sycs = cache.session.getJSON('sycs');
    console.log({ sycs })
    if (sycs) {
      console.log('放行')
      next();
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        // 在免登录白名单，直接进入
        next();
      }
    }

    next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done();
});
