import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import ListeRestaurants from "./components/ListeRestaurants";
import RestaurantDetail from "./components/RestaurantDetail";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      component: ListeRestaurants,
      
    },
    {
      path: "/RestaurantDetail/:id",
      component: RestaurantDetail,
      
    },
  ],
  mode: "history",
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
