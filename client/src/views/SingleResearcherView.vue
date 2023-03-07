<script setup>
import { ref, onMounted, reactive, computed} from 'vue';
import { VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable } from 'vuestic-ui';

const projectData = ref();
const achievementData = ref();

onMounted(async () => {
  // TODO: Load all of the data for this researcher from APIs
});

</script>

<template>
    <div class="h-screen py-1 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-3 md:px-6" >
      <div 
        class="bg-white shadow-slate-400 text-center shadow-lg max-w-6xl mx-auto rounded-lg flex flex-col"
      >
        <h1 class="text-3xl font-bold pt-4 pb-3">Researcher Title</h1>
        
        <va-divider class="px-3 mb-6"/>
        
      </div>
    </div>
</template>
