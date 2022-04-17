DOCKER_IMAGE_REGISTRY := patrickgeorge1/share-with-ukraine

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
GIT_COMMIT_NUMBER := $(shell git rev-list --count HEAD | xargs printf %05d)
GIT_COMMIT_HASH := $(shell git rev-parse --short HEAD)
BUILD_TIMESTAMP := $(shell date +'%Y%m%d%H%M%S')
DOCKER_IMAGE_TAG := $(GIT_BRANCH)-$(GIT_COMMIT_NUMBER)-$(GIT_COMMIT_HASH)-$(BUILD_TIMESTAMP)

FRONTEND_IMAGE_TAG := frontend-$(DOCKER_IMAGE_TAG)

build-keycloak:
	docker build keycloak-17.0.1/Docker --tag keycloak-custom-image

build-frontend:
	docker build frontend/ --tag $(DOCKER_IMAGE_REGISTRY):$(FRONTEND_IMAGE_TAG)

publish-frontend: build-frontend
	docker push $(DOCKER_IMAGE_REGISTRY):$(FRONTEND_IMAGE_TAG)