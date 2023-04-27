import Base from "@/components/Layout/Base.vue";
import store from "@/store";

const routes = [
  {
    path: "",
    component: Base,
    children: [
      {
        path: "/get-started",
        name: "GetStarted",
        component: () => import("@/views/GetStarted/GetStarted.vue"),
        beforeEnter: (to, from, next) => {
          if (store.getters.userInfo == null) {
            next();
          } else {
            next("/dashboard");
          }
        },
      },
      {
        path: "*",
        component: () => import("@/views/PageNotFound.vue"),
      },
    ],
  },
];

export default routes;
