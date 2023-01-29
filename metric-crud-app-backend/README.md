
# Metric CRUD App Backend

This is a the backend the Metric CRUD app challenge

## Tech Stack

**Server:** Node, Express, Docker, Prisma

## Documentation and url of deploy

https://metric-crud-app-backend.onrender.com/

## Run Locally

Clone the project

```bash
  git clone https://github.com/fernandofreije/metric-crud-app.git
```
or
```bash
git@github.com:fernandofreije/metric-crud-app.git
```

Go to the project directory

```bash
  cd metric-crud-app/metric-crud-app-backend
```

### Using docker (recommended)
Install dependencies

```bash
  npm install
```

Build the docker image

```bash
  npm run docker:dev:build
```


Set the database url deppending on your machine in the .env
```bash
  touch .env && echo DATABASE_URL="postgresql://justauser:somerandompassword@postgresql:5432/dev_database?schema=public" >> .env
```

Set the port in the .env file (optional)
```bash
  echo PORT=8080 >> .env

  npm run docker:dev:build
```

Start the server dev mode

```bash
  npm run docker:dev
```

To run in production mode you just have the repeat this steps with `npm run docker:build` and `npm run docker:start`

### To run locally (not recommended)

Install [postgresql](https://www.postgresql.org/) and start the service 

### 
Install dependencies

```bash
  npm install
```

Run in dev mode

```bash
  npm run dev
```

or in production mode
```bash
  npm start
```



## Running Tests

You can run unit tests locally with

```bash
  npm run test:unit
```

but to run integration tests docker is needed

### Run integration tests

```bash
  npm run docker:test:integration
```

### Run all tests

```bash
  npm run docker:test:all
```

## Some TODO stuff

- Add CI to run tests and deploy conditionally


