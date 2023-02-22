<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider } from "naive-ui";
import Navbar from './components/Navbar.vue';
</script>

<template>
  <n-config-provider>
    <Navbar/>
    <RouterView />
  </n-config-provider>
</template>
