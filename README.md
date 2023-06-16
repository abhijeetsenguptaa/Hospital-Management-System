# API documentation Hospital-Management-System
This repository contains API documentation for Hospital-Management-System

### Overview Basic API endpoint Deployed
   ```
   {
    live : https://hosiptal-management-system.onrender.com,
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
   
   | Field              | Type   | Enum                                                        | Description                                      |
   |--------------------|--------|-------------------------------------------------------------|--------------------------------------------------|
   | name               | String |                                                             | The name of the user.                            |
   | email              | String |                                                             | The email of the user.                           |
   | password           | String |                                                             | The password of the user.                        |
   | role               | String | Patient, Staff                                              | The role of the user (Patient or Staff).          |
   | gender             | String | Male, Female, Transgender                                   | The gender of the user.                          |
   | dateOfBirth        | String |                                                             | The date of birth of the user.                    |
   | contactInformation | String |                                                             | The contact information of the user.             |
   | address            | String |                                                             | The address of the user.                         |

   **Response**
   - 409 (Conflict):
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

   | Field    | Type   | Description               |
   |----------|--------|---------------------------|
   | email    | String | The email of the user.    |
   | password | String | The password of the user. |

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

  | Field    | Type   | Description               |
  |----------|--------|---------------------------|
  | email    | String | The email of the user.    |
  | password | String | The new password of the user. |

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

  | Field         | Type    | Enum                                                                                                    |
  |---------------|---------|---------------------------------------------------------------------------------------------------------|
  | specialization| String  | Cardiology, Dermatology, Endocrinology, Gastroenterology, Neurology, Oncology, Pediatrics, Psychiatry,   Surgery, Urology |
  | position      | String  | Doctor, Nurse, Receptionist, Janitor, Pharmacist, Lab Technician, Administrative Staff, IT Support, Security   Guard |
  | workingHours  | String  |                                                                                                         |
  | salary        | Number  |                                                                                                         |
  | department    | String  | Cardiology, Dermatology, Endocrinology, Gastroenterology, Neurology, Oncology, Pediatrics, Psychiatry,   Surgery, Urology |

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
  | specialization | String | (Optional) User specialization to filter users by a specific specialization.         |
  | position       | String | (Optional) User position to filter users by a specific position.               |
  | gender         | String | (Optional) User gender to filter users by a specific gender.                 |
  

  **Response :**
  - 200 (OK):
    - Body: JSON array of user objects
      - If no query parameters are provided, it returns information for all users.
      - If the `id` parameter is provided, it returns information for the user with the specified ID.
      - If the `role` parameter is provided, it returns information for users with the specified role.
      - If the `specialization` parameter is provided, it returns information for users with the specified specialization.
      - If the `position` parameter is provided, it returns information for users with the specified position.
      - If the `gender` parameter is provided, it returns information for users with the specified gender.

  - 500 (Internal Server Error):
    - Body: `{"msg": "Error in retrieving user(s) information."}`
    - Description: Indicates that an error occurred while retrieving user information.
---

### Booking-Appointment
  **URL :** `/appointments/:id`
  **Method :** `POST`

  **Description :** This endpoint is used to book an appointment with a specific user identified by the id parameter.

  **Parameters**

  | Field   | Type   | Enum                     | Description                                        |
  |---------|--------|--------------------------|----------------------------------------------------|
  | date    | String |                          | The date of the appointment.                        |
  | time    | String |                          | The time of the appointment.                        |
  | purpose | String |                          | The purpose or reason for the appointment.          |
  | status  | String | Confirmed, Canceled      | The status of the appointment (Confirmed or Canceled). |

  **Responses :**
  - 201 (Created):
    - Body: {"msg": "Appointment booked successfully."}
    - Description: Indicates that the appointment was booked successfully.

  - 409 (Conflict):
    - Body: {"msg": "Slot is already booked."}
    - Description: Indicates that the specified slot is already booked and cannot be reserved.


  - 500 (Internal Server Error):
    - Body: {"msg": "Error in booking the appointment."}
    - Description: Indicates that an error occurred while booking the appointment.
---

### Update Appointment
  **URL :** `/appointments/update/:id`
  **Method :** `PATCH`

  **Description :** This endpoint is used to update the date, time, or status of an appointment with the specified id parameter.

  **Parameters**
  | Field | Value | Description |
  |-------|-------|-------------|
  | id	| String	| Appointment ID to identify the appointment. |
  | date	| Date	| (Optional) Updated date of the appointment. |
  | time	| String	| (Optional) Updated time of the appointment. |
  | status	| String	| (Optional) Updated status of the appointment. |

  **Responses :**
  - 200 (OK):
    - Body: {"msg": "Appointment updated successfully."}
    - Description: Indicates that the appointment was updated successfully.

  - 409 (Conflict):
    - Body: {"msg": "Slot is already booked."}
    - Description: Indicates that the specified slot is already booked and cannot be updated.

  - 500 (Internal Server Error):
    - Body: {"msg": "Error in updating the appointment."}
    - Description: Indicates that an error occurred while updating the appointment.
---

### Delete Appointment
  **URL :** `/appointments/:id`
  **Method :** `DELETE`
  
  **Description :**This endpoint is used to delete an appointment with the specified `id` parameter.

  **Parameters**
  
  | Field | Value  | Description                               |
  |-------|--------|-------------------------------------------|
  | id    | String | Appointment ID to identify the appointment.|

  **Responses :**

  - 200 (OK):
    - Body: `{"msg": "Appointment deleted successfully."}`
    - Description: Indicates that the appointment was deleted successfully.

  - 500 (Internal Server Error):
    - Body: `{"msg": "Error in deleting the appointment."}`
    - Description: Indicates that an error occurred while deleting the appointment.
---

### Get Appointment
  **URL :** `/appointments/`
  **Method :** `GET`

  **Description :**This endpoint is used to retrieve appointments. It can return information for all users or filter users based on specific queries.

  **Parameters**

  | Field	  | Value	  | Description                                               |
  |---------|---------|-----------------------------------------------------------|
  | date	  | String	| (Optional) Date of the appointment.                       |
  | purpose | String	| (Optional) Purpose of the appointment.                    |
  | status  | String	| (Optional) Status of the appointment.                     |
  | id      | String	| (Optional) Appointment ID to fetch a specific appointment.|

  **Responses :**
  - 200 (OK):
    - Body: JSON array of appointment objects
      - If no query parameters are provided, it returns information for all appointments.
      - If the `id` parameter is provided, it returns information for the appointment with the specified ID.
      - If the `date` parameter is provided, it returns information for the appointments with the specified date.
      - If the `status` parameter is provided, it returns information for the appointments with the specified status.
      - If the `purpose` parameter is provided, it returns information for the appointments with the specified purpose.
  
  - 500 (Internal Server Error):
    - Body: `{"msg": "Error in fetching the details of the Appointment"}`
    - Description: Indicates that an error occurred while retrieving user information.
---

### Prescribing Medicines
  **URL :** `/medicines/:id`
  **Method :** `POST`

  **Description :** This endpoint is used to prescribe medicines and add the treatment for a specific appointment.

  **Parameters :**

  | Field	      | Value	     | Description                                | 
  |-------------|------------|--------------------------------------------|
  | id	        | String	   | Appointment ID to prescribe medicines for. | 
  | date	      | String	   | Date of the prescription.                  | 
  | diagnosis	  | String	   | Diagnosis of the patient.                  | 
  | medications	| String	   | Medications prescribed for the patient.    | 
  | testResults	| String	   | Test results of the patient.               | 
  | treatment	  | String	   | Treatment plan for the patient.            | 


  **Responses :**
  - 200 (OK)
    - Body : {"msg" : "Medicines prescribed successfully."}
    - Description : Indicates that the medicines have been successfully prescribed for the appointment.
  
  - 500 (Internal Server Error):
    - Body : Error in prescribing medicines
    - Description: Indicates that an error occurred while prescribing the medicines.
---

### Update Medicines
  **URL :** `/medicines/:id`
  **Method :** `PATCH`

  **Description :** This endpoint is used to update the prescription details of a medicine for a specific appointment.

  **Parameters :**

  | Field	                | Value	     | Description                                | 
  |-----------------------|------------|--------------------------------------------|
  | id	                  | String	   | Medical Report ID to prescribe medicines for. |

  **Responses :**
  - 200 (OK):
    - Body: {"msg": "Medicine updated successfully."}
    - Description: Indicates that the medicine prescription for the appointment was successfully updated.

  - 500 (Internal Server Error):
    - Body: {"msg": "Error in updating the medicine."}
    - Description: Indicates that an error occurred while updating the medicine prescription.
---

### Deleting Medicines
  **URL :** `/medicines/:id`
  **Method :** `DELETE`

  **Description :** This endpoint is used to delete a specific medicine from the system.

  **Parameters :**

  | Field	                | Value	     | Description                                | 
  |-----------------------|------------|--------------------------------------------|
  | id	                  | String	   | Medical Report ID to prescribe medicines for. |

  **Responses :**
  - 200 (OK):
    - Body: {"msg": "Medicine deleted successfully."}
    - Description:  Indicates that the medicine has been successfully deleted from the system.

  - 500 (Internal Server Error):
    - Body: {"msg": "Error in deleting the medicine."}
    - Description: Indicates that an error occurred while deleting the medicine prescription.
---

### Fetching Medicinal Reports
  **URL :** `/medicines/`
  **Method :** `GET`

  **Description :** This endpoint is used to get all the  medical reports from the system or can also filter out by using id or date as query.

  **Parameters :**

  | Field	                | Value	     | Description                                | 
  |-----------------------|------------|--------------------------------------------|
  | id	                  | String	   | Medical Report ID to get medicines for.    |
  | date                  | String     | Medical Report Date to get medicines for.  |

  **Responses :**
  - 200 (OK):
    - Body: {"msg": "Medicine retrieved successfully."}
    - Description: Indicates that the medicine prescription has been successfully retrieved from the system.

  - 500 (Internal Server Error):
    - Body: {"msg": "Error in retrieving the medicine."}
    - Description: Indicates that an error occurred while retrieving the medicine prescription.

  **For a query with ID and date:**
  - 200 (OK):
    - Body: {"msg": "Medicine found."}
    - Description: Indicates that the medicine prescription with the specified ID and date was found in the system.

  - 404 (Not Found):
    - Body: {"msg": "Medicine not found."}
    - Description: Indicates that the medicine prescription with the specified ID and date was not found in the system.

  - 500 (Internal Server Error):
    - Body: {"msg": "Error in querying the medicine."}
    - Description: Indicates that an error occurred while querying the medicine prescription based on ID and date.
