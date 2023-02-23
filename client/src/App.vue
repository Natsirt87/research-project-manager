<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, NButton } from "naive-ui";
import Navbar from './components/Navbar.vue';
import { darkTheme, lightTheme } from "naive-ui";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const themeOverrides = {
  common: {
    
  }
}
</script>

<template>
  <n-config-provider :theme="isDark ? darkTheme : lightTheme" :theme-overrides="themeOverrides">
    <Navbar/>
    <n-button @click="toggleDark()">Toggle Dark Mode</n-button>
    <h1 class="bg-primary">{{ isDark }}</h1>
    
    <RouterView />
  </n-config-provider>
</template>
