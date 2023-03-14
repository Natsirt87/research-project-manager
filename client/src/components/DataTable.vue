<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { VaDataTable, VaButton, VaIcon, VaProgressCircle, VaInput } from 'vuestic-ui/web-components';
import DeleteWarning from './DeleteWarning.vue';
import CreateElement from './CreateElement.vue';

const props = defineProps({
  title: String,
  endpoint: String,
  columns: Array,
  height: String,
  readOnly: Boolean,
  removeTitle: String,
  removeMessage: String,
  onRowClick: Function,
  onAdd: Function
});

const tableContents = ref();
const searchValue = ref("");
const deleteWarning = ref(false);

async function refreshData() {
  tableContents.value = null;
  deleteWarning.value = false;

  const { body } = await (await fetch(props.endpoint)).json();
  const mappedBody = body.map((value) => { 
    const mappedValue = {};
    
    for (let key in value) {

      const keyColumn = props.columns.find(element => element.fromKey === key);
      if (keyColumn != undefined) {
        const mappedKey = keyColumn.key;
        let mappedColumnValue = value[key];

        if (!mappedColumnValue) {
          mappedColumnValue = "~"
        }
        else if (keyColumn.type === "Percent") {
          mappedColumnValue += "%";
        }
        else if (keyColumn.type === "Money" && mappedColumnValue) {
          mappedColumnValue = "$" + mappedColumnValue;
        }
        else if (keyColumn.type === "Date" && mappedColumnValue) {
          mappedColumnValue = new Date(mappedColumnValue).toLocaleDateString();
        }

        mappedValue[mappedKey] = mappedColumnValue;
      }
      else {
        console.log("Unmapped key: " + key);
        mappedValue[key] = value[key];
      }
    }
    mappedValue["ID"] = value["ID"];
    return mappedValue; 
  });
  
  tableContents.value = mappedBody;
}

onMounted(() => {
  if (props.readOnly) {
    props.columns.pop();
  }
  refreshData();
});
</script>

<template>
  
  <!-- Data table -->
  <h1 class="mb-4 text-xl font-bold">{{ props.title }}</h1>
  <div class="w-full flex justify-center">
    <span>
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

    <span v-if="!props.readOnly">
      <va-button 
        class="mx-1"
        icon="add" 
        color="success" 
        style="margin-top: -0.5px; max-height: 4px !important;"
        @click="() => onAdd(refreshData)"
      >
        Add
      </va-button>
    </span>
  </div>
  <div class="mx-4 border-2 border-light rounded-[4px]" :style="`height: ${props.height};`">
    <va-data-table
      v-if="tableContents != null"
      :items="tableContents"
      :filter="searchValue"
      :columns="props.columns"
      :item-size="46"
      virtual-scroller
      sticky-header
      striped
      :clickable="props.onRowClick != undefined"
      hoverable
      @row:click="props.onRowClick"
      :style="`height: ${props.height};`"
    >
      <template v-if="!props.readOnly" #cell(actions)="{ rowIndex }">
        <va-button class="mt-2 rounded-lg" color="danger" @click="() => deleteWarning = !deleteWarning">
          Remove
        </va-button> 
        <delete-warning 
          v-model="deleteWarning" 
          :delete-endpoint="props.endpoint"
          :delete-body="{ ID: tableContents[rowIndex].ID }"
          :title="props.removeTitle"
          :message="props.removeMessage"
          :on-delete="refreshData"
        />
      </template>
    </va-data-table>
    <va-progress-circle v-else indeterminate class="mx-auto" :style="`margin-top: calc((${props.height} / 2) - 25px)`"/>
  </div>
</template>

