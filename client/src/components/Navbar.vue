<script setup>
import { reactive, computed } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import {
  VaSidebar, VaSidebarItem, VaSidebarItemContent,
  VaSidebarItemTitle, VaIcon, VaNavbar, VaNavbarItem
} from 'vuestic-ui';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const items = reactive([
  {
    title: "Projects", icon: "view_list", url: "/projects",
    active: computed(() => route.name == "projects")
  },
  {
    title: "Researchers", icon: "person", url: "/researchers",
    active: computed(() => route.name == "researchers")
  }
]);

const isSmallScreen = useMediaQuery('(max-width: 767px)')

</script>

<template>
  <div v-if="isSmallScreen" class="flex justify-around w-screen fixed top-0 h-[55px] shadow-lg shadow-zinc-400 bg-white">
    <span v-for="item in items" class="flex-grow flex justify-center items-center" >
      <router-link 
        :to="item.url" 
        class="w-full h-full flex justify-center items-center top-button"
        :class="item.active && 'top-button-active'"
      >
        <va-icon :name="item.icon" class="mx-2"/>
        {{ item.title }}
      </router-link>
    </span>
  </div>
  <div v-else class="h-screen">
    <va-sidebar hoverable minimized-width="64px" color="#FFF" class="shadow-zinc-400 shadow-lg">
      <va-sidebar-item class="cursor-pointer" v-for="item in items" :key="item.title" :active="item.active">

        <router-link :to="item.url">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title>
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </router-link>

      </va-sidebar-item>
    </va-sidebar>
  </div>
</template>

<style scoped>
.top-button {
  color: black;
  transition: all 0.2s ease;
}

.top-button:hover {
  background-color: rgba(21, 78, 193, 0.401);
  color: black;
}

.top-button-active {
  color: white;
  background-color: rgb(21, 78, 193);
}
</style>