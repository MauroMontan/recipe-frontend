<template>
 
    <v-container class="spacing-playground pa-2 mx-7" app>
      <v-img
        max-width="400"
        style="
          position: fixed;
          bottom: 60px;
          width: 700px;
          transform: scaleX(-1);
        "
        src="../assets/undraw_Hamburger_8ge6.svg"
      />
      <h1 class="mt-4 mb-2" align="center" style="color: #72787e">
        Enjoy cooking!
      </h1>
      <v-layout row wrap align-center>
        <v-flex xs12 md12>
          <v-row style="display: flex" dense>
            <v-col cols="12" md="6" xs="12" sm="12">
              <v-card
                style="
                  border-radius: 15px;
                  background-color: rgba(18, 18, 18, 0.8);
                "
                class="pa-5 mb-5 mt-8"
                dark
                elevation="18"
              >
                <h2 align="center">Store your own recipes</h2>
                <h4 align="center">
                  Store any recipe you want, anywhere, anytime !
                </h4>
                <v-img
                  max-width="130"
                  style="
                    display: block;
                    margin-left: auto;
                    margin-right: auto;
                    width: 50%;
                  "
                  src="../assets/undraw_cooking_lyxy.svg"
                />
              </v-card>
            </v-col>
            <v-col cols="12" md="6" xs="12" sm="12">
              <v-card
                style="
                  border-radius: 15px;
                  background-color: rgba(18, 18, 18, 0.8);
                "
                class="pa-5 mb-9 mt-8"
                dark
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
};
</script>
