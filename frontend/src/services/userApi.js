import axios from 'axios';
import { config } from '../utils/Constants';

export const userApi = {
    postAGoodsRequest,
    postAShelterRequest,
    postATransportRequest,
    getGoodsRequests,
    getShelterRequests,
    getTransportRequests,
    getCurrentUser,
    updateUser,
    getGoodsRequestsByUserId,
    getShelterRequestsByUserId,
    getTransportRequestsByUserId,
    deleteGoodsRequest,
    deleteShelterRequest,
    deleteTransportRequest,
    acceptGoodsRequest,
    acceptShelterRequest,
    acceptTransportRequest,
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

    return instance.post(`/api/GoodsRequest`, obj, {
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

    return instance.post(`/api/ShelterRequest`, obj, {
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

    return instance.post(`/api/TransportRequest`, obj, {
        headers: {
            'Authorization': bearerAuth(token),
        }
    })
}

function getGoodsRequests(token) {
    return instance.get(`/api/GoodsRequest`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function getShelterRequests(token) {
    return instance.get(`/api/ShelterRequest`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function getTransportRequests(token) {
    return instance.get(`/api/TransportRequest`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function getCurrentUser(token) {
    return instance.get(`/api/User`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function updateUser(token, role, phone) {
    var obj = {
        phone: phone,
        userType: role,
    }

    return instance.put(`/api/User`, obj, {
        headers: {
            'Authorization': bearerAuth(token),
        }
    })
}

function getGoodsRequestsByUserId(token, userId) {
    return instance.get(`/api/GoodsRequest/byUserId/${userId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function getShelterRequestsByUserId(token, userId) {
    return instance.get(`/api/ShelterRequest/byUserId/${userId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function getTransportRequestsByUserId(token, userId) {
    return instance.get(`/api/TransportRequest/byUserId/${userId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function deleteGoodsRequest(token, requestId) {
    return instance.delete(`/api/GoodsRequest/${requestId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}
function deleteShelterRequest(token, requestId) {
    return instance.delete(`/api/ShelterRequest/${requestId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function deleteTransportRequest(token, requestId) {
    return instance.delete(`/api/TransportRequest/${requestId}`, {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function acceptShelterRequest(token, requestId) {
    return instance.put(`/api/ShelterRequest/${requestId}`, "", {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function acceptGoodsRequest(token, requestId) {
    return instance.put(`/api/GoodsRequest/${requestId}`, "", {
        headers: {
            'Authorization': bearerAuth(token)
        }
    })
}

function acceptTransportRequest(token, requestId) {
    return instance.put(`/api/TransportRequest/${requestId}`, "", {
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