<script setup>
import { ref, reactive, onMounted } from 'vue';
import { 
  VaModal, VaCardTitle, VaCardContent, VaCardActions, VaButton, VaInput, VaDateInput, VaIcon , VaSelect
} from 'vuestic-ui';

const props = defineProps({
  modelValue: Boolean,
  postEndpoint: String,
  title: String,
  inputs: Object,
  refreshTable: Function
});

defineEmits(["update:modelValue"]);

// title, description, startDate, endDate, budget
// const inputs = ref({
//   title: {type: String, label: "Title"},
//   description: {type: BigInt, label: "Description"},
//   date: {type: Date, label: "Date"},
//   budget: {type: Number, label: "Budget"},
//   department: {
//     type: [
//       { value: 1, text: "Cool department"},
//       { value: 2, text: "Really cool department"}
//     ],
//     label: "Department (Cool Ones Only)"
//   }
// });

const loading = ref(false);

const errorMessage= ref("");

const inputData = reactive({});

onMounted(() => {
  for (let key in props.inputs) {
    inputData[key] = undefined;
  }
});

async function submit() {
  loading.value = true;

  let postData = { ...inputData };

  // Convert any dates to a proper SQL-readable string
  for (let key in postData) {
    let value = postData[key];
    if (value instanceof Date) {
      postData[key] = value.toISOString();
    }
    else if (typeof value === 'object' && value !== null) {
      postData[key] = value.value;
    }
  }

  try {
    const response = await fetch(props.postEndpoint, {method: "POST", body: JSON.stringify(postData)});
    
    if (response.status > 300) {
      loading.value = false;
      errorMessage.value = await response.text();
      return false;
    }
    setTimeout(() => loading.value = false, 1000);
    errorMessage.value = "";
    setTimeout(props.refreshTable, 400);
    return true;

  } catch (error) {
    // TODO: Display error somehow
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
          <h1 class=" text-base">{{ props.title }}</h1>
        </va-card-title>
        
        <va-card-content class="flex flex-col gap-5 w-full mt-8 mb-4">
          <!-- Parsing inputs -->
          <span v-for="(value, key) in props.inputs">
            <va-input 
              v-if="value.type == String" 
              :label="value.label" 
              class="w-full my-2" 
              v-model="inputData[key]" 
            />

            <va-input 
              v-if="value.type == BigInt" 
              :label="value.label" 
              class="w-full my-2" 
              type="textarea"
              :min-rows="3"
              :max-rows="6" 
              v-model="inputData[key]"
            />

            <va-input 
              v-if="value.type == Boolean" 
              :label="value.label" 
              class="w-full my-3" 
              type="email"
              v-model="inputData[key]"
            />

            <va-date-input 
              v-if="value.type == Date" 
              :label="value.label" 
              class="w-full mt-6" 
              v-model="inputData[key]"
              placement="bottom"
            />

            <va-input 
              v-if="value.type == Number" 
              :label="value.label" 
              class="w-full" 
              v-model="inputData[key]"
              mask="numeral"
            >
              <template #prependInner>
              </template>
            </va-input>

            <va-select 
              v-if="Array.isArray(value.type)" 
              :label="value.label" 
              :options="value.type" 
              class="w-full mt-4" 
              v-model="inputData[key]"
              placement="bottom"
            />

          </span>

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