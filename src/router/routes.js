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
    path: "/busoptions",
    name: "BusinessOptions",
    component: () => import("layouts/BusinessLayout.vue"),
    children: [
      { path: "", component: () => import("pages/BusinessOptions.vue") },
    ],
  },
  {
    path: "/map",
    name: "Map",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Map.vue") }],
  },
  {
    path: "/regbusiness",
    name: "RegisterBusiness",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/RegisterBusiness.vue") },
    ],
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
  {
    path: "/mydocs",
    name: "MyDocs",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/MyDocs.vue") }],
  },
  {
    path: "/verbusiness",
    name: "VerifyBusiness",
    component: () => import("layouts/BusinessLayout.vue"),
    children: [
      { path: "", component: () => import("pages/VerifyBusiness.vue") },
    ],
  },
  {
    path: "/IndexBusiness",
    name: "IndexBusiness",
    component: () => import("layouts/BusinessLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexBusiness.vue") },
    ],
  },
  {
    path: "/qrcode",
    name: "QRCode",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/QRCode.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
