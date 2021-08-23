<template>
  <v-app
    style="
      background-color: #121212;
      background-image: url('https://www.transparenttextures.com/patterns/food.png');
    "
    id="inspire"
  >
    <v-navigation-drawer
      style="
        background-color: #272727;
        border: none;

      "
      dark
      v-model="drawer"
      app
      
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">easy Recipe</v-list-item-title>
          <v-list-item-subtitle> </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider dark></v-divider>

      <v-list dark dense nav>
        <v-list-item v-for="item in items" :to="item.to" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar flat dense dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"
        ><v-icon dark> mdi-sort-variant </v-icon></v-app-bar-nav-icon
      >
      <v-spacer></v-spacer>

      <v-toolbar-title>{{ this.$router.currentRoute.name }}</v-toolbar-title>
      <v-spacer></v-spacer>

      <login />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer fixed app dark padless dense>
      <v-col class="text-center" cols="12">
        2021— <strong>Mauro Montaño</strong>
      </v-col>
    </v-footer>
    <addRecipie v-if="loginStatus" />
  </v-app>
</template>

<script>
import login from "../src/components/login.vue";
import addRecipie from "../src/components/addRecipie.vue";
export default {
  components: { login, addRecipie },
  data: () => ({
    drawer: false,
    items: [
      { title: "Home", icon: "mdi-home", to: "/" },
      { title: "My Recipies", icon: "mdi-food", to: "/recipies" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
    right: null,
  }),

  computed: {
    loginStatus() {
      console.log(this.$store.state.isLogin);
      return this.$store.state.isLogin;
    },
  },
  mounted() {
    const token = localStorage.getItem("user-token");

    if (token) {
      this.$store.commit("setLoginStatus", true);
      console.log(this.$store.state.currentToken);
    } else {
      this.$store.commit("setLoginStatus", false);
    }
  },
};
</script>

<style>
/* This is mostly intended for prototyping; please download the pattern and re-host for production environments. Thank you! */
::-webkit-scrollbar {
  display: none;
}
</style>
