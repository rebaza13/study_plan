<template>
  <v-app>
    <v-app-bar>
      <template #prepend>
        <!-- Avatar Image -->
        <v-avatar size="40">
          <v-img src="" alt="Avatar" />
        </v-avatar>
        <div class="d-flex-col justify-start align-center ga-4 pl-5">
          <p>Welcome back - {{ appStore.user?.displayName }}</p>
          <p class="" style="font-size: small; color: grey">Role: user</p>
        </div>
      </template>
      <template #append>
        <v-btn @click.prevent="handleLogout" flat small color="red-accent-2">LogOut</v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-book-open-page-variant</v-icon>
                <h3 class="font-weight-bold">View My Study Plan</h3>
                <p>Access and review your current study plan.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange accent-2" to="/user/ViewStudyPlaner">View Plan</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-plus-box</v-icon>
                <h3 class="font-weight-bold">Add Course to the Plan</h3>
                <p>Add new courses to your study schedule.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange accent-2" to="/user/AddCourse">Add Course</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-delete-forever</v-icon>
                <h3 class="font-weight-bold">Remove Course</h3>
                <p>Remove courses that are no longer relevant.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn to="/user/RemoveCourse" color="orange accent-2">Remove Course</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-check-circle</v-icon>
                <h3 class="font-weight-bold">Completed Courses</h3>
                <p>View a list of your successfully completed courses.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange accent-2" to="/user/CompletedCourse">View Courses</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-lightbulb-outline</v-icon>
                <h3 class="font-weight-bold">Recommended Courses</h3>
                <p>View a list of recommended courses.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange accent-2" to="/user/recomendedCourse">View Courses</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" elevation="3">
              <v-card-text class="text-center">
                <v-icon size="60">mdi-cog-outline</v-icon>
                <h3 class="font-weight-bold">Rules and Preferences</h3>
                <p>View a list of rules and preferences.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange accent-2" to="/user/Rules">View Rules</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";
const router = useRouter();
import { auth } from "@/plugins/firebase";
import { signOut } from "firebase/auth";

const appStore = useAppStore();
const loading = ref(false);
const alert = ref({ message: "", type: "" });

const handleLogout = async () => {
  loading.value = true;

  try {
    await signOut(auth); // Logs out the user
    localStorage.clear()
    alert.value = {
      message: "Logged out successfully!",
      type: "success",
    };

    // Redirect to the homepage
    router.push("/");
  } catch (error) {
    console.error("Logout Error:", error);
    alert.value = {
      message: "Failed to log out. Please try again.",
      type: "error",
    };
  } finally {
    loading.value = false;
  }
};
</script>
