import API from "./authApi";  // reuse same axios instance

export const addStudent = (data) =>
   API.post("/api/teacher/students/add", data);
