# syntax=docker/dockerfile:1
FROM --platform=linux/x86_64 mysql:8.0.28-debian
RUN apt-get update && apt-get install -y \
    wget
RUN wget -O - https://github.com/k0kubun/sqldef/releases/latest/download/mysqldef_linux_amd64.tar.gz | tar xvz && \
    mv mysqldef /usr/bin
