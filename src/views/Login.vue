<script setup>
import { onBeforeMount, ref } from "vue";
import axios from "axios";
const nombre = ref("");
const usuario = ref("");
const boolean = ref(false);
const lista = ref([]);
async function leerApi() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/users");
  lista.value = response.data;
  console.log(lista.value);
}
onBeforeMount(leerApi);
function comprobar() {
  for (let index in lista.value) {
    if (
      nombre.value == lista.value[index].name &&
      usuario.value == lista.value[index].username
    ) {
      location.replace("/listado");
    } else {
      boolean.value = true;
    }
  }
}
</script>
<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="6">
        <v-card class="pa-5" outlined elevation="10">
          <v-text-field v-model="nombre" label="Nombre"></v-text-field>
          <v-text-field v-model="usuario" label="Usuario"></v-text-field>
          <v-btn variant="outlined" @click="comprobar">LogIn</v-btn>
          <v-text-field readonly v-if="boolean">Datos incorrectos</v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
