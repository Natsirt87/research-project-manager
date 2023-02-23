<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/Navbar.vue';
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Navbar/>
  <RouterView />
</template>
