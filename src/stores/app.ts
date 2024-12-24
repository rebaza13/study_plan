// Utilities
import { defineStore } from 'pinia'
import {auth, db} from "@/plugins/firebase"
import { createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut,User  } from 'firebase/auth/cordova'
import { AlertsType } from '@/types'
import { doc, setDoc } from 'firebase/firestore'
import { updateProfile } from "firebase/auth";



export const useAppStore = defineStore('app',()=>{
  // @ts-ignore
  const user = ref<User |any >(JSON.parse(localStorage.getItem('userQ')))
  const loading = ref(false)
  const alert = reactive({
    message:'',
    type: 'success' as AlertsType,
    duration:2000
  })
  // methods

  onAuthStateChanged(auth, (currentUser: User | null) => {
    if (currentUser) {
      user.value = currentUser // Set user if there is an existing session
  

    } else {
      user.value = null // Clear user if not logged in
    }
  })

  const register = async (email: string, password: string) => {
    loading.value = true;
    try {
      // Register the user with Firebase Authentication
      const response = await createUserWithEmailAndPassword(auth, email, password);
      user.value = response?.user;
     await updateProfile(user.value, {
    
        photoURL: "user"
      }).then((a) => {
        console.log(a)
        
        // Profile updated!
        // ...
      }).catch((error) => {
        console.log(error)
        // An error occurred
        // ...
      });
  // Stringifying the `user.value` object and storing it
localStorage.setItem('userQ', JSON.stringify(user.value));

      // Save user data to Firestore with their UID
      const userRef = doc(db, "users", user.value.uid); // 'users' is your Firestore collection
      await setDoc(userRef, {
        uid: user.value.uid,
        email: user.value.email,
        role:'user',
        createdAt: new Date().toISOString(),
      });
  
      console.log(response);
  
    
    } catch (error: any) {
    
    } finally {
      loading.value = false;
    }
  };
  const signIn = async(email:string,password:string)=>{
    loading.value = !loading.value
    try {
      const response = await signInWithEmailAndPassword(auth,email,password)
      user.value = response?.user
      console.log(response)
      loading.value = !loading.value
      alert.message = 'Loged In Successfuly'
      alert.type = 'success'
    } catch(error:any){
      loading.value = !loading.value

       alert.message = getFirebaseErrorMessage(error.code)
      alert.type = 'error'
    }
  }
  const SOut = async()=>{
    loading.value = !loading.value
    try {
      // @ts-ignore
      const response = await signOut(auth)
      console.log(response)
      alert.message = 'Logged Out'
      alert.type = 'warning'
    } catch(error:any){
      loading.value = !loading.value
      alert.type = 'error'
    }
  }

const resetAlert = ()=>{alert.message ='',alert.type ='success'}


const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already in use. Please try another email.'
    case 'auth/invalid-email':
      return 'The email address is not valid.'
    case 'auth/operation-not-allowed':
      return 'Email/password accounts are not enabled.'
    case 'auth/weak-password':
      return 'The password is too weak. Please enter a stronger password.'
    default:
      return 'An unexpected error occurred. Please try again.'
  }
}


  return {register,loading,user,resetAlert,alert,signIn,SOut}
})
