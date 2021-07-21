<template>
  <v-dialog
    icon="mdi-account"
    dark
    app
    v-model="dialog"
    width="530"
    style="border-radius: 25px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-if="loginStatus === false"
        dark
        height="35"
        rounded
        outlined
        v-bind="attrs"
        v-on="on"
        >log in</v-btn
      >
      <v-btn @click="logOut" v-else dark height="35" width="80" rounded outlined
        >log out
      </v-btn>
    </template>

    <v-card class="pa-4" rounded="25" style="border-radius: 25px" dark>
      <v-layout column align-center>
        <h2 class="mb-6">LOG<v-icon dark> mdi-carrot </v-icon>N</h2>
      </v-layout>
      <v-text-field
        prepend-icon="mdi-email"
        label="email"
        filled
        v-model="email"
        dense
        dark
        rounded
        placeholder="type your email"
        style="border-radius: 25px"
        clearable
        light
        class="mb-3"
      />
      <v-text-field
        prepend-icon="mdi-lock"
        label="type your password"
        filled
        v-model="password"
        dark
        type="password"
        dense
        rounded
        placeholder="type your password"
        style="border-radius: 25px"
        clearable
        light
      />
      <v-layout class="mb-4" column align-center>
        <v-btn
          to="/register"
          @click="toRegister"
          outlined
          width="130"
          height="35"
          rounded
          fab
          text
          >register
          <v-icon right dark> mdi-account </v-icon>
        </v-btn>
        <h4  class="red--text" v-if="validCredentials===false">
          cannot validate your credentials
        </h4>
      </v-layout>
      <v-card-actions>
        <v-layout column align-center>
          <v-btn
            :loading="succes"
            @click="login"
            large
            outlined
            :color="buttonColor"
            style="display: flex"
            rounded
            dark
          >
            Login
            <v-icon right dark> mdi-login </v-icon>
          </v-btn>
        </v-layout>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data: () => ({
    validCredentials: true,
    buttonColor: "#50fa7b",
    succes: false,
    loginUrl: "https://mauroapi.deta.dev/login/",
    config: {
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
      },
    },

    email: "",
    password: "",
    dialog: false,
  }),
  methods: {
    toRegister() {
      this.dialog = false;
    },
    login() {
      this.succes = true;
      const data = qs.stringify({
        username: this.email,
        password: this.password,
      });
      axios
        .post(this.loginUrl, data, this.config)
        .then((r) => {
          this.succes = false;
          this.dialog = false;
          this.validCredentials =true;
          this.buttonColor = "#50fa7b";
          this.$store.commit("setLoginStatus", true);
          this.$store.commit("setCurrentToken", r.data.access_token);
          this.$store.commit("setCurrentKey", r.data.user.name);
        })
        .catch(() => {
          this.succes = false;
          this.buttonColor = "red";
          this.validCredentials =false;
        });
    },
    logOut() {
      this.$store.commit("setLoginStatus", false);
      this.$store.commit("setCurrentToken", "");

      if (this.$router.currentRoute.path !== "/") {
        this.$router.replace("/");
      }
    },
  },
  computed: {
    loginStatus() {
      return this.$store.state.isLogin;
    },
  },
};
</script>

<style>
</style>