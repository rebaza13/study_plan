<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>Manage Courses</v-app-bar-title>
      </v-app-bar>
  
      <!-- Content -->
      <v-container class="py-4">
        <!-- Courses Table -->
        <v-data-table
          :headers="headers"
          :items="courses"
          class="elevation-2"
          item-value="title"
          dense
          hide-default-footer
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Courses</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn color="primary" @click="editCourse(item)">Edit Recommended</v-btn>
          </template>
          <template v-slot:no-data>
            <p>No courses available.</p>
          </template>
        </v-data-table>
  
        <!-- Edit Recommended Status Form -->
        <v-expand-transition>
          <div v-if="selectedCourse" class="mt-4">
            <v-card class="pa-4">
              <v-card-title>Edit Recommended Status</v-card-title>
              <v-form>
                <v-text-field
                  v-model="selectedCourse.title"
                  label="Course Title"
                  readonly
                ></v-text-field>
                <v-select
                  v-model="selectedCourse.recommended"
                  :items="['true', 'false']"
                  label="Recommended"
                  required
                ></v-select>
                <v-btn
                  color="success"
                  class="mt-4"
                  @click="updateRecommended"
                >
                  Update
                </v-btn>
                <v-btn
                  color="red"
                  class="mt-4 ml-2"
                  @click="cancelEdit"
                >
                  Cancel
                </v-btn>
              </v-form>
            </v-card>
          </div>
        </v-expand-transition>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useCourseStore } from "@/stores/courseStore"; // Replace with your store path
  import { useRouter } from "vue-router";
  import { updateDocument } from "@/utils/helpers";

  const router = useRouter();
  const courseStore = useCourseStore();
  const selectedCourseId = ref()
  // Define table headers
  const headers = [
    { title: "Course Name", key: "title" },
    { title: "Credits", key: "credit" },
    { title: "Recommended", key: "recommended" },
    { title: "Actions", key: "actions", sortable: false },
  ];
  
  // Ref for courses
  const courses = computed(() => courseStore.courses);
  
  // Selected course for editing
  const selectedCourse = ref(null);
  
  // Edit course function
  const editCourse = (course) => {
    selectedCourseId.value = course.documentId
    selectedCourse.value = { ...course }; // Clone the course to avoid direct mutations
  };
  
  // Update recommended status
  const updateRecommended = async () => {
    // Call Firebase or store update logic here
    // Example: courseStore.updateCourse(selectedCourse.value);
    try {
     await updateDocument('courses', selectedCourseId.value, selectedCourse.value);
    // console.log("Course updated successfully",courseStore.courses);
    cancelEdit(); // Reset the form
    courseStore.getCourses()
  } catch (error) {
    console.error("Error updating course:", error);
    // Handle error, display a notification or message
  }
};
 
  
  // Cancel editing
  const cancelEdit = () => {
    selectedCourse.value = null;
  };
  onMounted(() => {
    courseStore.getCourses();
  });
  </script>
  