import axios from 'axios';
import { config } from '../utils/Constants';

export const userApi = {
    postAGoodsRequest,
    postAShelterRequest,
    postATransportRequest,
    getGoodsRequests
}

const instance = axios.create({
    baseURL: config.API_URL
})

function postAGoodsRequest(token, goodName, quantity, deliveryAddress, details) {
    var obj = {
        goodName: goodName,
        quantity: quantity,
        deliveryAddress: deliveryAddress,
        details: details
    }

    return instance.post(`/api/GoodsRequestModel`, obj, {
        headers: {
            'Authorization': bearerAuth(token),
        }
    })
}

function postAShelterRequest(token, houseLocation, availableSeats, transportIncluded, details) {
    var obj = {
        houseLocation: houseLocation,
        availableSeats: availableSeats,
        transportIncluded: transportIncluded,
        details: details
    }

    return instance.post(`/api/ShelterRequestModel`, obj, {
        headers: {
            'Authorization': bearerAuth(token),
        }
    })
}

function postATransportRequest(token, fromWhere, destination, arrivalTime, availableSeats, details) {
    var obj = {
        fromWhere: fromWhere,
        destination: destination,
        arrivalTime: arrivalTime,
        availableSeats: availableSeats,
        details: details
    }

    return instance.post(`/api/TransportRequestModel`, obj, {
        headers: {
            'Authorization': bearerAuth(token),
        }
    })
}

function getGoodsRequests(token) {
    return instance.get(`/api/GoodsRequestModel`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

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