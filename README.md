# Comments API

REST API for Comments application, that provides CRUD operations for user comments and user authorization

## Table of Contents

- [Introduction](#introduction)
- [Description](#description)
- [Get Started](#get-started)
- [Technologies](#technologies)
- [Dependencies](#other-dependencies)
- [Comments](#comments)
- [Links](#links)

## Introduction

This project aims to create a simple and functional REST API server (Back End) for Comments application. <br/>

It includes:

- user authorisation section, that allows to register, login, logout and update user as well as fetch users information
- comments section, that allows to create, fetch, update or delete comments <br/>

Full functionality is provided in [API documentation](https://api-comments-chi.vercel.app/)

## Description

With this REST API you can make GET, POST, PUT and DELETE requests with following functionality:

- register a new User (available to add image for user's avatar)
- login / logout User
- get data of current User
- update User data (including updating of avatar image)
- get a list of Comments from DB according to query parameters (page & limit)
- get or delete Comment by id
- create a new Comment with an unauthorized User, using reCAPTCHA validation
- create a new Comment by an authorized user (available to add images or/and text file to the Comment)
- get a list of Comments of an authorized user
- get a list of Users (Performed without authorization for presentation purposes, since the user database is a mock and does not include sensitive data)
- get a User data by id (Performed without authorization for presentation purposes, since the user database is a mock and does not include sensitive data)

All POST, PUT and DELETE requests pass through different validations. POST requests processes by cropping and optimizing images. Implemented size limit and file type validation for images.
As a addition feature, the program includes a data generator for seeding fake data to the database (Users and Comments).

Detailed description of API documentation you can find on https://api-comments-chi.vercel.app/

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

1. Go to the deployed server on https://api-comments-chi.vercel.app/
2. Ready to test. You can test the API using Postman or directly from the Swagger Docs page.

### Using GitHub repository to run locally in development mode

1. Go to https://github.com/OleksandrKochenko/dZENcode-test-assignment
2. Clone repository
3. Set dependencies `npm install`
4. Add environment variables to the **.env file** according to the template in **.env.example**
5. Seed fake data with data generator in this order:<br/>
   `npm run seed-user`<br/>
   `npm run seed-comments`
6. Run app on dev mode `npm run start:dev`<br/> Your server run on http://localhost:3000 (Available to update)

Use [Links](#links) to test the app on web-service with Swagger API documentation.

## Technologies

For this project were used:

- Node.js

- Express.js

- MongoDB (Mongoose)

- vercel.com - for deployment

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
- You can choose servers to test:
  - http://localhost:3000 (if you run it locally)
  - https://api-comments-chi.vercel.app/ (using web service)

## Links

- https://api-comments-chi.vercel.app/ - link for API Docs with live test
- https://github.com/OleksandrKochenko/dZENcode-test-assignment - Git Hub repository of app
- https://www.linkedin.com/in/oleksandr-kochenko/ - profile on LinkedIn
- https://oleksandrkochenko.github.io/CV-Kochenko/no - CV

![ua](https://github.com/OleksandrKochenko/dZENcode-test-assignment/assets/121250212/c9fd2a05-66ed-47d6-8c69-5efe10f09dcf) Stand with Ukraine!

[Copyright (c) 2024 Oleksandr Kochenko](./LICENSE)
