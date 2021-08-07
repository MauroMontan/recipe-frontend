<template>
  <v-app style="background-color: #121212" id="inspire">
    <v-navigation-drawer dark v-model="drawer" app>
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

    <v-app-bar dark app>
      <v-app-bar-nav-icon @click="drawer = !drawer"
        ><v-icon dark> mdi-sort-variant </v-icon></v-app-bar-nav-icon
      >
   <v-spacer></v-spacer>
   
      <v-toolbar-title>{{this.$router.currentRoute.name}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <login />
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <addRecipie v-if="loginStatus" />
  </v-app>
</template>

<script>
import login from "../src/components/login.vue";
import addRecipie from "../src/components/addRecipie.vue";
export default {
  components: { login, addRecipie },
  data: () => ({
    drawer: null,
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
::-webkit-scrollbar {
  display: none;
}
</style>
