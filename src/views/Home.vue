<template>
  <v-container grid-list-md text-xs-center app fluid>
    <v-img
      max-width="400"
      style="position: fixed; bottom: 55px; width: 700px; transform: scaleX(-1)"
      src="../assets/undraw_Hamburger_8ge6.svg"
    />
    <h1
      class="mt-2 mb-2"
      align="center"
      style="border-radius: 15px; color:#ff0059"
    >
      Enjoy cooking!
    </h1>
    <v-layout row wrap align-center>
      <v-flex xs12 md12>
        <v-row style="display: flex" dense>
          <v-col cols="12" md="6" xs="12" sm="12">
            <v-card
              style="border-radius: 15px"
              class="pa-5 mb-4 mt-2 mx-10"
              color="rgba(39, 39, 39, 0.8)"
              dark
             
              elevation="20"
            >
              <h2 align="center">Store your own recipes</h2>
              <h4 align="center">
                Store any recipe you want, anywhere, anytime !
              </h4>
              <v-img
                max-width="140"
                style="
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  margin-top:20px;
                  width: 60%;
                "
                src="../assets/undraw_cooking_lyxy.svg"
              />
            </v-card>
          </v-col>
          <v-col cols="12" md="6" xs="12" sm="12">
            <v-card
              @click="sayHi"
              style="border-radius: 15px"
              class="pa-5 mb-4 mt-10 mx-10"
              dark
             
              color="rgba(39, 39, 39, 0.8)"
              elevation="12"
            >
              <h2 align="center">Add your ideas</h2>
              <h4 align="center">
                add and edit your favourite recipes, keep it safe from the
                outside!
              </h4>
              <v-img
                max-width="150"
                style="
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  margin-top:20px;
                  width: 50%;
                "
                src="../assets/undraw_Add_files_re_v09g.svg"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    sayHi() {
      alert("hello");
    },
  },
};
</script>

<style>
body {
  background-image: url("../assets/undraw_Hamburger_8ge6.svg");
  background-repeat: repeat-y;
}
</style>