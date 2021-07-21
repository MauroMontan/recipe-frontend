<template>
  <v-container
    style="max-width: 700px; border-radius: 16px"
    fill-height
    grid-list-md
    text-xs-center
    app
  >
    <v-dialog style="border-radius: 25px" v-model="editPage" width="700">
      <v-card elevation="24" class="pa-3" dark style="border-radius: 25px">
        <v-row dense>
          <v-col cols="12" sm="7" lg="7" md="7">
            <v-text-field
              prepend-icon="mdi-bowl"
              label="recipie name"
              filled
              dense
              v-model="recipie_name"
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
              filled
              v-model="author"
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

    <v-overlay :value="overlay">
      <v-progress-circular
        color="warning"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-layout row wrap align-center>
      <v-flex class="mb-0" xs12 md12>
        <v-list
          color="#44475a"
          style="max-height: 2980px; min-height: 100px; border-radius: 25px"
          class="overflow-y-auto"
          dark
          rounded
          flat
        >
          <v-card
            style="border-radius: 25px"
            class="pa-1 mb-5 mx-auto"
            outline
            dark
            elevation="11"
            height="226"
            v-for="(item, i) in recipies"
            :key="i"
            :color="item.card_color"
          >
            <v-list-item three-line>
              <v-list-item-content>
                <div
                  justify
                  style="position:absolute; margin-bottom: 100px"
                  class="text-h7 mr-6 pa-2"
                >
                  {{ item.recipie_name }}
                </div>
                <v-list-item-title class="text-h7 mb-0">
                  {{ item.recipie_author }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >time to prepare:
                  {{ item.prepare_time }}
                  time</v-list-item-subtitle
                >
                <v-list-item-subtitle
                  >time to cook:
                  {{ item.cook_time }}
                  time</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-img
                class="mt-12"
                fluid
                style="border-radius: 16px"
                lazy-src="https://picsum.photos/id/11/10/6"
                max-height="290"
                max-width="140"
                src="https://lacocinadefrabisa.lavozdegalicia.es/wp-content/uploads/2014/11/merluza.jpg"
              ></v-img>
            </v-list-item>

            <v-card-actions>
              <v-btn @click="delete_recipie(item.key, i)" outlined rounded text>
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
          </v-card>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
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

      axios.request(reqOptions).then((response) => {
        console.log(response.data);
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
      });
  },
};
</script>

<style>
</style>