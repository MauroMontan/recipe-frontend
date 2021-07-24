<template>
  <v-dialog v-model="dialog" dark overlay-color="#00D2FF61" width="730">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        fixed
        elevation="17"
        large
        fab
        dark
        bottom
        right
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card elevation="24" class="pa-3" dark style="border-radius: 25px">
      <v-row dense>
        <v-col cols="12" sm="7" lg="7" md="7">
          <v-text-field
            prepend-icon="mdi-bowl"
            label="recipie name"
            v-model="recipie_name"
            filled
            dense
            dark
            rounded
            placeholder="type recipie name"
            style="border-radius: 25px"
            clear-icon="mdi-close-circle"
            clearable
          />
        </v-col>
        <v-col cols="12" sm="5" lg="5" md="5">
          <v-text-field
            prepend-icon="mdi-account"
            label="recipie author"
            v-model="author"
            filled
            dense
            dark
            rounded
            placeholder="type recipie author"
            style="border-radius: 25px"
            clearable
            clear-icon="mdi-close-circle"
          />
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" sm="5" lg="5" md="5">
          <v-text-field
            prepend-icon="mdi-fire"
            label="time to cook"
            v-model="cook_time"
            filled
            dense
            dark
            rounded
            placeholder="cook time"
            style="border-radius: 25px"
            clear-icon="mdi-close-circle"
            clearable
            light
          />
        </v-col>
        <v-col cols="12" sm="7" lg="7" md="7">
          <v-text-field
            prepend-icon="mdi-clock"
            label="time to prepare"
            filled
            v-model="prepare_time"
            dense
            dark
            rounded
            placeholder="type the time to prepare"
            style="border-radius: 25px"
            clear-icon="mdi-close-circle"
            clearable
            light
          />
        </v-col>
      </v-row>

      <v-row dense>
        <v-col cols="12" sm="6" lg="6" md="6">
          <v-textarea
            prepend-icon="mdi-format-list-bulleted"
            label="Ingredients"
            v-model="ingredients"
            color="orange orange-darken-4"
            filled
            dense
            clearable
            rounded
            rows="3"
            clear-icon="mdi-close-circle"
            placeholder="give the ingredients"
            style="border-radius: 25px"
            dark
          />
        </v-col>
        <v-col cols="12" sm="6" lg="6" md="6">
          <v-textarea
            prepend-icon="mdi-book"
            label="directions"
            v-model="directions"
            color="orange orange-darken-4"
            filled
            dense
            rows="3"
            clearable
            rounded
            clear-icon="mdi-close-circle"
            placeholder="give the directions of your recipie"
            style="border-radius: 25px"
            dark
          />
        </v-col>
      </v-row>

      <v-row justify="space-around" align="center">
        <v-color-picker
          style="height: 81px"
          class="mx-2"
          dark
          v-model="color"
          width="240"
          hide-canvas
          hide-mode-switch
          hide-text
        ></v-color-picker>

        <v-btn :loading="loading" class="mx-2" color="success" @click="submit" fab dark>
          <v-icon large color="warning" dark> mdi-content-save </v-icon>
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading:false,
    dialog: false,
    color: "",
    recipie_name: "",
    author: "",
    cook_time: "",
    prepare_time: "",
    ingredients: "",
    directions: "",
  }),
  methods: {
    submit() {
      this.loading =true;
      let headersList = {
        Authorization: "Bearer " + this.$store.state.currentToken,
        "Content-Type": "application/json",
      };

      let reqOptions = {
        url: "https://mauroapi.deta.dev/recipies/",
        method: "POST",
        headers: headersList,
        data: {
          key: "",
          recipie_name: this.recipie_name,
          author: this.author,
          cook_time: this.cook_time,
          prepare_time: this.prepare_time,
          ingredients: this.ingredients,
          directions: this.directions,
          card_color: this.color,
        },
      };
      axios.request(reqOptions).then((response) => {
        console.log(response.data);
        this.loading = false;
        this.dialog = false;
      });
    },
  },
};
</script>

<style>
</style>