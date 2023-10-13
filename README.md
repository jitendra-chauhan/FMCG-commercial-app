# FMCG-application

# start typeScript server
npm start

# start build javaScript server
npm run build
npm run startBuild

# swagger URL
http://localhost:3022/api-documents/

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

# BackEnd Coding Challenge

## Idea of the App

The task is to implement a small server application that will have basic functionalities such as authentication, role management, etc.

## Features

- App have Bearer authentication
- Restricted some routes to a specific role such as list of customers can be called with admin role
- App have CRUD, filter(category, price band, name etc.), pagination queries
- Implemented swagger doc for api endpoints

## Things to keep in mind

Your code will be evaluated on:

- whether the technologies required are used
- code structure
- programming best practices
- legibility


## Technologies to use

 see my implementation using the following technologies:

- Express with Typescript
- Mongodb database
- JWT for authentication
- Joi-validation
