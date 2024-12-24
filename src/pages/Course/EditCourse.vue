<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>Update Course</v-app-bar-title>
      </v-app-bar>
  
      <!-- Content -->
      <v-container class="py-4">
        <v-form ref="form" v-model="valid">
          <v-text-field
            label="Course Title"
            v-model="course.title"
            :rules="[v => !!v || 'Title is required']"
            required
          ></v-text-field>
  
          <v-textarea
            label="Description"
            v-model="course.description"
            :rules="[v => !!v || 'Description is required']"
            required
          ></v-textarea>
  
          <v-text-field
            label="Credits"
            v-model="course.credit"
            type="number"
            :rules="[v => !!v || 'Credits are required']"
            required
          ></v-text-field>
  
          <v-text-field
            label="Required Credits"
            v-model="course.requiredCredits"
            type="number"
          ></v-text-field>
  
          <v-text-field
            label="Image URL"
            v-model="course.image"
          ></v-text-field>
  
          <div>
            <h3>Chapters</h3>
            <v-row v-for="(chapter, index) in course.chapters" :key="index" class="mb-4">
              <v-col cols="12">
                <v-textarea
                  label="Chapter Description"
                  v-model="chapter.description"
                  :rules="[v => !!v || 'Chapter description is required']"
                ></v-textarea>
              </v-col>
            </v-row>
          </div>
  
          <v-btn color="primary" @click="updateCourse" :disabled="!valid">
            Update Course
          </v-btn>
        </v-form>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { getDocument } from "@/utils/helpers";
  import { useCourseStore } from "@/stores/courseStore";
  import {updateDocument} from "@/utils/helpers"
  const courseStore = useCourseStore();
  const router = useRouter();
  const valid = ref(false);
  const fetchedCourse = ref();
  const course = ref({
    title: "",
    description: "",
    credit: "",
    requiredCredits: "",
    image: "",
    chapters: [], // Include chapters for editing
  });
  
  // Fetch the course details using the ID from the route
  onMounted(() => {
    setTimeout(async () => {
      try {
        fetchedCourse.value = await getDocument("courses", courseStore.selectedCourseId);
  
        if (fetchedCourse.value) {
          Object.assign(course.value, {
            title: fetchedCourse.value.title || "",
            description: fetchedCourse.value.description || "",
            credit: fetchedCourse.value.credit || "",
            requiredCredits: fetchedCourse.value.requiredCredits || "",
            image: fetchedCourse.value.image || "",
            chapters: fetchedCourse.value.chapters || [],
          });
        } else {
          console.error("Course data not found!");
        }
      } catch (e) {
        console.error("Error fetching course data:", e);
      }
    }, 3000);
  });
  
  // Update the course in Firebase
  const updateCourse = async () => {
    if (!valid.value) return;
     await updateDocument('courses',courseStore.selectedCourseId,course.value)
    // TODO: Write Firebase logic to update the course
    // Example: await updateCourseById(courseStore.selectedCourseId, course.value);
  
    console.log("Updated course:", course.value);
    router.go(-1); // Navigate back after update
  };
  </script>