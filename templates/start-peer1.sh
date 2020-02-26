#start peerN.sh file
set -ev
# don't rewrite paths for Windows Git Bash users
export MSYS_NO_PATHCONV=1
docker-compose -f docker-compose-peerN.yml down
docker rm --force $(docker ps -aq) || true
docker volume prune -f
docker rmi -f $(docker images -q -f "reference=dev-*") || true
docker-compose -f docker-compose-peerN.yml up -d peerN.org1.example.com couchdbN
export FABRIC_START_TIMEOUT=10
sleep ${FABRIC_START_TIMEOUT}

# Fetch and join the channel
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peerN.org1.example.com peer channel fetch 0 composer-genesis.block -o orderer.example.com:7050 -c composerchannel
docker exec -e "CORE_PEER_MSPCONFIGPATH=/etc/hyperledger/msp/users/Admin@org1.example.com/msp" peerN.org1.example.com peer channel join -b composer-genesis.block
