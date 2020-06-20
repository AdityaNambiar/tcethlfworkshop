#!/bin/bash
#
#	./prereqs-alpine-updated.sh
#	Alpine based version for installing Hyperledger Composer
#	Goal - To be able to dockerize Hyperledger Composer (For our MajorProject)
#	Made by Aditya Nambiar (TCET student - batch 2020).

#   User is expected to run this script on alpine linux. 
#   Recommended usage: Within Dockerfile having base image alpine.


# Exit on any failure
set -e

# Removed the "CODENAME" and its compatibility setting section which does not apply for alpine. 

# Update package lists
echo "# Updating package lists"
apk update
echo "# Installing git"
apk add --no-cache git

# Ensure that CA certificates are installed
# apk add apt-transport-https ca-certificates
apk add --no-cache ca-certificates

# Install gpg on alpine:
apk add --no-cache gnupg

# Add Docker repository key to APT keychain
# P.S.: "-" (hyphen) at the end, in below command particularly, means take expected input from STDIN. 
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --import

# Update package lists
apk update

# Verifies APT is pulling from the correct Repository
apk policy docker

# Install NVM and then Node v8.9
# Install nvm dependencies
# echo "# Installing nvm dependencies"
# apk add build-base libressl-dev

# # Execute nvm installation script
# echo "# Executing nvm installation script"
# curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash

# # Set up nvm environment without restarting the shell
# export NVM_DIR="${HOME}/.nvm"
# [ -s "${NVM_DIR}/nvm.sh" ] && . "${NVM_DIR}/nvm.sh"
# [ -s "${NVM_DIR}/bash_completion" ] && . "${NVM_DIR}/bash_completion"

# Install node
# # https://www.quora.com/How-can-I-install-Node-js-version-8-on-Alpine-Linux
# echo "# Installing nodeJS"
# wget 'https://nodejs.org/download/release/v8.9.4/node-v8.9.4-linux-arm64.tar.gz'
# tar -xvzf node-v8.9.4-linux-arm64.tar.gz
# ls -al node-v8.9.4-linux-arm64/bin/
# ln -s node-v8.9.4-linux-arm64/bin/npm /usr/bin/
# npm ls
# ln -s node-v8.9.4-linux-arm64/bin/npx /bin/
# ln -s node-v8.9.4-linux-arm64/bin/node /bin/

# Install Docker
## For Alpine, this is the guide for installing docker: https://wiki.alpinelinux.org/wiki/Docker  
echo "# Installing Docker"
apk add --no-cache docker
# Start docker daemon on boot:
apk add --no-cache openrc
rc-update add docker boot
service docker start

# Install docker compose
apk add --no-cache docker-compose

# Isolate containers with user namespace:
# I guess this is the equivalent of adding user to docker group:

# adduser -SDHs /sbin/nologin dockremap
# addgroup -S dockremap
# echo dockremap:$(cat /etc/passwd|grep dockremap|cut -d: -f3):65536 >> /etc/subuid
# echo dockremap:$(cat /etc/passwd|grep dockremap|cut -d: -f4):65536 >> /etc/subgid


# Install python v2 if required
set +e
apk add --no-cache python2

# Install unzip, required to install hyperledger fabric.
apk add --no-cache unzip

# Print installation details for user
echo ''
echo 'Installation completed, versions installed are:'
echo ''
echo -n 'Node:           '
node --version
echo -n 'npm:            '
npm --version
echo -n 'Docker:         '
docker --version
echo -n 'Docker Compose: '
docker-compose --version
echo -n 'Python:         '
python -V

# Print reminder of need to logout in order for these changes to take effect!
# Since I am executing this script while building the image, 
# the starting of a container should be equivalent to "logout then login" or "reboot".
# It'd make sense if you realize that after installing prereqs, we don't have to run the script again.
# A docker container is essentially a process running with cgroups so starting a container should be enough for it to 'apply its changes'  
echo ''
echo "Please logout then login before continuing."
