<template>
  <v-container  style="border-radius: 16px" grid-list-md fluid app>
    <v-img
      v-if="recipies.length !== 0 && overlay === false"
      max-width="400"
      style="position: fixed; bottom: 0; width: 700px; transform: scaleX(-1)"
      src="../assets/undraw_Chef_cu0r.svg"
    />
    <v-row style="display: flex" dense>
      <v-overlay :value="overlay">
        <v-progress-circular
          color="warning"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
      <v-dialog style="border-radius: 25px" v-model="editPage" width="700">
        <v-card elevation="12" class="pa-3" dark style="border-radius: 25px">
          <v-row dense>
            <v-col cols="12" sm="7" lg="7" md="7">
              <v-text-field
                prepend-icon="mdi-bowl"
                label="recipe name"
                filled
                dense
                v-model="recipie_name"
                dark
                rounded
                placeholder="type recipe name"
                style="border-radius: 25px"
                clear-icon="mdi-close-circle"
                clearable
              />
            </v-col>
            <v-col cols="12" sm="5" lg="5" md="5">
              <v-text-field
                prepend-icon="mdi-account"
                label="recipe author"
                filled
                v-model="author"
                dense
                dark
                rounded
                placeholder="type recipe author"
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
                filled
                dense
                v-model="cook_time"
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
                color="orange orange-darken-4"
                filled
                dense
                v-model="ingredients"
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
                color="orange orange-darken-4"
                filled
                v-model="directions"
                dense
                rows="3"
                clearable
                rounded
                clear-icon="mdi-close-circle"
                placeholder="give the directions of your recipe"
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
              :value="color"
              width="240"
              hide-canvas
              hide-mode-switch
              hide-text
            ></v-color-picker>

            <v-btn
              :loading="loading"
              @click="EditRecipie"
              class="mx-2"
              color="success"
              fab
              dark
            >
              <v-icon large color="warning" dark> mdi-content-save </v-icon>
            </v-btn>
          </v-row>
        </v-card>
      </v-dialog>

      <v-img
        v-if="recipies.length === 0 && overlay === false"
        max-width="400"
        style="
          position: fixed;
          top: 35%;
          left: 50%;
          transform: translateX(-50%);
        "
        src="../assets/undraw_empty_xct9.svg"
      />
      <v-col
        v-for="(item, i) in recipies"
        :key="i"
        cols="12"
        md="4"
        xs="12"
        sm="12"
      >
        <v-card
          style="border-radius: 16px"
          class="pa-2 mb-2"
          dark
          elevation="12"
          max-height="400"
          color="rgba(18, 18, 18, 0.91)"
          :key="i"
        >
          <v-layout column align-center>
            <div class="text-overline ml-4 mb-1">
              {{ item.author }}
            </div>

            <v-list-item-title
              :style="`color:${item.card_color};`"
              class="text-h5 ml-4"
            >
              {{ item.recipie_name }}
            </v-list-item-title>

            <h3>time to prepare: {{ item.prepare_time }}</h3>
            <h3>time to cook: {{ item.cook_time }}</h3>
          </v-layout>
          <v-layout column align-center>
            <v-card-actions>
              <v-btn
                :id="i"
                @click="delete_recipie(item.key, i)"
                outlined
                rounded
                text
              >
                <v-icon color="red" dark> mdi-delete </v-icon></v-btn
              >
              <v-btn
                @click="
                  openDialog(
                    item.recipie_name,
                    item.card_color,
                    item.author,
                    item.cook_time,
                    item.prepare_time,
                    item.ingredients,
                    item.directions,
                    item.key
                  )
                "
                outlined
                rounded
                text
              >
                <v-icon dark> mdi-pencil </v-icon></v-btn
              >
              <v-btn outlined rounded text>
                <v-icon dark> mdi-book-open</v-icon></v-btn
              >
            </v-card-actions>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    deleteLoading: false,
    loading: false,
    editPage: false,
    recipie_key: "",
    color: "",
    recipie_name: "",
    author: "",
    cook_time: "s",
    prepare_time: "",
    ingredients: "",
    directions: "",
    overlay: true,
    recipies: [],
    selectedItem: 1,
    items: [
      { text: "Real-Time", icon: "mdi-food", name: "mauro" },
      { text: "Real-Time", icon: "mdi-food", name: "miguel" },
      { text: "Real-Time", icon: "mdi-food", name: "breath" },
    ],
  }),
  methods: {
    openDialog(
      recipie_name,
      color,
      author,
      cook_time,
      prepare_time,
      ingredients,
      directions,
      recipie_key
    ) {
      this.editPage = true;
      this.recipie_name = recipie_name;
      this.color = color;
      this.author = author;
      this.cook_time = cook_time;
      this.prepare_time = prepare_time;
      this.ingredients = ingredients;
      this.directions = directions;
      this.recipie_key = recipie_key;
    },
    EditRecipie() {
      this.loading = true;
      console.log(this.recipie_key);

      let headersList = {
        Authorization: "Bearer " + this.$store.state.currentToken,
        "Content-Type": "application/json",
      };

      let reqOptions = {
        url: "https://mauroapi.deta.dev/recipies/update-recipie/",
        method: "PUT",
        headers: headersList,
        data: {
          key: this.recipie_key,
          recipie_name: this.recipie_name,
          author: this.author,
          cook_time: this.cook_time,
          prepare_time: this.prepare_time,
          ingredients: this.ingredients,
          directions: this.directions,
          card_color: this.color,
          userKey: this.$store.state.currentKey,
        },
      };

      axios.request(reqOptions).then((response) => {
        console.log(response.data);
        this.editPage = false;
        this.loading = false;
      });
    },
    delete_recipie(recipie_key, index) {
      this.deleteLoading = true;
      let headersList = {
        Accept: "*/*",
        "Content-Type": "application/json",
      };

      let reqOptions = {
        url: "https://mauroapi.deta.dev/recipies/delete-recipie",
        method: "DELETE",
        headers: headersList,
        data: { key: recipie_key },
      };

      axios.request(reqOptions).then(() => {
        this.deleteLoading = false;
        this.recipies = this.recipies.filter((recipie_key, i) => i != index);
      });
    },
  },
  mounted() {
    const config = {
      method: "post",
      url: "https://mauroapi.deta.dev/recipies/user-recipies",
      headers: {
        Authorization: "Bearer " + this.$store.state.currentToken,
      },
    };

    axios(config)
      .then((r) => {
        r.data[0].forEach((element) => {
          this.recipies.unshift(element);
          console.log(element);
        });
        this.overlay = false;
      })
      .catch((err) => {
        console.log(err);
        this.overlay = false;
      });
  },
};
</script>

<style>
</style>