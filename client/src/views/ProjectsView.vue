<script setup>
import { ref, onMounted} from 'vue';
import { VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable } from 'vuestic-ui';
const searchValue = ref("");
const projectData = ref();

onMounted(async () => {
  projectData.value  = (await (await fetch("/api/projects")).json()).body;
});

</script>

<template>
  <main>
    <div class="pt-14 px-5">
      <div class="bg-white m-auto shadow-slate-400 flex flex-col justify-center text-center shadow-lg max-w-5xl rounded-lg">
        <h1 class="text-3xl font-bold pt-4 pb-3">Research Projects</h1>
        
        <va-divider class="px-3 mb-6"/>

        <div class="flex justify-center">
          <span>
            <va-input
              v-model="searchValue"
              class="mb-6 search-bar"
              placeholder="Search"
            >
              <template #prependInner>
                <va-icon name="search" style="margin-left: -5px;" />
              </template>
            </va-input>
          </span>
        </div>

        <div v-if="projectData == null" class="flex justify-center min-h-[150px]">
          <va-progress-circle  indeterminate />
        </div>
        <div v-else class="px-5 pt-6 pb-3">
          <va-data-table :items="projectData" />
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
