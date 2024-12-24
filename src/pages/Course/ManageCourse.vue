<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2"  >
        <template #prepend>
            <v-icon @click="router.go(-1)" >mdi-arrow-left</v-icon>
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
            <v-btn 
                 class="ma-2"
              icon
              color="primary"
              @click="editCourse(item)"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          
            <v-btn
            class="ma-2"
              icon
              color="red"
              @click="deleteCourse(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <template v-slot:no-data>
        
          </template>
        </v-data-table>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useCourseStore } from "@/stores/courseStore"; // Replace with your store path
  import { useRouter } from "vue-router";
  import {deleteItems} from "@/utils/helpers"
  const router =useRouter()
  // Define table headers
  const headers = [
    { title: "Course Name", key: "title" },
    
    // { title: "description", key: "image" },
    { title: "Credits", key: "credit" },
    { title: "Actions", key: "actions", sortable: false },
  ];
  
  // Ref for courses
  const courses = computed(()=>courseStore.courses);
  
  // Load courses from the store
  const courseStore = useCourseStore();
  
  // Edit course
  const editCourse = (course) => {
    courseStore.selectedCourseId = course.documentId
    router.push('/Course/EditCourse')
    // Example: this.$router.push(`/edit-course/${course.id}`);
  };
  
  // Delete course
  const deleteCourse = async (course) => {
    if (confirm(`Are you sure you want to delete the course "${course.title}"?`)) {
      await deleteItems('courses',course.documentId); // Assuming `deleteCourse(id)` removes the course
      loadCourses();
    }
  };
  
  // On component mount
  onMounted(() => {
    courseStore.getCourses();
  });
  </script>


  