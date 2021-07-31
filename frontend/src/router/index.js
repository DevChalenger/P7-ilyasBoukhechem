import { createRouter, createWebHashHistory } from "vue-router";

import allUserColumns from "../views/allUserColumns.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Profile from "../views/Profile.vue";
import OnePost from "../views/onePost.vue";

const routes = [
  {
    path: "/allUsers",
    name: "allUserColumns",
    component: allUserColumns,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/post/:id",
    name: "Post",
    component: OnePost,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/user/:id",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
