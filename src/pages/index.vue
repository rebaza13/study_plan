<template>
  <div class="d-flex h-screen overflow-hidden relative">
    <Alert :alert="appStore.alert" @close-alert="()=>appStore.resetAlert()"  class=" alert"></Alert>

    <!-- Left Side: Image -->
    <div
      class="d-md-flex d-none align-center flex-column justify-center bg_login"
      style="width: 50%"
    >
      <div class="img_bg">
        <img src="/images/logn_img.png" alt="Image" class="img" />
      </div>
      <h3 style="color: white" class="text-h4 mt-4">My Study Planner</h3>
    </div>

    <!-- Right Side: Form -->
    <v-main
      style="width: 50%; height: 100%"
      class="d-flex flex-column align-center justify-center"
    >
      <h1 class="text-h3">Login</h1>

      <v-form
        ref="form1"
        class="mt-8"
        @submit.prevent="submit"
        style="width: 100%; max-width: 400px"
      >
        <v-text-field
          v-model="email"
          clearable
          label="Email"
          :rules="emailRule"
          prepend-icon="mdi-account"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-text-field
          v-model="password"
          clearable
          :rules="passwordRule"
          label="Password"
          :counter="10"
          prepend-icon="mdi-lock"
          type="password"
          variant="outlined"
          class="mb-4"
        ></v-text-field>

        <v-btn :loading="appStore.loading" class="mt-4" height="56" block color="red-accent-2" type="submit"
          >Login</v-btn
        >
        <div class="mt-4"></div>
        <button @click="router.push('/Register')" type="button" class="text-h7 text-red">new user ?</button>
        <div class="d-flex align-center ga-4" style="width: 100%">
          <hr class="flex-grow-1" />
        
          <h5 style="font-weight: 700" class="text-h6">
            Login
            <span class="text-grey-darken-1" style="font-weight: 400">
              With Others
            </span>
          </h5>
          <hr class="flex-grow-1" />
        </div>
        <v-btn
          color="bg-white mt-4"
          block
          prepend-icon="mdi-google"
          height="50"
        >
          <template v-slot:prepend>
            <v-icon  color="red-lighten-2" size="24"></v-icon>
          </template>
          Google
        </v-btn>
      </v-form>
    </v-main>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAppStore } from "@/stores/app";
import { useRouter } from "vue-router";
// Define refs for form and input values
const form1 = ref(null);
const email = ref("");
const password = ref("");
const router = useRouter()
const appStore = useAppStore()
// Rules for validation
const emailRule = [
  (value: string) => !!value || "You must enter your email address",
];

const passwordRule = [
  (value: string) => !!value || "You must enter your password",
  (value: string) =>
    value.length <= 10 || "You cannot enter more than 10 characters",
];

// Submit function to validate the form
const submit = async () => {
  // @ts-ignore
  const valid = await form1.value?.validate();
  console.log(valid, "d");
  if (valid.valid) {

    appStore.signIn(email.value,password.value)
  } else {

  }
};
// watcher

watch(()=>appStore.user,(val)=>{
  if(val && val !=null){
    router.push('/Home')
  }
})
</script>

<style scoped>
.alert {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  max-width: calc(100% - 44px); /* Account for the margin on both sides */
  margin: 10px 22px;
}
.bg_login {
  background: linear-gradient(
      45deg,
      #e34646 10%,
      transparent 11%,
      transparent 89%,
      #e34646 90%
    ),
    linear-gradient(
      135deg,
      #e34646 10%,
      transparent 11%,
      transparent 89%,
      #e34646 90%
    ),
    radial-gradient(circle, transparent 25%, #b00000 26%),
    linear-gradient(
      45deg,
      transparent 46%,
      #e34646 47%,
      #e34646 52%,
      transparent 53%
    ),
    linear-gradient(
      135deg,
      transparent 46%,
      #e34646 47%,
      #e34646 52%,
      transparent 53%
    );
  background-size: 5em 5em;
  background-color: #b00000;
}

hr {
  border: 1px solid rgba(105, 105, 105, 0.61);
}
.img_bg {
  position: relative;
  background-color: rgba(255, 255, 255, 0.486);
  border: 1px solid;
  border-radius: 10px !important;
  width: 460px;
  height: 450px;
  border-color: rgba(255, 255, 255, 0.514);
  backdrop-filter: blur(5px);
  box-shadow: 1px -1px 2px 0px white;
}
img {
  position: absolute;
  bottom: -20px;
  left: 0;
  height: auto;
  width: 420px;
}
</style>
