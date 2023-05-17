# BloodLife

BloodLife is an open-source project aimed at creating a web application for blood banks, and hospitals to manage and track blood donations, inventory, and donor information. This documentation provides an overview of the project, its features, and installation instructions.

## Features

BloodLife offers the following key features:

1. Donor Management: Maintain a database of blood donors, including their personal information, contact details, blood type, and donation history.

2. Inventory Tracking: Keep track of blood units, their blood types, and quantity available.

3. Reports and Analytics: Generate reports and analytics related to blood donations, inventory, and other relevant records.

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

1. DB_URL: The connection string for MongoDB. If using MongoDB Atlas, you can find this in the cluster details.

2. JWT_SECRET: A secret value.

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
- Access the application. Open your web browser and visit http://localhost:3000 to access the BloodLife application.
