import API from './authApi';

export const addTerm=(data) =>
    API.post('/api/admin/addTerm', data);

export const getTerms = () =>
  API.get("/api/admin/getTerms");