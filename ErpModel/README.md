# workshopnet

Generating Business network for workshop demo application


---
I had to manually build the image so that docker in docker would work same as in in this video
Dockerfile approach was not working because of docker not being able to fetch docker.sock (because I had (to my knowledge) no way to map it during docker image build) as well as not being able to have "privileged" access (the '--privileged' flag which we apply to containers or docker-compose exec) to alpine's system resources.

So I have built a base image that simply loads the default composer containers on host using the bind mount of docker.sock coming from host themself. This image is useful when we want to simply have our hlf-composer application dockerized, making it portable & independent as well, providing our own chaincode and model files after keeping this base image. So yeah, use this image if you want to dockerize your Hyperledger Fabric-Composer application and host it somewhere (my usecase)

Working directory name will be ErpModel (as this image was created to support our workshop demo application) so if you want to change it, I've uploaded it this image on GitHub. Here's the repository: https://github.com/AdityaNambiar/tcethlfworkshop/tree/ERPDEMO-dockerized/ErpModel
Create 0.1 version with your own workdir (take base image as (at the moment, the latest version):- 'docker:19.03.11' ) and you can follow rest of the commands.
