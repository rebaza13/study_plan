<template>
    <div>
      <v-alert
        v-if="isVisible"
        :closable="true"
        :type="alert.type"
        border="start"
        border-color="warning"
        elevation="2"
       
      >
     
        {{ alert.message }}
      </v-alert>
    </div>
  </template>
  
  <script setup lang="ts">
  import { AlertsType } from '@/types';
import { watch } from 'vue';
  
  const emit = defineEmits(['close-alert'])

  const isVisible = computed(()=>props.alert.message)
  const props = defineProps<{
    alert: {type:AlertsType,message:string,duration:number}
  }>();
  

  
  // Watch for changes in the `duration` prop and set a timer if it exists
  watch(
    () => props.alert?.message,
    (newDuration) => {
      if (newDuration) {
        setTimeout(() => {
         emit('close-alert',true)
       
        }, props.alert?.duration);
      }
    },
    {immediate:true}
  );
  </script>
  