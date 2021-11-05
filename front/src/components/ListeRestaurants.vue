<template >
  <div id="app">
    <v-toolbar color="rgb(157, 220, 224)">
      <v-toolbar-title class="title"
        ><router-link to="/" class="logo"
          >WikiResto</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="rgb(255,221,189)"
              dark
              v-bind="attrs"
              v-on="on"
              rounded
            >
              Ajouter votre restaurant !
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Votre Restaurant</span>
            </v-card-title>

            <v-card-text>
              <v-form
                ref="form"
                id="ajout"
                v-model="valid"
                v-on:submit="ajouterRestaurant"
              >
                <v-text-field
                  v-model="name"
                  :rules="fieldRules"
                  label="Nom du restaurant"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="cuisine"
                  :rules="fieldRules"
                  label="Cuisine"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  type="submit"
                  form="ajout"
                >
                  Validate
                </v-btn>

                <v-btn color="error" class="mr-4" @click="dialog = false">
                  Fermer
                </v-btn>
              </v-form>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-toolbar>
    <br />
    <br />

    <h1 style="text-align: center; font-size: 6em; color: rgb(232, 108, 32)">
      WikiResto
    </h1>
    <br />
    <h3 style="text-align: center">
      Le site qui référencie plus de {{ nbRestaurantsTotal }} restaurants !
    </h3>

    <br />

    <v-text-field
      color="rgb(157, 220, 224)"
      class="search"
      v-model="recherche"
      append-icon="mdi-magnify"
      label="Rechercher restaurant"
      @input="chercherRestaurant"
      single-line
      hide-details
    ></v-text-field>

    <h3 class="FailSearch" v-if="nbPagesTotal === 0">
      Malheuresement aucun restaurant ne correspond à votre recherche
    </h3>

    <br />

    <v-simple-table class="liste" v-if="nbPagesTotal > 0">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Restaurant</th>
            <th class="text-left">Cuisine</th>
            <th class="text-left">Quartier</th>
            <th class="text-left"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in restaurants" :key="item.name">
            <td>{{ item.name }}</td>
            <td>{{ item.cuisine }}</td>
            <td>{{ item.borough }}</td>
            <td>
              <v-btn x-small rounded>
                <router-link
                  :to="'/RestaurantDetail/' + item._id"
                  class="details"
                  >Plus de détails ici ...</router-link
                >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <br />
    <v-slider
      class="slider"
      color="gray"
      track-color="gray"
      v-model="pagesize"
      max="100"
      min="1"
      @input="getRestaurantsFromServer()"
      >{{ pagesize }}</v-slider
    >
    <p class="indic">Nombre d'éléments par pages {{ pagesize }}</p>

    <v-container class="navigate">
      <v-btn
        class="preced"
        elevation="2"
        :disabled="page === 0"
        @click="pagePrécedente()"
        rounded
        x-small
      >
        Page précédente</v-btn
      >

      &nbsp;&nbsp;&nbsp;

      <v-btn
        class="next"
        elevation="2"
        :disabled="page === nbPagesTotal"
        @click="pageSuivante()"
        rounded
        x-small
      >
        Page suivante</v-btn
      >
    </v-container>
    <br />
    <p class="indic">Page : {{ page + 1 }} sur {{ nbPagesTotal }}</p>
  </div>
</template>

<script>
//import _ from "lodash";
export default {
  name: "ListeRestaurants",
  data: () => ({
    dialog: false,
    restaurants: [],
    name: "",
    cuisine: "",
    nbRestaurantsTotal: 0,
    page: 0,
    pagesize: 10,
    nbPagesTotal: 0,
    msg: "",
    recherche: "",
    nomRestaurantRecherche: "",
    valid: true,
    fieldRules: [(v) => !!v || "Champ requis"],
    select: null,
  }),
  mounted() {
    console.log("avant affichage");
    this.getRestaurantsFromServer();
  },
  methods: {
    pagePrécedente() {
      if (this.page === 0) return;
      this.page--;
      this.getRestaurantsFromServer();
    },

    pageSuivante() {
      if (this.page === this.dernierePage) return;
      this.page++;
      this.getRestaurantsFromServer();
    },

    getRestaurantsFromServer() {
      let url = "http://localhost:8080/api/restaurants?";
      url += "page=" + this.page;
      url += "&pagesize=" + this.pagesize;
      url += "&name=" + this.nomRestaurantRecherche;
      fetch(url)
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            this.restaurants = resJS.data;
            this.nbRestaurantsTotal = resJS.count;
            this.nbPagesTotal = Math.round(
              this.nbRestaurantsTotal / this.pagesize
            );
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    supprimerRestaurant(r) {
      let url = "http://localhost:8080/api/restaurants/" + r._id;
      fetch(url, {
        method: "DELETE",
      })
        .then((responseJSON) => {
          responseJSON.json().then((resJS) => {
            console.log(resJS.msg);
            this.getRestaurantsFromServer();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    ajouterRestaurant(event) {
      event.preventDefault();
      let dataFormulaire = new FormData();
      dataFormulaire.append("name", this.name);
      dataFormulaire.append("cuisine", this.cuisine);
      let url = "http://localhost:8080/api/restaurants";
      console.log(this.name);
      console.log(this.cuisine);
      console.log(dataFormulaire);

      fetch(url, {
        method: "POST",
        body: dataFormulaire,
      }).then((response) => {
        if (response.ok) {
          console.log(response);
          this.getRestaurantsFromServer();
        } else {
          console.log("err");
        }
      });
      this.nom = "";
      this.cuisine = "";
      this.dialog = false;
    },

    getColor(index) {
      return index % 2 ? "lightBlue" : "pink";
    },

    chercherRestaurant() {
      this.nomRestaurantRecherche = this.recherche;
      this.getRestaurantsFromServer();
    }
  },
};
</script>

<style scoped>
.liste {
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  border-radius: 5px;
  border: 1px solid rgb(172, 172, 172);
}

.search {
  width: 30%;
  margin-left: auto;
  margin-right: auto;
}

.navigate {
  text-align: center;
}

.slider {
  margin-left: auto;
  margin-right: auto;
  width: 10%;
}

.indic {
  text-align: center;
  font-family: "Roboto";
  font-size: smaller;
  color: rgb(100, 99, 99);
}

.logo {
  color: rgb(31, 31, 31);
  text-decoration: none;
  font-size: 1.5em;
}
.logo:active {
  color: rgb(31, 31, 31);
}
.details {
  color: rgb(31, 31, 31);
  text-decoration: none;
}

.FailSearch{
  text-align: center;
  font-family: "Roboto";
  font-size: smaller;
  color: rgb(100, 99, 99);
}
</style>
