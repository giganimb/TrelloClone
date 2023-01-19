# Flat-rent calendar

## Installation

### Server setup

1. Install NodeJS dependencies:

> cd api
> npm install

2. Copy `.env.example` to a `.env` file in the same directory:

> cp .env.example .env

3. (Optional) To use docker-compose go to .env file, comment the second line and uncomment the first one (MONGODB_URLs):

> MONGODB_URL=mongodb://mongo-db:27017/brello
> #MONGODB_URL=mongodb://localhost:27017/brello

### Client setup

1. Install Vue.js dependencies:

> cd ui
> npm install

## Execution

### To run without docker

1. Run server:

> cd api
> npm run dev

2. Run server:

> cd ui
> npm run serve

### To run with docker

1. You need to do step №3 in Installation/Server setup

2. In root directory run:

> docker-compose up

3. To undo previous step run:

> docker-compose down
