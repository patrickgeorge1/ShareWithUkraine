Jira Board: https://sharewithukraine.atlassian.net/jira/core/projects/SHARE/board

Figma: https://www.figma.com/file/8eKsoJQhJTCMgPkIlueRvh/Proiect?node-id=0%3A1


## Setup base cluster { Kafka, Postgres, Keycloack}

- Kill any proc running on port 5432
- Create cluster network

        docker network create -d overlay --attachable cluster_shared_network
        
- Start /KafkaCluster/docker-compose.yml

        cd KafkaCluster
        docker stack deploy --compose-file docker-compose.yml kafka

- Create database ShareWithUkraine-Keycloak if not present (using pgAdmin4)


- Run Keycloak

        cd keycloak-17.0.1
        .\bin\kc.bat build --db=postgres
        .\bin\kc.bat start-dev

- Import Keycloack settings

        Go to http://localhost:8080
        Import keycloak-17.0.1/realm-export_1.json with Skip strategy


Ignore file changes:

- [Single file](https://stackoverflow.com/questions/18276951/how-do-i-stop-git-from-tracking-any-changes-to-a-file-from-this-commit-forward)

- [Multiple files](https://stackoverflow.com/questions/12288212/git-update-index-assume-unchanged-on-directory)
