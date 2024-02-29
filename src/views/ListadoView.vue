<script setup>
import CardVue from "@/components/Card.vue";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
const lista = ref([]);
const bool = ref(false);
const esta = ref(false);
const listaIndices = ref([]);
const listaBool = ref([]);
const listaNombres = ref([]);
const fondoCard = ref(true);
const listaTamaño = ref([]);
async function leerApi() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
  lista.value = response.data;
  console.log(lista.value);
}
function rellenarBool() {
  for (let index in lista.value) {
    listaBool.value.push(false);
    listaNombres.value.push("");
  }
}
onBeforeMount(leerApi);
onBeforeMount(rellenarBool);
function cambiarBool(numero) {
  if (numero != 0) {
    bool.value = true;
  } else {
    bool.value = false;
  }
}
function comprobarFav(index2) {
  esta.value = false;
  for (let index in listaIndices.value) {
    if (listaIndices.value[index] == index2) {
      esta.value = true;
      listaIndices.value.splice(index, 1);
    }
  }
  if (!esta.value) {
    listaIndices.value.push(index2);
  }

  console.log(listaIndices.value);
}
function editar(indice) {
  listaBool.value[indice] = !listaBool.value[indice];
  listaTamaño.value[indice] = !listaTamaño.value[indice];
  fondoCard.value = !fondoCard.value;
}
function guardar(indice) {
  lista.value[indice].body = listaNombres.value[indice];
}
</script>
<template>
  <v-container fluid class="fondo-general">
    <v-row justify="center">
      <v-btn @click="cambiarBool(1)"><v-icon icon="fa-solid fa-list"></v-icon></v-btn>
      <v-btn @click="cambiarBool(0)"><v-icon icon="fa-solid fa-bookmark"></v-icon></v-btn>
    </v-row>

    <v-row justify="center">
      <v-col v-if="bool" cols="12">
        <v-row>
          <v-col v-for="(miembro, index) in lista" :key="index" cols="12" sm="6" md="4">
            <v-card :class="{ 'fondo-card': !listaTamaño[index] }">
              <CardVue
                :id="miembro.id"
                :body="miembro.body"
                :title="miembro.title"
                class="texto"
              />

              <v-row id="botones" class="align-end mb-4">
                <v-col cols="12" class="text-center">
                  <v-btn variant="tonal" @click="comprobarFav(miembro.id)"
                    ><v-icon color="red" icon="fa-solid fa-heart-circle-plus"></v-icon
                  ></v-btn>

                  <v-btn variant="tonal" @click="editar(index)"
                    ><v-icon id="boton-editar" icon="fa:fas fa-edit"></v-icon
                  ></v-btn>
                </v-col>
              </v-row>

              <v-text-field
                v-model="listaNombres[index]"
                v-if="listaBool[index]"
              ></v-text-field>
              <v-btn variant="tonal" @click="guardar(index)" v-if="listaBool[index]"
                ><v-icon id="boton-guardar" class="fa-regular fa-floppy-disk"></v-icon
              ></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <v-col v-else cols="12">
        <v-row>
          <v-col v-for="index in listaIndices" :key="index" cols="12" sm="6" md="4">
            <v-card>
              <CardVue
                :id="lista[index - 1].id"
                :body="lista[index - 1].body"
                :title="lista[index - 1].title"
              />
              <v-btn variant="tonal" @click="comprobarFav(lista[index - 1].id)"
                ><v-icon color="red" icon="fa-solid fa-heart-circle-minus"></v-icon
              ></v-btn>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
/*
.fondo-general {
  background-color: rgb(70, 166, 255);
}

*/
.botones {
  margin-top: auto;
}
#boton-guardar {
  color: rgb(127, 153, 255);
}
#boton-editar {
  color: rgb(200, 255, 47);
}
.fondo-card {
  height: 66vh;
  /* width: fit-content; */
}
.texto {
  margin: 2%;
}
</style>
