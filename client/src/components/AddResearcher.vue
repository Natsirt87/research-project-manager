<script setup>
import { ref, reactive, onMounted } from 'vue';
import { 
  VaModal, VaCardTitle, VaCardContent, VaCardActions, VaButton, VaInput, VaDateInput, VaIcon , VaSelect
} from 'vuestic-ui';

const props = defineProps({
  modelValue: Boolean,
  endpoint: String,
  refreshTable: Function
});

defineEmits(["update:modelValue"]);

const loading = ref(false);
const errorMessage= ref("");
const selected = ref([]);
const searchValue = ref("");
const tableContents = ref();
const columns = [
  { key: "FirstName", sortable: true },
  { key: "LastName", sortable: true},
  { key: "Email", sortable: true},
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

onMounted(async () => {
  // TODO: Load researchers specific to this project
  const { body } = await (await fetch("/api/researchers")).json();

  const researchers = body.map((researcher) => {
    const department = departments.find(element => element.value == researcher.DepartmentID).text;

    return { ...researcher, "Department": department};
  });

  tableContents.value = researchers;
});

async function submit() {
  loading.value = true;
  let postData = selected.value.map(researcher => {
    return researcher.ID;
  });
  try {
    // TODO: For each selected researcher, call the endpoint with their ID
    for (let id of postData) {
      const body = { researcherID: id};
      const response = await fetch(props.endpoint, {method: "POST", body: JSON.stringify(body)});
    
      if (response.status > 300) {
        loading.value = false;
        errorMessage.value = await response.text();
        return false;
      }
    }

    setTimeout(() => loading.value = false, 1000);
    errorMessage.value = "";
    setTimeout(props.refreshTable, 400);
    return true;

  } catch (error) {
    errorMessage.value = error;
    loading.value = false;
    return false;
  }
}

</script>

<template>
  <va-modal 
    ref="modalRef" 
    :model-value="props.modelValue" 
    :before-close="() => $emit('update:modelValue', false)" 
    no-padding
  >
    <template #content="{ ok }">
      <div class="sm:w-[500px] md:w-[600px] md:px-4 lg:w-[700px] lg:px-6">
        <va-card-title>
          <h1 class="text-base">Add Researcher</h1>
        </va-card-title>
        
        <va-card-content class="mt-4">
          <span class="w-full flex justify-center mb-2">
            <va-input
              class="mb-2"
              v-model="searchValue"
              placeholder="Search"
            >
              <template #prependInner>
                <va-icon name="search" style="margin-left: -5px;" />
              </template>
            </va-input>
          </span>
          <va-data-table 
            :items="tableContents" 
            :filter="searchValue"
            :columns="columns"
            :item-size="46"
            virtual-scroller
            sticky-header
            striped
            hoverable
            selectable
            v-model="selected"
            style="height: 400px"
          />
        </va-card-content>

        <span class="flex justify-center text-danger w-full text-center" style="font-size: 18px;">
          {{ errorMessage }}    
        </span>

        <!-- Buttons for submitting and canceling -->
        <va-card-actions align="right">

          <va-button 
            color="danger" 
            preset="primary" 
            icon="clear" 
            :disabled="loading"
            @click="ok"
          >
            Cancel
          </va-button>

          <va-button 
            color="primary" 
            icon="done" 
            :disabled="loading" 
            :loading="loading"
            @click="async () => { 
              if (await submit()) {
                ok();
              }
            }"
          >
            Submit
          </va-button>
        </va-card-actions>
      </div>
    </template>
  </va-modal>
</template>