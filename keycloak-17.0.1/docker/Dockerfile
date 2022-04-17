FROM quay.io/keycloak/keycloak:17.0.1

WORKDIR /opt/keycloak/bin

ENV KEYCLOAK_ADMIN="admin"
ENV KEYCLOAK_ADMIN_PASSWORD="admin"

COPY realm-export.json ./
COPY --chmod=0777 start.sh ./

EXPOSE 8080

# CMD ["start-dev"]
CMD ["import", "--file", "realm-export.json", "--override", "true"]