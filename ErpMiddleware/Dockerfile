FROM node:8.9-alpine

RUN node -v && npm -v

# I've added the environment variable to docker-compose, should work now..
#RUN erp_jwtPrivateKey=${erp_jwtPrivateKey}\
 #   && export erp_jwtPrivateKey=1234 && echo $erp_jwtPrivateKey  \
  #  && echo "CURRENT DIRECTORY: " pwd && echo "HOMIE: " $HOME

WORKDIR /ErpMiddleware/
# Exposing my container volume:
VOLUME /ErpMiddleware/

EXPOSE 5000

COPY . .


ENTRYPOINT ["node", "index.js"]
