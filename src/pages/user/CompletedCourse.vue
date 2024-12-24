<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>Study Plan Courses</v-app-bar-title>
      </v-app-bar>
  
      <!-- Content -->
      <v-container class="py-4">
        <!-- Courses Table -->
        <v-data-table
    :headers="headers"
    :items="myCourses"
    class="elevation-2"
    dense
    hide-default-footer
  >
    <!-- Custom row template for the image -->
    <template v-slot:item.img="{ item }">
      <v-img :src="item.img" max-width="100" max-height="100" aspect-ratio="1"></v-img>
    </template>

    <!-- Conditional rendering for the 'isCompleted' column -->
    <template v-slot:item.isCompleted="{ item }">
      <span>{{ item.isCompleted ? "Yes" : "No" }}</span>
    </template>
  </v-data-table>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getCollection } from "@/utils/helpers";
  import { useRouter } from "vue-router";
  import { useAppStore } from "@/stores/app";
  
  const appStore = useAppStore();
  const router = useRouter();
  const myCourses = ref([]);
  const userId = appStore.user?.uid;
  
  // Define table headers
  const headers = [
    { title: "Course Name", value: "CourseName" },
    { title: "Image", value: "img" },
    { title: "Completed", value: "isCompleted" },
  ];
  
  // Fetch and filter courses on mount
  onMounted(async () => {
    const response = await getCollection("studyPlan");
  
    // Filter the response for matching conditions
    myCourses.value = response.filter((a) => {
      const isCompleted = a.isCompleted === true;
      const matchesUserId = appStore.user?.uid === a.userId;
  
      console.log({
        appStoreUserId: appStore.user?.uid,
        courseUserId: a.userId,
        isCompleted,
        matchesUserId,
        shouldInclude: matchesUserId && isCompleted,
      });
  
      return matchesUserId && isCompleted;
    });
  
    console.log("Filtered courses:", myCourses.value);
  });
  </script>
  