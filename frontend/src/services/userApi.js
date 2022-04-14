import axios from 'axios';
import { config } from '../utils/Constants';

export const userApi = {

}

const instance = axios.create({
    baseURL: config.API_URL
})

instance.interceptors.response.use(response => {
    return response;
}, function (error) {
    if (error.response.status === 404) {
        return { stauts: error.response.status };
    }
    return Promise.reject(error.response);
});

function bearerAuth(token) {
    return `Bearer ${token}`
};