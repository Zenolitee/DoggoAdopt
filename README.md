# Pet Adoption System Server

## Description
This server is the backend component of the Pet Adoption System, an application designed to connect potential pet adopters with animals in need of a home. It handles user authentication, pet registration, image uploads, and adoption form submissions.

## Features
- User authentication and session management
- Image upload for pet profiles
- Pet information registration
- Adoption form handling
- CORS enabled for cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js
- npm
-

### Installing
Clone the repository and install the dependencies:

- ## Dependencies
To run this server, you will need Node.js and npm (Node Package Manager) installed on your computer. After you have Node.js and npm installed, you will need to install the following packages which the server depends on:

- `express`: A web application framework for Node.js designed for building web applications and APIs.
- `sqlite3`: A Node.js package that provides a software library that implements a self-contained, serverless, zero-configuration, transactional SQL database engine.
- `cors`: A node.js package for providing a Connect/Express middleware that can be used to enable CORS (Cross-Origin Resource Sharing).
- `multer`: A Node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
- `fs`: The built-in Node.js file system module used to read and write to the filesystem.
- `express-session`: A session middleware for Express that allows you to manage sessions.
- `cookie-parser`: A middleware which parses cookies attached to the client request object.

To install all the dependencies, run the following command in the root directory of your project:


```bash
npm install express sqlite3 cors multer express-session cookie-parser
```


Use the credentials 'admin' as username and 'admin' as password for the login page.
