#!/bin/bash

cleanup() {
    ./scripts/stopFabric.sh
}

#Trap SIGTERM
trap cleanup SIGTERM

# Execute setup fabric:
./scripts/setupFabric.sh

#Wait
wait $!
