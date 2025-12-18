import API from "./authApi";

// CREATE (already exists)
export const addClass = (data) => API.post("/api/admin/addClass", data);

// READ (admin)
export const getAllClasses = () => API.get("/api/admin/classes");

// READ (by academic year + category)
export const getClassesByYearAndCategory = (academicYearId, categoryId) =>
  API.get("/api/admin/classes/filter", {
    params: { academicYearId, categoryId },
  });

