# FixIt — Development README

For a working database with persistent info, use the docker-compose workflow below.

> Note: You must change the IP addresses in the compose files to match your environment.

## Local (non-swarm) development

Build and run the compose stack:

```bash
sudo docker-compose -f compose-not-swarm.yml up --build
```

## Docker Swarm (demo)

This project includes a swarm example (swarm.yml). The swarm configuration includes the API but it will not work without the database.

High-level steps (adapted from Docker Swarm docs):

1. Create the swarm (on manager):

    ```bash
    docker swarm init
    ```

2. Join worker nodes (on each worker):

    ```bash
    # Use the token and manager IP printed by `docker swarm init`
    docker swarm join --token <token> <MANAGER_IP>
    ```
    - My setup used two worker VMs and one manager VM.
    - Ensure manager and workers have static IPs or consistent addressing.

3. Create a registry:

    ```bash
    docker service create --name registry --publish published=5000,target=5000 registry:2
    ```

4. Push images from compose to the registry and deploy the stack:

    ```bash
    docker-compose -f swarm.yml push
    # then on the manager:
    docker stack deploy --compose-file swarm.yml fixit
    ```
    > Remember to update IP addresses inside `swarm.yml` to match your environment.

## Rollout and rollback (example)

Assuming you built a new image and want to update the service:

```bash
docker image tag fixit-frontend:v2 127.0.0.1:5000/fixit-frontend:v2
docker push 127.0.0.1:5000/fixit-frontend:v2

sudo docker service update --image localhost:5000/fixit-frontend:v2 fixit_frontend
```

## Notes
- Update any IP addresses in compose files before deploying.
- The swarm example demonstrates deployment but requires a reachable database for the API to function.


