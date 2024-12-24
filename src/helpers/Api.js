import axios from 'axios';

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
        const headers = {};
        if (endpoint !== '/users/register') {
            headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        }

        const response = await axiosInstance.post(endpoint, data, { headers });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error occurred');
    }
};

export const sendDataToServerAdmin = async (endpoint, data) => {
    const userJSON = localStorage.getItem('user');
    try {
        const user = JSON.parse(userJSON);
        if (!user) {
            throw new Error('No token available');
        }

        const response = await axiosInstance.post(endpoint, data, {

            headers: {
                Authorization: `Bearer ${user.token}`,
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
    const userJSON = localStorage.getItem('user');
    try {
        const user = JSON.parse(userJSON);
        if (!user.token) {
            throw new Error('No token available');
        }

        const response = await axiosInstance.get(endpoint, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};


export const updateDataToServer = async (endpoint, data) => {
    const userJSON = localStorage.getItem('user');
    try {
        const user = JSON.parse(userJSON);
        if (!user.token) {
            throw new Error('No token available');
        }

        const response = await axiosInstance.patch(endpoint, data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const deleteData = async (endpoint, data) => {
    const userJSON = localStorage.getItem('user');
    try {
        const user = JSON.parse(userJSON);
        if (!user.token) {
            throw new Error('No token available');
        }

        const response = await axiosInstance.delete(endpoint, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response;
    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};

export const updateFoodToServer = async (endpoint, data) => {
    const userJSON = localStorage.getItem('user');
    try {
        const user = JSON.parse(userJSON);
        if (!user.token) {
            throw new Error('No token available');
        }

        const response = await axiosInstance.put(endpoint, data, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });

        return response.data;

    } catch (error) {
        throw new Error('שגיאה. נסה שוב מאוחר יותר');
    }
};
