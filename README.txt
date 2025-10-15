

#For working database with persistent info...

#You need to change the IP addresses in compose file to match your IP

sudo docker-compose -f compose-not-swarm.yml up --build


#For swarm (includes api but won't work without db) demonstrating docker swarm

(swarm.yml)

#Many of these commands are slighly modifed from docker swarms official web page

- Create swarm
docker swarm init

-join nodes
*My implementation has two worker nodes using two additional vms to the manager*
*Ensure manager node is up with a static IP, same with worker nodes

docker swarm join --token *token from init* *IP of manager

- Create a registry
docker service create --name registry --publish published=5000,target=5000 registry:2

- Push compose to registry and deploy stack to swarm
docker-compose -f swarm.yml push

#You need to change the IP addresses in compose file to match your IP
docker stack deploy --compose-file swarm.yml fixit

#Rollout and rollback

*Assuming you have built a new image

docker image tag fixit-frontend:v2 127.0.0.1:5000/fixit-frontend:v2
docker push 127.0.0.1:5000/fixit-frontend:v2

sudo docker service update --image localhost:5000/fixit-frontend:v2 fixit_frontend

