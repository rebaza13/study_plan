<template>
  <div>
    <!-- App Bar -->
    <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>My study planner</v-app-bar-title>
      </v-app-bar>

    <!-- Page Content -->
    <v-container fluid class="pa-5">
      <v-row justify="center">
        <v-col cols="12">
          <h2 class="text-center text-h4 font-weight-bold mb-5">My Study Planner</h2>
        </v-col>
      </v-row>

      <!-- Courses Section -->
      <v-row justify="start" align="start">
        <v-col v-if="courses.length === 0" cols="12" md="8">
          <v-card class="text-center elevation-2 rounded-lg">
            <v-card-title class="text-h5">No Courses Added Yet</v-card-title>
            <v-card-actions class="justify-center">
              <v-btn color="pink" @click="showAddCourse" large> 
                Add Your First Course
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col v-else v-for="course in Mycourses" :key="course.courseId" cols="12" md="2">
          <v-card class="elevation-3 rounded-lg ">
            <v-img
              :src="course.img"
              height="200px"
              width="100%"
              cover="object-fit"
              class="white--text d-flex align-center justify-center"
            >
            </v-img>

            <v-card-text>
              <p><strong>Name:</strong> {{ course.CourseName }}</p>
              <!-- <p><strong>Credits:</strong> {{ course.credit }}</p> -->
              <!-- <p><strong>Required Credits:</strong> {{ course.requiredCredits }}</p> -->
            </v-card-text>

            <v-card-actions>
  <v-row justify="space-between" class="mr-10 ml-1 mt-4">
   
    <v-btn color="blue darken-2" @click="viewCourseDetails(course)">View Details</v-btn>
    <v-checkbox
    color="blue darken-2"
      label="is Completed"
      v-model="isCompleted"
      @change="handleUpdateCompleted(course.documentId)"
    ></v-checkbox>
  </v-row>
</v-card-actions>


          </v-card>
       
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script setup >
import { ref } from 'vue';
import { useAppStore } from "@/stores/app";
import { useRouter } from 'vue-router';
import { getCollection, updateDocument } from '@/utils/helpers';
const appStore = useAppStore();

const courses = ref([])
const isCompleted = ref(false)
onMounted(async ()=>{
  const sss = await getCollection("studyPlan" );
  courses.value = sss 
  
})
const router = useRouter()

const handleUpdateCompleted = async (val)=>{
   await updateDocument('studyPlan',val,{isCompleted:isCompleted.value})
}
const Mycourses = computed(()=>{

  // @ts-ignore

  return  courses.value.filter((obj)=>{
    isCompleted.value = obj.isCompleted

    return appStore?.user?.uid === obj.userId
  })
})

// Functions for navigation and logout
const showAddCourse = () => {
  console.log('Navigate to Add Course');
};

const viewCourseDetails = (course) => {
  console.log(course)
  localStorage.setItem('courseObj', JSON.stringify(course));
  router.push('/user/CourseDetail')
};

const handleLogout = () => {
  console.log('Logging out...');
  // Implement logout functionality here
};
</script>

<style scoped>
.v-card {
  margin-bottom: 1rem;
  border-radius: 15px;
}

.text-h5 {
  font-size: 1.5rem;
}

.display-1 {
  font-size: 2rem;
}

.elevation-3 {
  box-shadow: 0px 4px 10px rgba(0,0,0,0.2);
}
</style>
