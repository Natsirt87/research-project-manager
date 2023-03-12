<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'
import { VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable, VaButton } from 'vuestic-ui';
import CreateElement from '../components/CreateElement.vue';
import { round } from 'lodash';

const searchValue = ref("");
const projectData = ref([]);
const filteredData = ref(projectData);

const showCreate = ref(false);

const router = useRouter();

const columns = [
  { key: "Title", sortable: true },
  { key: "StartDate", sortable: true, sortingFn: sortDate},
  { key: "EndDate", sortable: true, sortingFn: sortDate},
  { key: "Progress", sortable: true},
  { key: "Spending", sortable: true},
  { key: "Budget", sortable: true},
  { key: "BudgetUsed", sortable: true}
];

const addProjectInputs = {
  title: {type: String, label: "Title"},
  description: {type: BigInt, label: "Description"},
  startDate: {type: Date, label: "Start Date"},
  endDate: {type: Date, label: "End Date"},
  budget: {type: Number, label: "Budget"}
}

function sortDate(firstDateString, secondDateString) {
  const firstDate = new Date(firstDateString);
  const secondDate = new Date(secondDateString);

  if (firstDate > secondDate) return 1;
  else if (firstDate < secondDate) return -1;
  else return 0;
}

function onFilter (event) {
  filteredData.value = event.items;
}

function onRowClick (param) {
  const ID = param.item.ID;
  router.push(`/projects/${ID}`);
}

async function refreshTable() {
  projectData.value = [];
  const { body } = await (await fetch("/api/projects")).json();

  const projects = body.map((project) => {
    const startDate = (new Date(project.StartDate)).toLocaleDateString();
    const endDate = project.EndDate ? (new Date(project.EndDate)).toLocaleDateString() : "~";
    const spending = project.Spending ? "$" + project.Spending : "~";
    const budget = project.Budget ? "$" + project.Budget : "~";
    const progress = project.Progress ? project.Progress + "%" : "~";

    const budgetUsed = project.Budget && project.Spending ? round(project.Budget / project.Spending, 0) + "%" : "0%";

    return { ...project, "StartDate": startDate, "EndDate": endDate, 
            "Spending": spending, "Budget": budget, "Progress": progress , "BudgetUsed": budgetUsed};
  });

  projectData.value = projects;
}

onMounted(refreshTable);
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
          
          <span class="ml-2">
            <va-button 
              icon="add" 
              color="success" 
              style="margin-top: -0.5px; max-height: 4px !important;"
              @click="() => showCreate = !showCreate"
            >
              Add
            </va-button>

            <create-element 
              v-model="showCreate" 
              title="Add New Project" 
              post-endpoint="/api/projects" 
              :inputs="addProjectInputs"
              :refresh-table="refreshTable"
            />
          </span>
        </div>

        <div v-if="projectData.length == 0" class="flex justify-center items-center" style="height: calc(100vh - 184px);">
          <va-progress-circle  indeterminate />
        </div>
        <div class="px-5 pt-6 pb-3 flex-1">
          <va-data-table />
          <!-- <va-data-table 
            :items="projectData" 
            :filter="searchValue"
            :columns="columns"
            :item-size="46"
            virtual-scroller
            sticky-header
            striped
            clickable
            hoverable
            @row:click="onRowClick"
            @filtered="onFilter"
            style="height: 100%"
          /> -->
        </div>
        
      </div>
    </div>
</template>
