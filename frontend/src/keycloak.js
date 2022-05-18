import Keycloak from 'keycloak-js'
import { config } from './utils/Constants';

const keycloak_config = {
    "realm": "master",
    "url": config.KEYCLOAK_URL,
    "clientId": "Share with Ukraine",
}

const keycloak = new Keycloak(keycloak_config)

export default keycloak