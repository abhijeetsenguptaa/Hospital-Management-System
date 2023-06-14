# API documentation Hospital-Management-System
This repository contains API documentation for Hospital-Management-System

### Overview Basic API endpoint Deployed
   ```
   {
    live : ,
    localCheck : http://localhost:8080
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

### Authorization :
This API uses Role based Authorization.
   - In order to perform user any crud in app, Token is required.
   - Token can be obtained by creating account and logging into the system.
   - No separate login routes for users and admins.
---

### User Registration :
   **URL :** `/users/register`\
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

### User-Login
   **URL :** `/users/login`\
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

### Reset-Password :
  **URL :**  `/users/reset`\
  **Method :** `PATCH`

  **Description :** This endpoint is used to reset password.

  **Parameters**
   ```
   {
    email: String,
    password: String,
   }
   ```

   **Response :**
   - 200 (OK):
     - Body: {"msg": "Password Reset Successful"}
     - Description: Indicates that the password reset was successful.

   - 404 (Not Found):
     - Body: {"msg": "User not found."}
     - Description: Indicates that the user with the provided email does not exist.

   - 500 (Internal Server Error):
     - Body: {"msg": "Internal Server Error"}
     - Description: Indicates that an internal server error occurred during the password reset process.

---

### Adding-Extra-Details :
  **URL :** `/users/extra`\
  **Method :** `PATCH`

  **Description :** This endpoint is used to add extra information for staffs.

  **Parameters**
  ```
  {
    specialization: {
      type: String,
      enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
    },
    position: {
      type: String,
      enum: ['Doctor', 'Nurse', 'Receptionist', 'Janitor', 'Pharmacist', 'Lab Technician', 'Administrative Staff', 'IT Support', 'Security Guard']
    },
    workingHours: String,
    salary: Number,
    department: {
      type: String,
      enum: ['Cardiology', 'Dermatology', 'Endocrinology', 'Gastroenterology', 'Neurology', 'Oncology', 'Pediatrics', 'Psychiatry', 'Surgery', 'Urology']
    }
  }
  ```

  **Responses :**
  - 200 (OK)
    - Body : {"msg" : "All the information have been saved."}
    - Description : Indicates that the extra data has been successfully added.

  - 500 (Internal Server Error)
    - Body : {"msg" : "Error in adding the information."}
    - Description : Indicates that the data could not be added to the information of the user.
---

### Fetching Users : 
  **URL :** `/users/`
  **Method :** `GET`

  **Description :** This endpoint is used to retrieve user information. It can return information for all users or filter users based on specific queries.

  **Parameters**
  
  | Field          | Value  | Description                                                                |
  |----------------|--------|----------------------------------------------------------------------------|
  | id             | String | (Optional) User ID to filter users by a specific ID.                       |
  | role           | String | (Optional) User role to filter users by a specific role.                   |
  | specialization | String | (Optional) User role to filter users by a specific specialization.         |
  | position       | String | (Optional) User role to filter users by a specific position.               |
  | gender         | String | (Optional) User role to filter users by a specific gender.                 |
  

  **Response :**
  - 200 (OK):
    - Body: JSON array of user objects
      - If no query parameters are provided, it returns information for all users.
      - If the `id` parameter is provided, it returns information for the user with the specified ID.
      - If the `role` parameter is provided, it returns information for users with the specified role.

  - 500 (Internal Server Error):
    - Body: `{"msg": "Error in retrieving user(s) information."}`
    - Description: Indicates that an error occurred while retrieving user information.

