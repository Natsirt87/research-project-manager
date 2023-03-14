<script setup>
import { ref } from 'vue';
import { VaModal, VaCardTitle, VaCardContent, VaCardActions, VaButton, VaIcon } from 'vuestic-ui/web-components';

const props = defineProps({
  modelValue: Boolean,
  deleteEndpoint: String,
  deleteBody: Object,
  title: String,
  message: String,
  onDelete: Function
})

const error = ref("");
const loading = ref(false);
const modalRef = ref(null);

async function deleteElement() {
  loading.value = true;
  try {
    const response = await fetch(props.deleteEndpoint, {method: "Delete", body: JSON.stringify(props.deleteBody)});
    console.log(await response.text());

    if (response.status > 300) {
      loading.value = false;
      errorMessage.value = await response.text();
      return false;
    }

    setTimeout(() => loading.value = false, 1000);

    if (props.onDelete) {
      setTimeout(props.onDelete, 500);
    }
    modalRef.value.hide();
    return true;
  } catch (error) {
    error.value = error;
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
    <template #content="{ cancel }">
      <va-card-title>
        <h1 class=" text-base">{{ props.title }}</h1>
      </va-card-title>
      
      <va-card-content>
        <p>
          {{ props.message }}
        </p>
      </va-card-content>

      <span class="text-danger w-full text-center" style="font-size: 18px;">
        <p>{{ error }}</p>
      </span>

      <!-- Buttons for submitting and canceling -->
      <va-card-actions align="right">

        <va-button 
          color="primary" 
          preset="primary" 
          icon="clear" 
          :disabled="loading"
          @click="cancel"
        >
          Cancel
        </va-button>

        <va-button 
          color="danger" 
          icon="done" 
          :disabled="loading" 
          :loading="loading"
          @click="deleteElement"
        >
          Continue
        </va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>