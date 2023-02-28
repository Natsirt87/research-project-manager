<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/Navbar.vue';
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Navbar class="fixed z-10"/>
  <div class="ml-[64px]">
    <RouterView />
  </div>
</template>
