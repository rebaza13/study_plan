<template>
    <v-app>
      <v-app-bar>
        <template #prepend>
          <v-avatar size="40">
            <v-img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWQrPRmrxGJOfoQvsJmPNImi_yt5Ux9z05uA&s"
              alt="Avatar"
            />
          </v-avatar>
          <div class="d-flex-col justify-start align-center ga-4 pl-5">
            <p>{{ appStore.user?.email }}</p>
            <p class="" style="font-size: small; color: grey">Course Page</p>
          </div>
        </template>
        <template #append>
          <v-btn @click.prevent="handleLogout" flat small color="red-accent-2">LogOut</v-btn>
        </template>
      </v-app-bar>
   
      <v-main>
        <v-container fluid>
       <v-row align="center" >
        <v-btn class="ma-4" icon @click="goBack">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
         <p v-if="appStore.courseObj" style="font-size: large;">{{ appStore.courseObj.CourseName }}</p>
       </v-row>
          <v-card v-if="course" class="mx-auto" elevation="3">
            <v-img
              :src="course[0].image"
              width="100%"
              :cover="true"
              height="200px"
            ></v-img>
            <v-card-title>
              <h2 class="font-weight-bold">{{ course[0].title }}</h2>
            </v-card-title>
            <v-card-subtitle>
              <p>Description: </p>
            </v-card-subtitle>
            <v-card-text>
              <p>{{ course[0].description }}</p>
            </v-card-text>
          </v-card>
  
          <v-divider></v-divider>
  
          <h3 class="mt-5 mb-4">Chapters</h3>
          <v-row v-if="course">
             <v-col v-for="(chapter, index) in course[0].chapters" :key="index" cols="12"  >
          
              <v-expansion-panels>
  <v-expansion-panel class="w-100" width="100%" elevation="2"
    :title="chapter.title"
    :text=" chapter.description" >
  </v-expansion-panel>
</v-expansion-panels>
            </v-col> 
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </template>
  
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  import { useAppStore } from "@/stores/app";
  import { useRouter } from "vue-router";
  import { auth } from "@/plugins/firebase";
  import { signOut } from "firebase/auth/cordova";
import { getCollection } from '@/utils/helpers';
  
  const goBack = () => {
  router.go(-1);
};


  const appStore = useAppStore();
  const router = useRouter();
  
  const course = ref();
  
  onMounted(async ()=>{
    const response = await getCollection("courses" );
   

    course.value = response.filter((a) => {
   
      const courseId = appStore.courseObj.courseId
  
  
      return courseId === a.documentId;
    });
  })
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };
  </script>