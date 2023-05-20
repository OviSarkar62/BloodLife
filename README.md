# BloodLife

BloodLife is an open-source project aimed at creating a web application for blood banks, and hospitals to manage and track blood donations, inventory, and donor information. This documentation provides an overview of the project, its features, and installation instructions.

## Project View

<h4>1. For User Profile<h4/>
 
- **Homepage**
<p align="center">
  <img alt="img-name" src="Images/Homepage from User.png" width="700">
</p>
      
## Features

BloodLife offers the following key features:

- Donor Management: Maintain a database of blood donors, including their personal information, contact details, blood type, and donation history.

- Inventory Tracking: Keep track of blood units, their blood types, and quantity available.

- Reports and Analytics: Generate reports and analytics related to blood donations, inventory, and other relevant records.

## Installation

To set up BloodLife locally, follow these steps:

- Clone the repository:

      git clone https://github.com/OviSarkar62/BloodLife.git

- Install the required dependencies for backend:

      npm i express dotenv colors bcryptjs jsonwebtoken mongoose nodemon zxcvbn
     
- Navigate to the client directory: 

       cd client
    
- Install the dependencies for the client: 

       npm i react-router-dom redux react-redux axios antd @reduxjs/toolkit react-bootstrap moment
    
- Create a .env file in the root directory with the following environment variables:

       DB_URL = mongodb+srv://<user>:<pass>@cluster0.l17quyr.mongodb.net/database

       JWT_SECRET = A_Secret_Value

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
- Access the application. Open your web browser and visit http://localhost:3000 to access the BloodLife application.

## Usage

BloodLife provides a user-friendly interface for managing blood donations, inventory, and donor information. Here are some guidelines on using the application:

- Donor Registration: Blood donors can register themselves by providing their personal details, address and contact information.

- Hospital Registration: Hospitals which receive can register themselves by providing their hospital details, address and contact information.

- Organization Registration: Different bloodbanks can register themselves by providing their organization details, address and contact information.

- Inventory Management: Track blood units, their blood types, given amount, donated amount and quantity available.

For detailed usage instructions and a comprehensive guide, refer to the user documentation.

## Technologies Used

- MongoDB - NoSQL database for storing data
- Express - Backend framework for building RESTful APIs
- React - Frontend framework for building user interfaces
- Node.js - JavaScript runtime environment for building scalable server-side applications
- JWT - JSON Web Token for user authentication and authorization
- Bcrypt - Password hashing library for secure password storage

## Live Link

The live project: [BloodLife](https://blood-life-jns26xt5g-ovisarkar62.vercel.app/login)
