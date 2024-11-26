<template>
  <Alert :alert="courseStore.alert" @close-alert="()=>courseStore.resetAlert()" class=" alert"></Alert>

  <v-container class="" style="height: 100vh;">
    <v-app-bar scroll-behavior="fade-image" color="red-accent-1">
      <v-app-bar-title class="text-white">Add Course</v-app-bar-title>
      <template #prepend>
        <v-icon @click.prevent="router.go(-1)" icon="mdi-arrow-left" color="white"></v-icon>
      </template>
      <!-- <template #image>
        <img style="object-fit: cover; width: 100%;" src="https://png.pngtree.com/thumb_back/fh260/background/20210401/pngtree-abstract-asymmetry-simple-education-planners-image_602257.jpg" alt="">
      </template> -->
    </v-app-bar>

    <v-form @submit.prevent="handleSubmit" ref="form">
      <v-text-field v-model="course.title" clearable label="Title" variant="solo-filled"></v-text-field>
      <v-text-field v-model="course.image" clearable label="Image url" variant="solo-filled"></v-text-field>
      <v-text-field v-model="course.description" clearable label="Description" variant="solo-filled"></v-text-field>
      <v-text-field v-model="course.requiredCredits" clearable label="Minimum Credit" variant="solo-filled"></v-text-field>

      <v-btn @click="addChapter" type="button" color="red-lighten-2" variant="text">Add more chapter</v-btn>
      
      <v-list v-for="(chapter, index) in course.chapters" :key="index">
        <v-list-item>
          <v-text-field
            variant="solo-filled"
            v-model="chapter.title"
            label="Chapter Title"
            required
          />
          <v-textarea
            variant="solo-filled"
            v-model="chapter.description"
            label="Chapter Description"
            rows="3"
            required
          />
        </v-list-item>
      </v-list>

      <v-btn type="submit" :disabled="!formIsValid" class="w-100 mb-8" color="red-accent-2">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCourseStore } from '@/stores/courseStore';
import { useRouter } from 'vue-router';

const router = useRouter();
const courseStore = useCourseStore();

// Define course data
const course = ref({
  title: '',
  image: null,
  description: '',
  chapters: [{ title: '', description: '' }],
  requiredCredits: 1,
});

// Ref for form validation
const form = ref(null);

// Computed property for form validation
const formIsValid = computed(() => {
  return (
    course.value.title &&
    course.value.image &&
    course.value.description &&
    course.value.requiredCredits &&
    course.value.chapters.every(
      (chapter) => chapter.title && chapter.description
    )
  );
});

// Function to add a chapter (only modifies the local course object)
const addChapter = () => {
  course.value.chapters.push({ title: '', description: '' });
};

// Handle the form submission (push data to Firebase)
const handleSubmit = async () => {
  const courseData = {
    title: course.value.title,
    image: course.value.image,
    description: course.value.description,
    chapters: course.value.chapters,
    requiredCredits: course.value.requiredCredits,
  };

  try {
    // Call the addCourse function from the store to push data to Firebase
    await courseStore.addCourse('courses', courseData);

    // Reset form after successful submission
    course.value = {
      title: '',
      image: null,
      description: '',
      chapters: [{ title: '', description: '' }],
      requiredCredits: 1,
    };
    alert('Course added successfully!');
    router.go(-1); // Navigate back after successful submission
  } catch (error:any) {
    alert('Error adding course: ' + error.message);
  }
};
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: 0 auto;
}
</style>
