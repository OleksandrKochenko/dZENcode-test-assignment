# dZENcode-test-assignment

Test assignment: REST API implementation

## Table of Contents

- [Introduction](#introduction)
- [Get Started](#get-started)
- [Description](#description)
- [Technologies](#technologies)
- [Dependencies](#other-dependencies)
- [Comments](#comments)
- [Links](#links)

## Introduction

This application aims to create a simple and functional REST API server based on the specifications outlined in the provided API documentation (OpenAPI).

## Get started

### Using Docker:

1. Open Docker Desktop
2. Pull image from Docker Hub. Command line `docker pull oleksandrkochenko/test`
3. Сheck if the image is pulled. Command line `docker images`

   Example:

```bash
REPOSITORY               TAG       IMAGE ID       CREATED        SIZE
oleksandrkochenko/test   latest    7196f3c8f9d3   15 hours ago   1.16GB
```

4. Run the app. Command line `docker run -dp 3000:3000 oleksandrkochenko/test`
5. Go to http://localhost:3000/docs/ to see API documentation.
   Please note these comments before start [Links](#comments)

### Using web-service:

1. Go to the deployed server on https://dzencode-test-ryk0.onrender.com/docs
2. Ready to test. You can test the API using Postman or directly from the Swagger Docs page.

### Using GitHub repository

1. Go to https://github.com/OleksandrKochenko/dZENcode-test-assignment
2. Clone repository
3. Set dependencies (npm install)
4. Add environment variables to the **.env file** according to the template in **.env.example**
5. Seed fake data with data generator in this order:<br/>
   `npm run seed-user`<br/>
   `npm run seed-comments`
6. Run app on dev mode `npm run start:dev`<br/> Your server run on localhost:3000

Use [Links](#links) to test the app on web-service with Swagger API documentation.

## Description

This program creates a REST API server based on OpenAPI documentation. It includes a data generator for seeding fake data to the database.
With this API you can do GET, POST, PUT and DELETE requests with following functionality:

- register a new User
- login / logout User
- get data of current User
- update User (change avatar image or any User's data)
- get a list of Comments from DB according to query parameters (page & limit)
- get or delete Comment by id
- create a new Comment with an unauthorized User, using reCAPTCHA validation
- create a new Comment by an authorized user (add images or/and text file to the Comment)
- get a list of Comments by an authorized user
  All POST, PUT and DELETE requests pass through different validations. POST requests processes by cropping and optimizing images.
  Detailed description of API documentation you can find on https://dzencode-test-ryk0.onrender.com/docs

## Technologies

For this project were used:

- Node.js

- Express.js

- MongoDB (Mongoose)

- onrender.com - resource for deployment

## Other dependencies

- multer - for file upload
- tinify - for image validation and optimization
- cloudinary - cloud image storage
- jsonwebtoken - JWT implementation
- bcryptjs - password hashing
- joi - request body validation
- cors - available cross-domain requests
- dotenv - available environment variables
- morgan - format logging
- swagger-ui-express - for API documentation with live test
- faker-js - for fake data creation

## Comments

- You can use Postman to test API requests or do dhis directly from Swagger Docs page (Try it out)
- You can choose servers to test (http://localhost:300 or https://dzencode-test-ryk0.onrender.com/)<br/>
  If you choose server deployed on onrender.com, please note this:<br/>
  You can receive a **504 Gateway Timeout** error. You should retry the request because the hosting takes some time to load.
  <br/> _Free instance web-service spin down with inactivity_

## Links

- https://dzencode-test-ryk0.onrender.com/docs - link for API Docs with live test <br/> \* If you receive a **504 Gateway Timeout** error, you should retry the request because the hosting takes some time to load. <br/> Free instance web-service spin down with inactivity.
- https://github.com/OleksandrKochenko/dZENcode-test-assignment - Git Hub repository of app
- https://abz-agency-ta.onrender.com - base URL
