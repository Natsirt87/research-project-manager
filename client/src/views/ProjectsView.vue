<script setup>
import { ref, onMounted, reactive, computed} from 'vue';
import { VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable } from 'vuestic-ui';

const searchValue = ref("");
const projectData = ref();

const columns = [
  { key: "Title", sortable: true },
  { key: "Description", sortable: true},
  { key: "StartDate", sortable: true},
  { key: "EndDate", sortable: true},
  { key: "Spending", sortable: true},
  { key: "Budget", sortable: true}
];

const testProjectData = reactive([
  {
    Title: "Old Project",
    Description: "This project is so old, nobody cares about it.",
    StartDate: new Date("1999-06-12").toLocaleDateString(),
    EndDate: new Date("2000-01-06").toLocaleDateString(),
    Spending: "$5,440",
    Budget: "$5,800"
  },
  { 
    Title: "Awesome Project", 
    Description: "This is a really cool project, trust me.",
    StartDate: new Date("2023-02-01").toLocaleDateString(),
    EndDate: "~",
    Spending: "$30",
    Budget: "$2,000"
  },
  {
    Title: "New Project",
    Description: "This project is very new.",
    StartDate: new Date().toLocaleDateString(),
    EndDate: "~",
    Spending: "$0.02",
    Budget: "$2,500,000"
  },
  {
    Title: "New Project",
    Description: "This project is very new.",
    StartDate: new Date().toLocaleDateString(),
    EndDate: "~",
    Spending: "$0.02",
    Budget: "$2,500,000"
  },
  {
    Title: "New Project",
    Description: "This project is very new.",
    StartDate: new Date().toLocaleDateString(),
    EndDate: "~",
    Spending: "$0.02",
    Budget: "$2,500,000"
  },
  {
    Title: "New Project",
    Description: "This project is very new.",
    StartDate: new Date().toLocaleDateString(),
    EndDate: "~",
    Spending: "$0.02",
    Budget: "$2,500,000"
  },
]);

const filteredData = ref(testProjectData);

const onFilter = (event) => {
  filteredData.value = event.items;
  console.log(filteredData.value.length);
}

onMounted(async () => {
  const { body } = await (await fetch("/api/projects")).json();
  projectData.value = body;
});

</script>

<template>
    <div class="h-screen py-1 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-3 md:px-6" >
      <div 
        class="bg-white shadow-slate-400 text-center shadow-lg max-w-6xl mx-auto rounded-lg h-full flex flex-col"
      >
        <h1 class="text-3xl font-bold pt-4 pb-3">Research Projects</h1>
        
        <va-divider class="px-3 mb-6"/>

        <div class="flex justify-center">
          <span class=" w-3/4 sm:w-1/2">
            <va-input
              v-model="searchValue"
              class=" w-full"
              placeholder="Search"
            >
              <template #prependInner>
                <va-icon name="search" style="margin-left: -5px;" />
              </template>
            </va-input>
          </span>
        </div>

        <!-- <div v-if="projectData == null" class="flex justify-center items-center" style="height: calc(100vh - 184px);">
          <va-progress-circle  indeterminate />
        </div> -->
        <div class="px-5 pt-6 pb-3 flex-1">
          <va-data-table 
            :items="testProjectData" 
            :filter="searchValue"
            :columns="columns"
            :item-size="46"
            virtual-scroller
            sticky-header
            striped
            clickable
            hoverable
            @filtered="onFilter"
            style="height: 100%"
          />
        </div>
        
      </div>
    </div>
</template>
