DOCKER_IMAGE_REGISTRY := patrickgeorge1/share-with-ukraine

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT_NUMBER := $(shell git rev-list --count HEAD | xargs printf %05d)
GIT_COMMIT_HASH := $(shell git rev-parse --short HEAD)
BUILD_TIMESTAMP := $(shell date +'%Y%m%d%H%M%S')
DOCKER_IMAGE_TAG := $(GIT_BRANCH)-$(GIT_COMMIT_NUMBER)-$(GIT_COMMIT_HASH)-$(BUILD_TIMESTAMP)

FRONTEND_IMAGE_TAG := frontend-$(DOCKER_IMAGE_TAG)
KAFKA_MAIL_SENDER := kafka-mail-sender-$(DOCKER_IMAGE_TAG)

build-keycloak:
	docker build keycloak-17.0.1/Docker --tag keycloak-custom-image

build-frontend:
	docker build frontend/ --tag $(DOCKER_IMAGE_REGISTRY):$(FRONTEND_IMAGE_TAG)

build-mail-sender:
	docker build -f ./KafkaStreamedEmailSender/docker/Dockerfile . --tag $(DOCKER_IMAGE_REGISTRY):$(KAFKA_MAIL_SENDER)

publish-frontend: build-frontend
	docker push $(DOCKER_IMAGE_REGISTRY):$(FRONTEND_IMAGE_TAG)

publish-mail-sender: build-mail-sender
	docker push $(DOCKER_IMAGE_REGISTRY):$(KAFKA_MAIL_SENDER)

serve-dashboard:
	kubectl proxy

get-token:
	kubectl -n kubernetes-dashboard get secret $(kubectl -n kubernetes-dashboard get sa/admin-user -o jsonpath="{.secrets[0].name}") -o go-template="{{.data.token | base64decode}}"
