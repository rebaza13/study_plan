<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>Remove Course from Schedule</v-app-bar-title>
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
            <v-btn color="red" @click="removeFromSchedule(item)">Remove from Schedule</v-btn>
          </template>
          <template v-slot:no-data>
            <p>No courses available.</p>
          </template>
        </v-data-table>
  
        <!-- Remove from Schedule Confirmation -->
        <v-dialog
          v-model="showDialog"
          max-width="500px"
          persistent
        >
          <v-card v-if="selectedCourse">
            <v-card-title>
              Remove Course from Schedule
            </v-card-title>
            <v-card-text>
              <p><strong>Course Name:</strong> {{ selectedCourse.title }}</p>
              <p><strong>Course ID:</strong> {{ selectedCourse.courseId }}</p>
              <p><strong>Credit Required:</strong> {{ selectedCourse.requiredCredits }}</p>
              <v-img position="right" class="mb-6" :src="selectedCourse.image" width="100%" cover="object-fit" height="150px"></v-img>
              <p class="mt-4"><strong>Course Description:</strong> {{ selectedCourse.description }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green" @click="confirmRemoveFromSchedule">Confirm</v-btn>
              <v-btn color="red" @click="closeDialog">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useCourseStore } from '@/stores/courseStore'; // Replace with your store path
  import { useRouter } from 'vue-router';
  import { deleteItems, getCollection } from '@/utils/helpers'; // Assume you have a helper function to delete documents
  import { useAppStore } from '@/stores/app';
  
  const appStore = useAppStore();
  const router = useRouter();
  const courseStore = useCourseStore();
  const selectedCourseId = ref();
  const showDialog = ref(false);
  const selectedCourse = ref();
  const selectedStudyPlanId = ref()
  // Define table headers
  const headers = [
    { title: "Course Name", key: "title" },
    { title: "Credits", key: "credit" },
    { title: "Minimum Credit", key: "requiredCredits" },
    { title: "Actions", key: "actions", sortable: false }
  ];
  
  // Ref for courses
  const courses = computed(() => {
    let list =[]
    if(myStudy.value){
        myStudy.value.forEach((obj,index)=>{
          courseStore.courses.filter((a)=>{
           console.log( )
           if(a.documentId == obj.courseId) {list.push(a)

            selectedStudyPlanId.value = obj.documentId
           }
          })
        })

        return list
    }
  });
  const myStudy =ref([])
  // Remove from Schedule function
  const removeFromSchedule = (course) => {
    selectedCourse.value = { ...course };
    selectedCourseId.value = course.documentId;
    showDialog.value = true;
  };
  
  // Confirm removing from schedule
  const confirmRemoveFromSchedule = async () => {
    try {
      await deleteItems('studyPlan', selectedStudyPlanId.value); // Assuming you have a function to delete the document
      closeDialog();
      const response = await getCollection('studyPlan')
    console.log(response)
    await courseStore.getCourses();
        window.location.reload()
    } catch (error) {
      console.error("Error removing from schedule:", error);
    }
  };
  
  // Close dialog
  const closeDialog = () => {
    showDialog.value = false;
  };
  
  onMounted(async () => {
    const response = await getCollection('studyPlan')
    console.log(response)
    await courseStore.getCourses();

    myStudy.value = response
  });
  </script>