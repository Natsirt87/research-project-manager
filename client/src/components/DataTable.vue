<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { VaDataTable, VaButton, VaIcon, VaProgressCircle } from 'vuestic-ui/web-components';

const props = defineProps({
  getEndpoint: String,
  columns: Array,
  height: String,
  readOnly: Boolean,
  deleteEndpoint: String,
  createEndpoint: String
});

const tableContents = ref();
const searchValue = ref("");

const testHeight = "400px";


async function refreshData() {
  tableContents.value = null;

  const { body } = await (await fetch(props.getEndpoint)).json();
  const mappedBody = body.map((value) => { 
    const mappedValue = {};
    
    for (let key in value) {

      const keyColumn = props.columns.find(element => element.fromKey === key);
      if (keyColumn != undefined) {
        const mappedKey = keyColumn.key;
        let mappedColumnValue = value[key];

        if (keyColumn.type === "Percent") {
          mappedColumnValue += "%";
        }
        else if (keyColumn.type === "Money") {
          mappedColumnValue = "$" + mappedColumnValue;
        }
        else if (keyColumn.type === "Date") {
          mappedColumnValue = new Date(mappedColumnValue).toLocaleDateString();
        }

        mappedValue[mappedKey] = mappedColumnValue;
      }
      else {
        console.log("Unmapped key: " + key);
        mappedValue[key] = value[key];
      }
    }
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
      hoverable
      :style="`height: ${props.height};`"
    >

    </va-data-table>

    <va-progress-circle v-else indeterminate class="mx-auto" :style="`margin-top: calc((${props.height} / 2) - 25px)`"/>
  </div>

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
  style="height: 100%"
>
  <template #cell(actions)="{ rowIndex }">
    {{ projectData[rowIndex].ID }}
    <va-button>Test</va-button>
  </template>
</va-data-table> -->

</template>

