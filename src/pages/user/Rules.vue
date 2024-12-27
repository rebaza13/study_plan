<template>
    <v-app>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>University Rules</v-app-bar-title>
      </v-app-bar>
  
      <!-- Content -->
      <v-container class="py-4">
        <v-card class="elevation-2 mt-16">
          <v-card-title>
            <h2>General Rules</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(rule, index) in generalRules" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ rule }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
  
        <v-divider class="my-4"></v-divider>
  
        <v-card class="elevation-2">
          <v-card-title>
            <h2>Semester Rules</h2>
          </v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item-group>
                <v-list-item v-for="(rule, index) in semesterRules" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ rule }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card-text>
        </v-card>
      </v-container>
    </v-app>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { db } from '@/plugins/firebase'; // Adjust the import based on your Firebase setup
  import { collection, getDocs } from 'firebase/firestore';
  
  const router = useRouter();
  const generalRules = ref([]);
  const semesterRules = ref([]);
  
  const fetchRules = async () => {
    try {
      const rulesCollection = collection(db, 'Rules_Preferences');
      const rulesSnapshot = await getDocs(rulesCollection);
      
      rulesSnapshot.forEach((doc) => {
        const data = doc.data();
        generalRules.value = data.general_rules || [];
        semesterRules.value = data.semester_rules || [];
      });
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  };
  
  onMounted(() => {
    fetchRules();
  });
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>