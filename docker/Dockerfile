# Based on https://github.com/Kunstmaan/docker-ethereum/blob/master/geth/Dockerfile
FROM base/archlinux:2018.10.01
MAINTAINER Paul Pham

RUN pacman -Sy && \
    echo "Y" | pacman -Sy sudo && \
    echo "Y" | pacman -Sy python2 && \
    echo "Y" | pacman -Sy git && \
    echo "Y" | pacman -Sy neovim && \
    echo "Y" | pacman -Sy openssh

RUN mkdir -p /src
RUN cd /src; git clone https://github.com/invisible-college/arcology-website.git
# Need to create a shell profile file first, so nvm has something to load into
RUN touch ~/.profile
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
RUN . ~/.nvm/nvm.sh && nvm install v8.12.0
RUN cd /src/arcology-website; . ~/.nvm/nvm.sh && npm install
RUN mkdir -p /src/arcology-website/bin
RUN cd /src/arcology-website; ln -s ./node_modules/scuttlebot/bin.js ./bin/scuttlebot; chmod +x ./bin/scuttlebot
ADD .bashrc ~/.bashrc
ADD config ~/.arc/config

ENTRYPOINT ssh-keygen -t rsa -f ~/.ssh/id_rsa -N "" && /bin/bash

EXPOSE 8007
EXPOSE 8988
