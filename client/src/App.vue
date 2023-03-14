<script setup>
import { RouterView } from "vue-router";
import Navbar from './components/Navbar.vue';
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <Navbar class="fixed z-10"/>
  <div class="mt-[55px] ml-0 md:ml-[64px] md:mt-0">
    <RouterView />
  </div>
</template>
