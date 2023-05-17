# BloodLife

BloodLife is an open-source project aimed at creating a web application for blood banks, and hospitals to manage and track blood donations, inventory, and donor information. This documentation provides an overview of the project, its features, and installation instructions.

## Features

BloodLife offers the following key features:

Donor Management: Maintain a database of blood donors, including their personal information, contact details, blood type, and donation history.

Inventory Tracking: Keep track of blood units, their blood types, and quantity available.

Reports and Analytics: Generate reports and analytics related to blood donations, inventory, and other relevant records.

## Installation

To set up BloodLife locally, follow these steps:

- Clone the repository:

      git clone https://github.com/OviSarkar62/BloodLife.git

- Install the required dependencies for backend:

      npm i express dotenv colors bcryptjs jsonwebtoken mongoose nodemon zxcvbn
     
- Navigate to the client directory: 

       cd client
    
- Install the dependencies for the client: 

       npm i react-router-dom redux react-redux axios antd @reduxjs/toolkit @fortawesome/react-fontawesome react-bootstrap moment
    
- Create a .env file in the root directory with the following environment variables:

1. MONGO_URI: The connection string for MongoDB. If using MongoDB Atlas, you can find this in the cluster details.

2. SALT_ROUNDS: A salt value.

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
Open http://localhost:3000 in your browser to access the application.
