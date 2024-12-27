<template>
  <div>
    <!-- App Bar -->
    <v-app-bar color="red-accent-2">
      <template #prepend>
        <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
      </template>
      <v-app-bar-title>Add Course to Schedule</v-app-bar-title>
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
          <v-btn color="primary" @click="addToSchedule(item)">Add to Schedule</v-btn>
        </template>
        <template v-slot:no-data>
          <p>No courses available.</p>
        </template>
      </v-data-table>

      <!-- Add to Schedule Confirmation -->
      <v-dialog
        v-model="showDialog"
        max-width="500px"
        persistent
      >
        <v-card v-if="selectedCourse">
          <v-card-title>
            Add Course to Schedule
          </v-card-title>
          <v-card-text>
            <p class="ml-1"><strong>Course Name:</strong> {{ selectedCourse.title }}</p>
            <!-- <p><strong>Course ID:</strong> {{ selectedCourse.courseId }}</p> -->
           <v-row align="center" justify="space-between" class="mt-5 ml-1">
            <p><strong>Credit Required:</strong> {{ selectedCourse.requiredCredits }}</p>
            <p class="ml-6 mr-6 " color="" style="color: red;">your Total Credit is: {{ userTotalCredit }}</p>
           </v-row>
            <!-- <p><strong>Image:</strong> {{ selectedCourse.img }}</p> -->
            <!-- <p><strong>Completed:</strong> {{ selectedCourse.isCompleted }}</p> -->
          </v-card-text>
            <hr class="ma-4">
            <v-card-text>
              <v-img position="right" class="mb-6" :src="selectedCourse.image" width="100%" cover="object-fit" height="150px"></v-img>
              <p><strong>Course Name:</strong> {{ selectedCourse.title }}</p>
              <p class="mt-4"><strong>Course Description:</strong> {{ selectedCourse.description }}</p>
              
            </v-card-text>
          <v-card-actions>
            <v-btn :disabled="userTotalCredit < selectedCourse.requiredCredits" color="green" @click="confirmAddToSchedule">Confirm</v-btn>
            <v-btn color="red" @click="closeDialog">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/courseStore'; // Replace with your store path
import { useRouter } from 'vue-router';
import { updateDocument, setDocumentRandomId, getCollection } from '@/utils/helpers';
import { useAppStore } from '@/stores/app';

const appStore = useAppStore()
const router = useRouter();
const courseStore = useCourseStore();
const selectedCourseId = ref();
const selectedCourseName = ref(null);
const showDialog = ref(false);
const selectedCourse = ref()

const userId = ref()
const userTotalCredit = ref()
const img = ref()
// Define table headers
const headers = [
  { title: "Course Name", key: "title" },
  { title: "Credits", key: "credit" },
  { title: "minimum Credit", key: "requiredCredits" },
  { title: "Actions", key: "actions", sortable: false }
];

// Ref for courses
const courses = computed(() => courseStore.courses);

// Add to Schedule function
const addToSchedule = async (course) => {
  const response =  await checkIfhaveCourse()
  console.log(response)
  
  if(response.length !==0){
    response.forEach((obj)=>{
      if(obj.courseId !== course.documentId){
        selectedCourse.value = {...course}
  selectedCourseId.value = course.documentId;
  selectedCourseName.value = course.title; // Clone the course to avoid direct mutations
  showDialog.value = true;
  img.value = course.image
      } else if(obj.courseId === course.documentId){
        alert('you cant add the course twice')
        showDialog.value = false;
      }
    })
  } else {
   
        selectedCourse.value = {...course}
  selectedCourseId.value = course.documentId;
  selectedCourseName.value = course.title; // Clone the course to avoid direct mutations
  showDialog.value = true;
  img.value = course.image
      
  }
 
};

// Confirm adding to schedule
const confirmAddToSchedule = async () => {
  try {
    await setDocumentRandomId('studyPlan', {

      CourseName: selectedCourseName.value,
      courseId: selectedCourseId.value,
      img: img.value,
      isCompleted:false,
      userId: appStore?.user?.uid
    });
    closeDialog();
    courseStore.getCourses(); // Refresh the courses after addition
  } catch (error) {
    console.error("Error adding to schedule:", error);
  }
};

// Close dialog
const closeDialog = () => {
  showDialog.value = false;
};
const checkIfhaveCourse = ()=>{
  const respones  = getCollection('studyPlan')
return respones
}
onMounted(async () => {
  courseStore.getCourses();
  const response  = await getCollection('users')
  response.filter((obj)=>{
if(    obj.uid === appStore?.user?.uid){
  userId.value =obj.uid
  userTotalCredit.value = obj.totalCredit
}
  })
});
</script>
