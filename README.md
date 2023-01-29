
# Metric CRUD App Monorepo

This is a the monorepo containing the Metric CRUD app challenge

## Tech Stack

**Client:** React, NextJS

**Server:** Node, Express, Docker, Prisma

## Projects

For more information check each project Readme file

-  [Backend] (https://github.com/fernandofreije/metric-crud-app/tree/main/metric-crud-app-backend)
    Url: https://metric-crud-app-frontend.vercel.app

-  [Frontend] (https://github.com/fernandofreije/metric-crud-app/tree/main/metric-crud-app-fronend)
    Url: https://metric-crud-app-backend.onrender.com

## How to run
There are instructions for running each proyect separately in each readme (which is my prefered way to keep separate terminals),
but for convinience you can run everything together with the docker-compose in the root of the repo (if you have docker)

Prepare the database

```bash
docker-compose build && docker-compose run --rm api npx prisma migrate dev
```
Run the containers
```bash
docker-compose up
```