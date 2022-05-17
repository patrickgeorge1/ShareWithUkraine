// const url = {
//     API_URL: "http://localhost:5000",
//     FRONTEND_URL: "http://localhost:3000",
// }

const url = {
    API_URL: process.env.REACT_APP_BACKEND_URL,
    KEYCLOAK_URL: process.env.REACT_APP_KEYCLOAK_URL,
}

export const config = url;