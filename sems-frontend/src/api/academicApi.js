import API from './authApi';

export const addAcademicYear=(data) =>
    API.post('/api/admin/addAcademicYear', data);
export const getAcademicYears = () =>
    API.get('/api/admin/getAcademicYears');


export const deleteAcademicYear = (id) =>
  API.delete(`/api/admin/deleteAcademicYear/${id}`);