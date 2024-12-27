<template>
  <div>
    <!-- Alert -->
    <Alert :alert="courseStore.alert" @close-alert="()=>courseStore.resetAlert()" class="alert"></Alert>

    <!-- App Bar -->
    <v-app-bar color="red-accent-2">
      <template #prepend>
        <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
      </template>
      <v-app-bar-title>Add Course to the system</v-app-bar-title>
    </v-app-bar>

    <!-- Content -->
    <v-container class="py-4" style="height: 100vh;">
      <v-form @submit.prevent="handleSubmit" ref="form">
        <v-text-field
          label="Title"
          v-model="course.title"
          :rules="[v => !!v || 'Title is required']"
          required
        ></v-text-field>

        <v-text-field
          label="Image URL"
          v-model="course.image"
          clearable
        ></v-text-field>

        <v-text-field
          label="Description"
          v-model="course.description"
          clearable
          :rules="[v => !!v || 'Description is required']"
          required
        ></v-text-field>

        <v-text-field
          label="Minimum Credit"
          v-model="course.requiredCredits"
          clearable
        ></v-text-field>

        <v-text-field
          label="Credit"
          v-model="course.credit"
          clearable
        ></v-text-field>

        <v-btn @click="addChapter" type="button" color="red-lighten-2" variant="text">
          Add More Chapter
        </v-btn>

        <div>
          <h3>Chapters</h3>
          <v-row v-for="(chapter, index) in course.chapters" :key="index" class="mb-4">
            <v-col cols="12">
              <v-text-field
                label="Chapter Title"
                v-model="chapter.title"
                variant="solo-filled"
                :rules="[v => !!v || 'Chapter title is required']"
                required
              ></v-text-field>
              <v-textarea
                label="Chapter Description"
                v-model="chapter.description"
                rows="3"
                :rules="[v => !!v || 'Chapter description is required']"
                required
              ></v-textarea>
            </v-col>
          </v-row>
        </div>

        <v-btn type="submit" :disabled="!formIsValid" class="w-100" color="red-accent-2">
          Submit
        </v-btn>
      </v-form>
    </v-container>
  </div>
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
  credit:0,
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
    credit:course.value.credit,
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
      credit:0,
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
