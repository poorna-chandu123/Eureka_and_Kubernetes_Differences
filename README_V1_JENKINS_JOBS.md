# Banking V1 Jenkins CI/CD + START/STOP jobs

## Job-to-file mapping

| Jenkins job | Script Path | Responsibility |
|---|---|---|
| Banking-V1-CI-CD | Jenkinsfile.v1 | Maven build + V1 image build + deployment |
| Banking-V1-STOP | Jenkinsfile.v1-stop | Stop V1 containers |
| Banking-V1-START | Jenkinsfile.v1-start | Start existing stopped V1 containers |

## Jenkins UI setup

Create each job using **New Item -> Pipeline -> OK**.

For EACH job configure:
- Definition: Pipeline script from SCM
- SCM: Git
- Repository URL: https://github.com/poorna-chandu123/Eureka_and_Kubernetes_Differences.git
- Credentials: none (assuming the repository remains public)
- Branch Specifier: */main
- Script Path: use the exact path from the table above

Save each job. Keep the existing Banking-V1-CI job until the new jobs are tested.

## How to operate

### First deployment / deployment after code changes
Run Banking-V1-CI-CD -> Build Now.
It checks out source, runs Maven, builds images, then runs:
`docker-compose -f compose.v1.yml up -d`

### Stop the application
Run Banking-V1-STOP -> Build Now.
It runs:
`docker-compose -f compose.v1.yml stop`
Containers and images are retained.

### Start again after STOP, without code/config changes
Run Banking-V1-START -> Build Now.
It runs:
`docker-compose -f compose.v1.yml start`
No Maven build or image build is performed.

### If containers were removed
If `docker-compose down` was run or containers were deleted, `start` cannot recreate them. Run Banking-V1-CI-CD.

## Important notes
- Commands use `docker-compose` (hyphen), verified in the Jenkins Windows service environment.
- All jobs use the existing compose.v1.yml in the Git checkout.
- The Compose project name in your file is `banking-v1`, so the jobs target the same V1 Compose project.
- These files do not modify V2 Kubernetes resources.
- Banking-V1-CI-CD starts/recreates V1 containers and may cause brief downtime.
- STOP and START are operational-control jobs, not CI/CD build pipelines themselves.
- These jobs are manually triggered with Build Now. GitHub webhook automation is a separate future configuration.
