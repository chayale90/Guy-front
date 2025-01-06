import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseURL = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});



export const sendDataToServer = async (endpoint, data) => {
    try {
        const response = await axiosInstance.post(endpoint, data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error occurred');
    }
};

export const sendDataToServerAdmin = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            throw new Error('No Authorized');
        }

        const response = await axiosInstance.post(endpoint, data, {

            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 201) {
            return response.data;
        } else {
            throw new Error('Unexpected server response');
        }
    } catch (error) {
        if (error.response && error.response.status === 401) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('שגיאה. נסה שוב מאוחר יותר');
        }
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
    const token = localStorage.getItem('token');
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            throw new Error('No Authorized');
        }

        const response = await axiosInstance.get(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};


export const updateDataToServer = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            throw new Error('No Authorized');
        }
        const response = await axiosInstance.patch(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const deleteData = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            throw new Error('No Authorized');
        }

        const response = await axiosInstance.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const updateFoodToServer = async (endpoint, data) => {
    const token = localStorage.getItem('token');
    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.role !== 'admin') {
            throw new Error('No Authorized');
        }

        const response = await axiosInstance.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};
