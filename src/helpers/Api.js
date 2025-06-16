import axios from 'axios';


const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});


export const sendDataToServer = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'שגיאה. נסה שוב מאוחר יותר');
    }
};


export const sendDataToServerAdmin = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'שגיאה. נסה שוב מאוחר יותר');
    }
};


export const getDataFromServer = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};


export const getDataFromServerAdmin = async (endpoint) => {
    try {
        const response = await axiosInstance.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};


export const updateDataToServer = async (endpoint, data) => {
    try {
        const response = await axiosInstance.patch(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const updateData = async (endpoint, data) => {
    try {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const deleteData = async (endpoint) => {
    try {
        const response = await axiosInstance.delete(endpoint);
        return response;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const updateFoodToServer = async (endpoint, data) => {
    try {
        const response = await axiosInstance.put(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const getAuthenticatedUser = async () => {
    try {
        const response = await axiosInstance.get('/users/check-auth');
        return response.data;
    } catch (error) {
        return null;
    }
};

export const logout = async () => {
    try {
        await axiosInstance.post('/users/logout');
    } catch (error) {
        console.error('שגיאה ביציאה:', error);
    }
};