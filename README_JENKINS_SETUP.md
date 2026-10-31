# Jenkins pipeline starter files for the banking V1/V2 project

## Included files
- `Jenkinsfile.v1` — initial V1 Continuous Integration (CI) pipeline.
- `Jenkinsfile.v2` — initial V2 Continuous Integration (CI) pipeline.

Both pipelines check out the configured GitHub repository, use the Jenkins tool
installations `JDK21` and `Maven399`, and run `mvn -B clean verify` from the
repository root.

## Where to extract
Extract all three files directly into the ROOT of your existing repository:

`/mnt/e/GIT/Repo-3 for Eureka_and_Kubernetes`

The files must sit beside `pom.xml`, `compose.v1.yml`, and `compose.v2.yml`.
Do not put them inside a new folder.

## Push the two Jenkinsfiles to GitHub
From the repository root in Ubuntu/WSL, run:

    git status
    git add Jenkinsfile.v1 Jenkinsfile.v2
    git commit -m "Add initial Jenkins CI pipelines for V1 and V2"
    git push origin main

Before committing, check that `git status` shows only the two new Jenkinsfiles.
Do not overwrite or modify existing application YAML, Dockerfiles, Compose files,
Kubernetes manifests, or application source code.

## Jenkins jobs to create after pushing
Create two separate Jenkins Pipeline jobs:

### Banking-V1-CI
- Definition: Pipeline script from SCM
- SCM: Git
- Repository URL: your existing GitHub repository HTTPS URL
- Branch Specifier: `*/main`
- Script Path: `Jenkinsfile.v1`

### Banking-V2-CI
Use the same repository URL and branch, but set Script Path to `Jenkinsfile.v2`.

The repository shown in the screenshots is public, so normal HTTPS checkout should
not require credentials. If Jenkins reports an authentication/network error, inspect
that error rather than adding credentials blindly.

## Scope of these starter pipelines
These are CI pipelines only. They do not build Docker images or deploy V1/V2 yet.
After the Maven builds are tested, inspect the actual Dockerfiles, image tags,
Compose file, and Kubernetes manifests before adding CD deployment steps. This
avoids guessing deployment commands or disturbing the currently working deployments.

The scripts use Windows `bat` commands because the successful Banking-CI-Test
console output confirmed that the current Jenkins executor runs on Windows.
Ubuntu/WSL is installed separately and is not the executor for this Jenkins job.
