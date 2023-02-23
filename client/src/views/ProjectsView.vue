<script setup>
import { ref, onMounted} from 'vue';
import { VaInput, VaDivider, VaIcon, VaProgressCircle } from 'vuestic-ui';

const searchValue = ref("");
const message = ref("");

onMounted(async () => {
  message.value = (await (await fetch("/api/projects")).json()).body;
});

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
        
        <div class="flex flex-col items-center justify-center mt-5 text-center h-32">
          <va-progress-circle v-if="message.length == 0" indeterminate />
          <span v-else class="flex flex-col items-center justify-center">{{ message }}</span>
        </div>
        
      </div>
    </div>
  </main>
</template>

<style scoped>
.search-bar {
  width: 60%;
}

</style>
