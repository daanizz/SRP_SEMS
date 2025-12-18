import API from './authApi';

export const addCategory=(data) =>
    API.post('/api/admin/addCategory', data);
export const getCategories = () =>
    API.get('/api/admin/getCategories');