<template>
  <div class="h-100 pt-10" width="100%"  style="background-color: #f0f0f0;">
    <v-app-bar>
      <template #prepend>
        <!-- Avatar Image -->
        <v-avatar size="40">
          <v-img
          src="https://wallpapers.com/images/hd/green-tribal-dragon-best-hd-rpxv86zlxujsphzo.jpg"
            alt="Avatar"
          />
        </v-avatar>
        <div class="d-flex-col justify-start align-center ga-4 pl-5">
          <p>Welcome back Admin</p>
          <p class="" style="font-size: small; color: grey">role: admin</p>
        </div>
      </template>
      <template #append>
        <v-btn @click.prevent="handleLogout" flat small color="red-accent-2">LogOut</v-btn>
      </template>
    </v-app-bar>
    <v-row justify="center">
      <v-col cols="5">
        <v-card class="d-flex flex-column position-reative" height="220px">
          
          
          <template #append>
            <v-icon icon="mdi-plus" color="white" class="mt-atuo" style="z-index: 10;"></v-icon>
          </template>
          <img
            class="position-absolute top-0 left-0"
            src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
            alt=""
            style="width: 100%; height: 185px; object-fit: cover"
          />

          <v-btn @click.prevent="router.push('/Course/addCourse')"  variant="text" :flat="true"  color="red-accent-2" location="bottom" class="mt-auto">Add Course</v-btn>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card class="d-flex flex-column position-reative" height="220px">
          
          
          <template #append>
            <v-icon icon="mdi-cog" color="white" class="mt-atuo" style="z-index: 10;"></v-icon>
          </template>
          <img
            class="position-absolute top-0 left-0"
            src="https://e0.pxfuel.com/wallpapers/930/118/desktop-wallpaper-fantasy-planet-blue-cloud-tree-stars-starry-sky-artistic-purple.jpg"
            alt=""
            style="width: 100%; height: 185px; object-fit: cover"
          />

          <v-btn @click.prevent="router.push('/Course/ManageCourse')"  variant="text" :flat="true"  color="red-accent-2" location="bottom" class="mt-auto">Manage Courses</v-btn>
        </v-card>
    
      </v-col>

    </v-row>
    <v-row justify="center">
      <v-col cols="5">
        <v-card class="d-flex mt-4 flex-column position-reative" height="220px">
          
          
          <template #append>
            <v-icon icon="mdi-cog" color="white" class="mt-atuo" style="z-index: 10;"></v-icon>
          </template>
          <img
            class="position-absolute top-0 left-0"
            src="https://png.pngtree.com/thumb_back/fw800/background/20240731/pngtree-world-best-for-mobile-hd-wallpapers-pxfuel-pictures-image_16119777.jpg"
            alt=""
            style="width: 100%; height: 185px; object-fit: cover"
          />

          <v-btn @click.prevent="router.push('/Course/RecomendedCourse')"  variant="text" :flat="true"  color="red-accent-2" location="bottom" class="mt-auto">Recomend Courses</v-btn>
        </v-card>
       
      </v-col>
      <v-col cols="5">
        <v-card class="d-flex mt-4 flex-column position-reative" height="220px">
          
          
          <template #append>
            <v-icon icon="mdi-cog" color="white" class="mt-atuo" style="z-index: 10;"></v-icon>
          </template>
          <img
            class="position-absolute top-0 left-0"
            src="https://www.pixelstalk.net/wp-content/uploads/images6/Cool-Minimalist-Wallpaper-4K-HD.jpg"
            alt=""
            style="width: 100%; height: 185px; object-fit: cover"
          />

          <v-btn @click.prevent="router.push('/Course/AddRules')"  variant="text" :flat="true"  color="red-accent-2" location="bottom" class="mt-auto">Add rules</v-btn>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
//
import { auth } from "@/plugins/firebase";
import { useAppStore } from "@/stores/app";
import { signOut } from "firebase/auth/cordova";
import { useRouter } from "vue-router";
const appStore = useAppStore();
const router = useRouter();

onBeforeMount(()=>{
  if (appStore.isUser) {
  
    router.replace('/user/Home'); // Redirect to user-specific home route
  } else {

    router.replace('/Home'); // Redirect to general home route
  }
})
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
<style>
.index {
  z-index: 10;
}
</style>
