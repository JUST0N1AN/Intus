const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/about",
    name: "About",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/About.vue") }],
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Map.vue") }],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Register.vue") }],
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Upload.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
