## Navigate project location in Ubuntu

cd "/mnt/e/GIT/Repo-3 for Eureka_and_Kubernetes"



## Operation	Direct command with out any Docker UI buttons - replace the "compose.v1.yml" to V2
## Build images	    docker compose -f compose.v1.yml build
## Start containers	docker compose -f compose.v1.yml up -d
## Stop containers	    docker compose -f compose.v1.yml stop


##  For V1 No need any other Commands - (" like to buils images , deployment perpous )
##  we have to use above commands For build and deploye and start perpous directly 
   
   
##    -------------- but Kubernetes we have seperate approch -------------------
   
## Kubernetes CMD : Stop and start the entire V2 application if alredy v2 runnig 

## To stop all six deployments while preserving their Kubernetes configuration:

kubectl scale deployment --all --replicas=0 -n banking-v2

## Note  : cmd to stop any specific project 
kubectl scale deployment customer-service-v2 -n banking-v2 --replicas=0

## delete commads if need to remove Older img ( find the imgae name and delete that)

docker images       #Find the img name
docker rmi banking-account-service:v2-fix2

## To start them again with one replica each:
kubectl scale deployment --all --replicas=1 -n banking-v2


## Verify:
kubectl get pods -n banking-v2
kubectl get deployments -n banking-v2

## in Kubernetes after deploye to access application we have do do port forward in Ubuntu for ( Api-gate way and Front end ) 
kubectl port-forward -n banking-v2 service/api-gateway-v2 9090:9090
kubectl port-forward -n banking-v2 service/frontend-v2 4200:4200



##          -------------------- If we stoped Kubernetes means we need to install again and need to setup all from fresh -------------------

## Run: verification step
kubectl get nodes

## Expected: STATUS should show Ready.
## Step 2 — Create the V2 namespace
kubectl create namespace banking-v2

## Verify it:
kubectl get namespaces

## Step 3 — Check your existing V2 files
ls

## : ==== : Next Image building part : ==== :

## 1. Config Server ( Replace the remian project names in "config-server")  ## this is image name  (banking-config-server:v2-fix5 .) 
docker build -f common/config-server/Dockerfile.v2 -t banking-config-server:v2-fix5 .            


## Note: The frontend has a separate directory, so use its own build context:
docker build -f frontend/Dockerfile.v2 -t banking-frontend:v2-local ./frontend

## Verify all six images

docker images


## : ==== : Next deploying those project's  : ==== :

## Step 1 — Apply the namespace file
## Your banking-v2 namespace already exists, but applying the namespace manifest is safe if it declares the same namespace.
kubectl apply -f kubernetes-setup/namespace-v2.yaml

## Step 2 — Deploy Config Server first 
kubectl apply -f kubernetes-setup/config-server-deployment-v2.yaml
kubectl apply -f kubernetes-setup/config-server-service-v2.yaml

## Step 3 — Wait for Config Server to become ready:
kubectl rollout status deployment/config-server-v2 -n banking-v2 --timeout=120s

## Note : After Step 3 : we have to follow again same steps for remain project as well # Including Front end as well same steps

## Step 4 — Verify everything
kubectl get deployments -n banking-v2
kubectl get services -n banking-v2
kubectl get pods -n banking-v2



##     : ==== : If we done any changes( Including YML or code ...etc ) For Specific project We need to Re-build the Image's and Re-deploymnet required  : ==== :

## image Re-build 
docker build -f common/auth-server/Dockerfile.v2 -t banking-auth-server:v2-fix5 .

## 1. Force remove the old crashing resource deployment
kubectl delete deployment frontend-v2 -n banking-v2 --force --grace-period=0

## 2. Deploy your updated YAML manifest file
kubectl apply -f kubernetes-setup/account-service-deployment-v2.yaml

## 3. Track the rollout execution status
kubectl rollout status deployment/account-service-v2 -n banking-v2 --timeout=120s

