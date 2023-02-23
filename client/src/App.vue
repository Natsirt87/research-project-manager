<script setup>
import { RouterView } from "vue-router";
import { NConfigProvider, NButton } from "naive-ui";
import Navbar from './components/Navbar.vue';
import { darkTheme, lightTheme } from "naive-ui";
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const customLightTheme = {
  common: {
    primaryColor: "hsl(204, 100%, 23%)",
    primaryColorHover: "hsl(204, 100%, 30%)",
    primaryColorPressed: "hsl(204, 100%, 19%)",
    primaryColorSuppl: "hsl(204, 100%, 19%)",
    infoColor: "hsl(187, 55%, 61%)",
    infoColorHover: "hsl(187, 66%, 65%)",
    infoColorPressed: "hsl(187, 55%, 54%)",
    infoColorSuppl: "hsl(187, 55%, 57%)",
    successColor: "hsl(153, 100%, 33%)",
    successColorHover: "hsl(153, 100%, 36%)",
    successColorPressed: "hsl(153, 100%, 30%)",
    successColorSuppl: "hsl(153, 100%, 29%)",
    warningColor: "hsl(37, 90%, 53%)",
    warningColorHover: "hsl(37, 95%, 60%)",
    warningColorPressed: "hsl(37, 90%, 48%)",
    warningColorSuppl: "hsl(37, 90%, 53%)",
    errorColor: "hsl(2, 80%, 48%)",
    errorColorHover: "hsl(2, 100%, 60%)",
    errorColorPressed: "hsl(2, 80%, 44%)",
    errorColorSuppl: "hsl(2, 100%, 44%)",
  }
}

const customDarkTheme = {
  common: {
    primaryColor: "hsl(204, 100%, 43%)",
    primaryColorHover: "hsl(204, 100%, 50%)",
    primaryColorPressed: "hsl(204, 100%, 39%)",
    primaryColorSuppl: "hsl(204, 100%, 19%)",
    infoColor: "hsl(187, 55%, 61%)",
    infoColorHover: "hsl(187, 66%, 65%)",
    infoColorPressed: "hsl(187, 55%, 54%)",
    infoColorSuppl: "hsl(187, 55%, 57%)",
    successColor: "hsl(153, 100%, 33%)",
    successColorHover: "hsl(153, 100%, 36%)",
    successColorPressed: "hsl(153, 100%, 30%)",
    successColorSuppl: "hsl(153, 100%, 29%)",
    warningColor: "hsl(37, 90%, 53%)",
    warningColorHover: "hsl(37, 95%, 60%)",
    warningColorPressed: "hsl(37, 90%, 48%)",
    warningColorSuppl: "hsl(37, 90%, 53%)",
    errorColor: "hsl(2, 80%, 48%)",
    errorColorHover: "hsl(2, 100%, 60%)",
    errorColorPressed: "hsl(2, 80%, 44%)",
    errorColorSuppl: "hsl(2, 100%, 44%)",
  }
}

</script>

<template>
  <n-config-provider 
    :theme="isDark ? darkTheme : lightTheme" 
    :theme-overrides="isDark ? customDarkTheme : customLightTheme"
  >
    <Navbar/>
    <n-button @click="toggleDark()">Toggle Dark Mode</n-button>
    <n-button type="primary">Primary</n-button>
    <n-button type="info">Info</n-button>
    <n-button type="success">Success</n-button>
    <n-button type="warning">Warning</n-button>
    <n-button type="error">Error</n-button>
    <RouterView />
  </n-config-provider>
</template>
