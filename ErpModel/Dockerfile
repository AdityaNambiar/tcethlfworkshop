FROM adinambiar24/hlfcomposer-mjrproj:0.3

# Copy over all files from host (from ErpModel) to docker
COPY . .
# setup node_modules:
RUN npm i

# Use Entrypoint script to setupFabric and stopFabric when container is closing.
# Assuming workdir will 
ENTRYPOINT [ "./entrypoint-composer.sh" ]