<script setup>
import { ref, onMounted, reactive, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
    VaInput, VaDivider, VaIcon, VaProgressCircle, VaButton, VaDateInput
} from 'vuestic-ui';
import DeleteWarning from '../components/DeleteWarning.vue';
import DataTable from '../components/DataTable.vue';

// State
const router = useRouter();
const route = useRoute();

const basicData = ref();
const updatedData = ref({
  title: "",
  description: "",
  startDate: undefined,
  endDate: undefined,
  budget: 0
});
const updateLoading = ref(false);
const updateError = ref("");

const editing = ref(false);
const deleteWarning = ref(false);

// Columns for data tables

// description, percentageComplete, progressDate, totalSpending
const progressColumns = [
  { key: "description", sortable: true, fromKey: "Description"},
  { key: "completion", sortable: true, fromKey: "PercentageComplete", type: "Percent"},
  { key: "date", sortable: true, sortingFn: sortDate, fromKey: "ProgressDate", type: "Date"},
  { key: "totalSpending", sortable: true, fromKey: "TotalSpending", type: "Money"},
  { key: "actions"}
];

const researchersColumns = [
  { key: "firstName", sortable: true, fromKey: "FirstName" },
  { key: "lastName", sortable: true, fromKey: "LastName"},
  { key: "email", sortable: true, fromKey: "Email"},
  { key: "department", sortable: true, fromKey: "Department"},
  { key: "actions" } 
];

const fundingColumns = [
  { key: "institution", sortable: true, fromKey: "Institution" },
  { key: "lastName", sortable: true, fromKey: "Amount", type: "Money"},
  { key: "dateReceived", sortable: true, fromKey: "ReceivedDate", type: "Date"},
  { key: "actions" } 
];

const achievementColumns = [
  { key: "title", sortable: true, fromKey: "Title" },
  { key: "date", sortable: true, fromKey: "Date", type: "Date"},
  { key: "type", sortable: true, fromKey: "Type"},
  { key: "actions" } 
];

// Functions

onMounted(async () => {
  const { body } = await (await fetch("/api/projects/" + route.params.id)).json();
  basicData.value = body;
  let displayData = {
    title: body.Title,
    description: body.Description,
    startDate: new Date(body.StartDate),
    endDate: body.EndDate ? new Date(body.EndDate) : undefined,
    budget: body.Budget
  }

  updatedData.value = displayData;
});

function sortDate(firstDateString, secondDateString) {
  const firstDate = new Date(firstDateString);
  const secondDate = new Date(secondDateString);

  if (firstDate > secondDate) return 1;
  else if (firstDate < secondDate) return -1;
  else return 0;
}

function goBack() {
  router.push("/projects");
}

async function saveUpdates() {
  updateLoading.value = true;

  let postBody = { ...updatedData.value };
  postBody.startDate = postBody.startDate.toISOString();
  postBody.endDate = postBody.endDate ? postBody.endDate.toISOString() : undefined;

  try {
    const response = await (await fetch("/api/projects/" + route.params.id, 
      {method: "Put", 
      body: JSON.stringify(postBody)
    })).json();
    
    if (response.status > 300) {
      updateError.value = response.body;
    } else {
      updateError.value = "";
      editing.value = false;
    }
  } catch (error) {
    updateError.value = error;
  }

  updateLoading.value = false;
}

function startEditing() {
  editing.value = true;
}

</script>

<template>
    <div class="h-screen py-1 sm:py-2 md:py-3 lg:py-4 px-1 sm:px-3 md:px-6" >
      <div 
        class="bg-white shadow-slate-400 text-center shadow-lg max-w-6xl mx-auto rounded-lg flex flex-col pb-5 mb-5"
      >
        <div class="flex justify-between w-full">
          <span class="basis-20 flex justify-start items-center ml-3">

            <va-button class="py-1 mt-2 rounded-lg" color="primary" preset="primary" @click="goBack">
              <va-icon name="arrow_back"/>
            </va-button>

          </span>
          <h1 class="text-3xl font-bold pt-4 pb-3 justify-self-center">
            <span v-if="updatedData != null">{{ updatedData.title }}</span>
          </h1>
          <span class="basis-20 flex justify-end items-center mr-3">

            <va-button class="py-1 mt-2 rounded-lg" color="danger" icon="delete" @click="() => deleteWarning = !deleteWarning">
              Delete
            </va-button> 

            <delete-warning 
              v-model="deleteWarning" 
              :delete-endpoint="'/api/researchers/' + route.params.id"
              message="This will permanently delete this researcher. Are you sure you want to continue?"
              :on-delete="goBack"
            />

          </span> 
        </div>
        
        <va-divider class="px-3 mb-3"/>

        <span class="text-danger w-full text-center" style="font-size: 17px;">
          <p>{{ updateError }}</p>
        </span>

        <div class="flex justify-between px-5 mb-6">
          <va-button 
            class="py-1 mt-2 rounded-lg" 
            size="small" color="primary" 
            @click="saveUpdates" 
            :disabled="!editing || updateLoading"
            :loading="updateLoading"
          >
            <va-icon name="save"/>
          </va-button>

          <va-button 
            class="py-1 mt-2 rounded-lg" 
            size="small" 
            color="warning" 
            @click="startEditing"
            :disabled="editing"
          >
            <va-icon name="edit"/>
          </va-button>
        </div>
        <div v-if="basicData == null" class="flex justify-center items-center">
          <va-progress-circle  indeterminate />
        </div>
        <div v-else class="px-5">
          <div class="mb-5">
            <va-input 
              class="w-full max-w-[63.7rem]"
              label="Description"
              type="textarea"
              v-model="updatedData.description"
              :readonly="!editing"
            />
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 gap-10 text-lg">
            <va-date-input 
            class="justify-self-center"
            label="Start Date"
            v-model="updatedData.startDate"
            :readonly="!editing"
          />

          <va-date-input
            class="justify-self-center text-left"
            label="End Date"
            v-model="updatedData.endDate"
            :readonly="!editing"
          />

          <va-input
            class="justify-self-center"
            label="Budget"
            mask="numeral"
            v-model="updatedData.budget"
            :readonly="!editing"
          />
          </div>
        </div>

        <!-- Project-related data tables -->
        <div class="mt-16 mb-12">
          <h1 class="mb-4 text-xl font-bold">Progress Reports</h1>
          <data-table 
            :get-endpoint="'/api/projects/' + route.params.id + '/progress'"
            :columns="progressColumns"
            read-only
            height="300px"
          />
        </div>

        <div class="mb-12">
          <h1 class="mb-4 text-xl font-bold">Researchers</h1>
          <data-table 
            :get-endpoint="'/api/projects/' + route.params.id + '/researchers'"
            :columns="researchersColumns"
            read-only
            height="350px"
          />
        </div>

        <div class="mb-12">
          <h1 class="mb-4 text-xl font-bold">Funding Sources</h1>
          <data-table 
            :get-endpoint="'/api/projects/' + route.params.id + '/funding'"
            :columns="fundingColumns"
            read-only
            height="200px"
          />
        </div>
        
        <div class="mb-12">
          <h1 class="mb-4 text-xl font-bold">Funding Sources</h1>
          <data-table 
            :get-endpoint="'/api/projects/' + route.params.id + '/funding'"
            :columns="fundingColumns"
            read-only
            height="150px"
          />
        </div>

        <div>
          <h1 class="mb-4 text-xl font-bold">Achievements</h1>
          <data-table 
            :get-endpoint="'/api/projects/' + route.params.id + '/achievements'"
            :columns="achievementColumns"
            read-only
            height="150px"
          />
        </div>

      </div>
    </div>
</template>
