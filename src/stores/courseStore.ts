// store/courseStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
// Ensure db is properly initialized
import { getCollection, setDocumentRandomId } from '@/utils/helpers';
import { AlertsType } from '@/types';
export const useCourseStore = defineStore('course', () => {

  const courses = ref()
  const alert = reactive({
    message:'',
    type: 'success' as AlertsType,
    duration:2000
  })


  const resetAlert = ()=>{alert.message ='',alert.type ='success'}
 const addCourse = async (colectionName:string,data:object)=>{
    try {
      const response =  await setDocumentRandomId(colectionName,data)
      console.log(response)
      alert.message= "Course added successfully"
    } catch(e:any){
        alert.message= "validation  error"
    }
 }

 const getCourses = async()=>{
    const response = await getCollection('courses')
    courses.value= response
 }
  return {
    addCourse, // Returning the function for use in components
    alert,
    resetAlert,
    courses,
    getCourses
  };
});
