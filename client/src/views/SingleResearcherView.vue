<script setup>
import { ref, onMounted, reactive, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
    VaInput, VaDivider, VaIcon, VaProgressCircle, VaDataTable, VaButton, VaModal,
    VaCardTitle, VaCardContent, VaCardActions, VaSelect
} from 'vuestic-ui';
import DeleteWarning from '../components/DeleteWarning.vue';
import { update } from 'lodash';

const router = useRouter();
const route = useRoute();

const basicData = ref();
const updatedData = ref({
  firstName: "",
  lastName: "",
  email: "",
  department: ""
});
const updateLoading = ref(false);
const updateError = ref("");

const editing = ref(false);
const deleteWarning = ref(false);
const initialDepartment = ref("");

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

onMounted(async () => {
  const { body } = await (await fetch("/api/researchers/" + route.params.id)).json();
  basicData.value = body;
  let displayData = {
    firstName: body.Firstname,
    lastName: body.Lastname,
    email: body.Email,
    department: body.Department
  }

  displayData.department = departments.find(element => element.text == body.Department);
  initialDepartment.value =body.Department;
  updatedData.value = displayData;
});

function goBack() {
  router.push("/researchers");
}

async function saveUpdates() {
  updateLoading.value = true;

  const departmentID = departments.find(element => updatedData.value.department.text == element.text).value;
  let { department, ...postBody } = updatedData.value;
  postBody["departmentID"] = departmentID;

  try {
    const response = await (await fetch("/api/researchers/" + route.params.id, 
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
        class="bg-white shadow-slate-400 text-center shadow-lg max-w-6xl mx-auto rounded-lg flex flex-col pb-5"
      >
        <div class="flex justify-between w-full">
          <span class="basis-20 flex justify-start items-center ml-3">

            <va-button class="py-1 mt-2 rounded-lg" color="primary" preset="primary" @click="goBack">
              <va-icon name="arrow_back"/>
            </va-button>

          </span>
          <h1 class="text-3xl font-bold pt-4 pb-3 justify-self-center">
            <span v-if="updatedData != null">{{ updatedData.firstName }} {{ updatedData.lastName }}</span>
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
        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-lg px-5">
          <va-input 
            class="justify-self-center"
            label="First Name"
            v-model="updatedData.firstName"
            :readonly="!editing"
          />

          <va-input 
            class="justify-self-center"
            label="Last Name"
            v-model="updatedData.lastName"
            :readonly="!editing"
          />

          <va-input 
            class="justify-self-center"
            label="Email"
            type="email"
            v-model="updatedData.email"
            :readonly="!editing"
          />

          <va-select
            class="justify-self-center text-left"
            label="Department"
            :options="departments"
            :placeholder="initialDepartment"
            v-model="updatedData.department"
            :readonly="!editing"
          />
        </div>
        
      </div>
    </div>
</template>
