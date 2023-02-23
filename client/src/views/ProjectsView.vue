<script setup>
import { ref } from 'vue';
import { VaInput, VaDivider, VaIcon } from 'vuestic-ui';

const searchValue = ref("");
</script>

<template>
  <main>
    <div class="flex justify-center pt-14 px-5">
      <div class="bg-white shadow-slate-400 shadow-lg flex-col items-center justify-center text-center max-w-5xl rounded-lg">
        <h1 class="text-3xl font-bold pt-4 pb-3">Research Projects</h1>
        <va-divider class="px-3 mb-6"/>
        <va-input
          v-model="searchValue"
          class="mb-6 search-bar"
          placeholder="Search"
        >
          <template #prependInner>
            <va-icon name="search" style="margin-left: -5px;" />
          </template>
        </va-input>
      </div>
    </div>
  </main>
</template>

<style scoped>
.search-bar {
  width: 60%;
}

</style>
