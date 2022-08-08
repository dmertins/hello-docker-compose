# hello-docker-compose
A multi-container, Compose configured, web application.

## Contents
1. Application overview
2. Requirements
3. Running the application stack
4. Running the application in development mode

## Application overview
The application is composed of the following parts:
- Express server running on Node.js;
- MySQL relational database with a persistent volume;
- Nginx serving the application as a reverse proxy;

```
(External user)
       |
      8080
       |
 +-----------+
 |   nginx   |
 |  service  |
 +-----------+
       |
 +-----------+
 |  node.js  |
 |  service  |
 +-----------+
       |
 +-----------+       ______________
 |   mysql   |  r+w (  persistent  )
 |  service  |=======\   volume   /
 +-----------+        \__________/
```

All application services are configured in the Compose file.

## Requirements
- [Docker](https://docs.docker.com/get-started/) ≥ 20.10.17

## Running the application stack

To run the application services:
```console
$ docker compose up --build
```

To check the application containers status:
```console
$ docker compose ps
```

The web application listens on port `8080`. To access the application, open a web browser and go to the following address:
```
http://localhost:8080
```

To stop the application services:
```console
$ docker compose down
```

## Running the application in development mode

In development mode, the application source code is bind mounted into the running container, and [nodemon](https://www.npmjs.com/package/nodemon) automatically restarts the application when file changes are detected. These configuration are defined in the Compose development file.

To run the application in development mode:
```console
$ docker compose -f compose.yaml -f compose.dev.yaml up --build
```
