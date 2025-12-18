import API from "./authApi";

export const getTeachers = () =>
  API.get("/api/admin/getTeachers");
