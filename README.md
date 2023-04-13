# Crown Clothing Client
> A frontend part of an E-Commerce application "Crown Clothing Shop" that provides UI and connection to a backend API

> Backend part of the "Crown Clothing Shop": https://github.com/gymbarr/crown-clothing-api

> Live demo for the whole fullstack app [_here_](https://cosmic-sawine-9f1c88.netlify.app/)

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Prerequisite](#prerequisite)
* [Getting Started](#getting-started)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Contact](#contact)


## General Information
The Crown Clothing Shop is a web-application, which made with modern technologies, for purchasing the most fashionable clothing.
The app based on React + Redux and get data from backend API on Ruby on Rails.
It maintains searching by categories and products, cart functionality.
Purchases are carried out through [stripe](https://stripe.com) payment service.


## Technologies Used
- React - version 18.2.0
- Material UI - version 5
- Redux - version 4.2.0


## Features
- Persistent login sessions based on JWT tokens
- Protected routes for administrator functionality
- Basic and infinite scroll pagination 
- Shopping cart fucntionality
- Filtering products by colors and sizes
- Searching products and categories by title
- Styles made with the React Styled Components
- Requsets to backend API realized using axios library
- Flash messages made using Redux Thunk
- CI with Github Actions (linter job)


## Prerequisite
- **Node.js 16.15.1**
- **npm 8.11.0**


## Getting Started
**Clone the repo from github**

        $ git clone https://github.com/gymbarr/crown-clothing-client.git
        $ cd crown-clothing-client
        $ npm install

**Create `.env.local` file in the root folder of the project and past to it content of the `.env.example` file**
**Run the app in the development mode**

       $ npm start

**Run the backend server and test functionality in the browser**


## Project Status
Project is: _in progress_


## Room for Improvement
To do:
- Authentication with Google
- Localize the app to support other languages


## Contact
Created by [@Andrey Timakhovich](https://www.linkedin.com/in/andrey-timakhovich/) - feel free to contact me!
