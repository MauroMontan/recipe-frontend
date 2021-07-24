<template>
  <v-container
    style="max-width: 560px"
    bg
    fill-height
    grid-list-md
    text-xs-center
  >
    <v-layout row wrap align-center>
      <v-flex xs12 md12>
        <v-card dark style="border-radius: 30px" class="pa-3" elevation="20">
          <v-layout class="mb-4" column align-center>
            <v-avatar size="80" dark color="#ffb86c">
              <v-img dark height="60" src="../assets/veggie-salad.svg"></v-img>
            </v-avatar>
          </v-layout>
          <v-text-field
            label="Full Name"
            filled
            v-model="name"
            dense
            flat
            dark
            rounded
            placeholder="type your full name"
            style="border-radius: 25px"
            clearable
            light
          />
          <v-text-field
            label="email"
            filled
            v-model="email"
            dense
            flat
            dark
            rounded
            placeholder="type your email"
            style="border-radius: 25px"
            clearable
            light
          />
          <v-text-field
            label="Username"
            filled
            dense
            v-model="username"
            flat
            dark
            rounded
            placeholder="type your username"
            style="border-radius: 25px"
            clearable
            light
          />
          <v-text-field
            label="create a password"
            filled
            v-model="password"
            dark
            dense
            flat
            rounded
            placeholder="type your password"
            style="border-radius: 25px"
            clearable
            light
          />
          <v-text-field
            label="confirm your password"
            filled
            dense
            flat
            rounded
            placeholder="type your password"
            style="border-radius: 25px"
            clearable
            dark
            light
          />
          <v-layout column align-center>
            <v-btn
              prepend-icon="mdi-file"
              :loading="succes"
              @click.prevent="register"
              depressed
              outlined
              color="#50fa7b"
              style="display: flex"
              rounded
              dark
            >
              register
              <v-icon right dark> mdi-food-apple </v-icon>
            </v-btn>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    succes: false,
    email: "",
    name: "",
    password: "",
    username: "",
  }),
  methods: {
    register() {
      this.succes = true;
      axios
        .post("https://mauroapi.deta.dev/user/", {
          email: this.email,
          name: this.name,
          password: this.password,
          username: this.username,
        })
        .then(() => {
          this.succes = false;
          if (this.$router.currentRoute.path !== "/") {
            this.$router.replace("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>


