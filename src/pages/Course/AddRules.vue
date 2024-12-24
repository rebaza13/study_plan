<template>
    <div>
      <!-- App Bar -->
      <v-app-bar color="red-accent-2">
        <template #prepend>
          <v-icon @click="router.go(-1)">mdi-arrow-left</v-icon>
        </template>
        <v-app-bar-title>Add Rules</v-app-bar-title>
      </v-app-bar>
  
      <!-- Content -->
      <v-container class="py-4">
        <!-- General Rules -->
        <v-card class="mb-4">
          <v-card-title>General Rules</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(rule, index) in generalRules" :key="index">
                <v-list-item-content>{{ rule }}</v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="removeRule(index, 'general')">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-text-field
              label="Add New Rule"
              v-model="newGeneralRule"
              class="mt-4"
            ></v-text-field>
            <v-btn color="primary" class="mt-2" @click="addRule('general')">
              Add Rule
            </v-btn>
          </v-card-text>
        </v-card>
  
        <!-- Semester Rules -->
        <v-card class="mb-4">
          <v-card-title>Semester Rules</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list>
              <v-list-item v-for="(rule, index) in semesterRules" :key="index">
                <v-list-item-content>{{ rule }}</v-list-item-content>
                <v-list-item-action>
                  <v-btn icon color="red" @click="removeRule(index, 'semester')">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-text-field
              label="Add New Rule"
              v-model="newSemesterRule"
              class="mt-4"
            ></v-text-field>
            <v-btn color="primary" class="mt-2" @click="addRule('semester')">
              Add Rule
            </v-btn>
          </v-card-text>
        </v-card>
  
        <!-- Save Changes Button -->
        <v-btn color="success" class="mt-4" @click="saveRules">Save Changes</v-btn>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { getDocument, updateDocument, getCollection } from "@/utils/helpers"; // Use getCollection
  
  const router = useRouter();
  const generalRules = ref([]);
  const semesterRules = ref([]);
  const newGeneralRule = ref("");
  const newSemesterRule = ref("");
  let documentId = ""; // Dynamically set document ID
  
  // Fetch existing rules from Firebase
  onMounted(async () => {
    try {
      // Fetch the entire collection
      const rulesCollection = await getCollection("Rules_Preferences");
  
      // Check if there are documents and get the first one
      if (rulesCollection.length > 0) {
       
        const firstDocument = rulesCollection[0]; // First document in the collection
        documentId = firstDocument.documentId; // Assuming each document has an `id` field
        console.log(documentId,'hey',firstDocument)
        // Fetch the document data using its ID
        const data = await getDocument("Rules_Preferences", documentId);
        if (data) {
          generalRules.value = data.general_rules || [];
          semesterRules.value = data.semester_rules || [];
        }
      } else {
        console.warn("No documents found in the 'rules' collection.");
      }
    } catch (error) {
      console.error("Error fetching rules:", error);
    }
  });
  
  // Add a new rule
  const addRule = (type) => {
    if (type === "general" && newGeneralRule.value.trim()) {
      generalRules.value.push(newGeneralRule.value.trim());
      newGeneralRule.value = "";
    } else if (type === "semester" && newSemesterRule.value.trim()) {
      semesterRules.value.push(newSemesterRule.value.trim());
      newSemesterRule.value = "";
    }
  };
  
  // Remove a rule
  const removeRule = (index, type) => {
    if (type === "general") {
      generalRules.value.splice(index, 1);
    } else if (type === "semester") {
      semesterRules.value.splice(index, 1);
    }
  };
  
  // Save updated rules to Firebase
  const saveRules = async () => {
    try {
      await updateDocument("Rules_Preferences", documentId, {
        general_rules: generalRules.value,
        semester_rules: semesterRules.value,
      });
      console.log("Rules updated successfully.");
      router.go(-1); // Navigate back after saving
    } catch (error) {
      console.error("Error saving rules:", error);
    }
  };
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  