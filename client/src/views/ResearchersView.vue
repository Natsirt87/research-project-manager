<script setup>
import { ref, onMounted} from 'vue';
import { useRouter } from 'vue-router'
import { VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable, VaButton } from 'vuestic-ui';
import CreateElement from '../components/CreateElement.vue';

const searchValue = ref("");
const researcherData = ref([]);

const showCreate = ref(false);

const router = useRouter();

const columns = [
  { key: "FirstName", sortable: true },
  { key: "LastName", sortable: true, sortingFn: sortDate},
  { key: "Email", sortable: true, sortingFn: sortDate},
  { key: "Department", sortable: true}
];

const departments = [
  { value: 1, text: "Business" },
  { value: 2, text: "Medicine" },
  { value: 3, text: "Physics" },
  { value: 4, text: "Computer Science" },
  { value: 5, text: "Chemistry" },
  { value: 6, text: "Biology" },
  { value: 7, text: "Engineering" },
  { value: 8, text: "Sociology" },
  { value: 9, text: "Economics" },
  { value: 10, text: "Mathematics" }
];

const addResearcherInputs = {
  firstName: {type: String, label: "First Name"},
  lastName: {type: String, label: "Last Name"},
  email: {type: Boolean, label: "Email"},
  departmentId: {type: departments, label: "Department"},
}

function sortDate(firstDateString, secondDateString) {
  const firstDate = new Date(firstDateString);
  const secondDate = new Date(secondDateString);

  if (firstDate > secondDate) return 1;
  else if (firstDate < secondDate) return -1;
  else return 0;
}

function onRowClick (param) {
  const ID = param.item.ID;
  router.push(`/researchers/${ID}`);
}

async function refreshTable() {
  researcherData.value = [];
  const { body } = await (await fetch("/api/researchers")).json();

  const researchers = body.map((researcher) => {
    const department = departments.find(element => element.value == researcher.DepartmentID).text;

    return { ...researcher, "Department": department};
  });

  researcherData.value = researchers;
}

onMounted(refreshTable);
</script>

<template>
    <div class="h-screen py-1 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-3 md:px-6" >
      <div 
        class="bg-white shadow-slate-400 text-center shadow-lg max-w-6xl mx-auto rounded-lg h-full flex flex-col"
      >
        <h1 class="text-3xl font-bold pt-4 pb-3">Researchers</h1>
        
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
              title="Add New Researcher" 
              post-endpoint="/api/researchers" 
              :inputs="addResearcherInputs"
              :refresh-table="refreshTable"
            />
          </span>
        </div>

        <div v-if="researcherData.length == 0" class="flex justify-center items-center" style="height: calc(100vh - 184px);">
          <va-progress-circle  indeterminate />
        </div>
        <div class="px-5 pt-6 pb-3 flex-1">
          <va-data-table 
            :items="researcherData" 
            :filter="searchValue"
            :columns="columns"
            :item-size="46"
            virtual-scroller
            sticky-header
            striped
            clickable
            hoverable
            @row:click="onRowClick"
            style="height: 100%"
          />
        </div>
        
      </div>
    </div>
</template>
