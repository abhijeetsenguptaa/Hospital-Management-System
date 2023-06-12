# API documentation Hospital-Management-System
This repository contains API documentation for Hospital-Management-System

1. **Overview Basic API endpoint Deployed**
   ```
   {
    live : ,
    localCheck : http://localhost:8080/
   }
   ```

- For running the server locally
  - npm install
  - npm run server
  - You need to create a .env file and insert the following fields:- 
  ```
  {
    mongoUrl : Url of the database you want to connect,
    port : any port no. ,
    secret_key : for token generation
  }
  ```
---

2. **Authorization :** This API uses Role based Authorization.
   - In order to perform user any crud in app, Token is required.
   - Token can be obtained by creating account and logging into the system.
   - No separate login routes for users and admins.
---

3. **User Registration**\
   **URL :** `/register`\
   **Method :** `POST`

   **Description :** This endpoint is used to register a new user.

   **Parameters**
   ```
   {
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ['Patient', 'Staff'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Transgender']
    },
    dateOfBirth: String,
    contactInformation: String,
    address: String,
   }
   ```

   **Response**
   - 201 (Conflict):
     - Body: {"msg":"User's email-id already exists."}
     - Description: Indicates that the provided email address already exists in the system, and registration     cannot  proceed.

   - 200 (OK):
     - Body: {"msg":"User registered successfully."}
     - Description: Indicates that the user registration was successful.

   - 500 (Internal Server Error):
     - Body: {"msg":"Error in registration of the new User."}
     - Description: Indicates that an error occurred during the registration process.
---

4. **User-Login**\
   **URL :** `/login`\
   **Method :** `POST`

   **Description :** This endpoint is used for user login.

   **Parameters**
   ```
   {
    email: String,
    password: String,
   }
   ```

   **Response**
   - 200 (OK):
     - Body: {"msg": "Login Successful", "token": <user_token>}
     - Description: Indicates that the login was successful. The response includes a user token for authentication.

   - 404 (Not found):
     - Body: {"msg": "User not found."}
     - Description: Indicates that the user with the provided email does not exist.

   - 500 (Internal Server Error):
     - Body: {"msg": "Wrong Credentials"}
     - Description: Indicates that the provided credentials (email and password) are incorrect.
---

5. 