import API from "./authApi";  // reuse same axios instance

export const addSubject = (data) =>
   API.post("/api/admin/addSubject", data);


