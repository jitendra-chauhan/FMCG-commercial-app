# webelightFMCG

# .env

NODE_ENV=development
PORT=3022
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/fmcg
MASTER_DB=fmcg
JWT_ACCESS_EXPIRATION_MINUTES = 300 
JWT_REFRESH_EXPIRATION_DAYS = 24 
JWT_SECRET = dummy 
JWT_WITH_RE_USER_EXPIRATION_HOURS = 10 
JWT_WITHOUT_RE_USER_EXPIRATION_HOURS = 10 
SWAGGER_HOST = localhost:3022
FILES = ts


# BackEnd Coding Challenge

## Idea of the App

The task is to implement a small server application which will have basic functionalities such as authentication, role management, etc.
Make schemas based on any FMCG commercial app but on a small scale.

## Features

- App should have Bearer authentication
- Restrict some routes to a specific role such as list of customers can be called with admin role
- App should have CRUD, filter(category, price band, name etc.), pagination queries
- Implement swagger doc for api endpoints

## Things to keep in mind

Your code will be evaluated on:

- whether the technologies required are used
- code structure
- programming best practices
- legibility

Also we would like you to use git repo when you start coding so we can check your commits and your fluency with github/gitlab. Add a separate commit so we know how you use commit standards and at same time how good you can breakup tasks while doing commit of code.

## Technologies to use

We'd like to see your implementation using the following technologies:

- Express / Nest with Typescript
- Mongodb or any other SQL database of your choice
- If not sharing project in typescript please do mention that before hand

## How to submit the challenge solution?

After you finished your app, please follow the instructions below:

1. Share your repository link to us - can be a public repository on gitlab or github
2. Share a postman collection of your endpoints
3. Mention the time you spent on this
4. You can use any boilerplate from internet instead of setting up own from scratch to save time.