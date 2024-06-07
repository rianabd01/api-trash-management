# Trash Management API

This API provides endpoints for managing trash reports, including creating, listing, and viewing details of trash reports. Below is a detailed guide on how to use the API.

## Requirements

Node.js Version: v20.13.1
Database Import: root folder ./db_sure.sql

## Usage Steps

- Make sure you have a correct node version
- Import the database ./db_sure.sql into your MySql Server
- Create .env like .env.examples (Fill all fields)
- And then run the server with Dev: npm run start-dev or npm start

**ENV**

```json
SERVER_PORT= 9000
SERVER_HOST='localhost'
MYSQL_HOST='localhost'
MYSQL_USER='root'
MYSQL_PASSWORD='pass'
MYSQL_DB='sure_application'
JWT_KEY='your_jwt_key'
```

## Base URL

http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/

## Endpoints

### 1. GET /trash

Retrieve a list of trash reports.

**Request:**
GET /trash?location={location}&page={page}

- **location**: (Optional) Filter by location (e.g., "Jakarta").
- **page**: (Optional) Page number for pagination (default is 1).

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET trash list",
  "result": [
    {
      "trash_id": 22,
      "title": "Sampah kali",
      "description": "Banyak sampah plastik",
      "city": "Kota Jakarta Timur",
      "pictures": "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717715898683_goDRWdIqadOU22_1.jpg"
    },
    {
      "trash_id": 23,
      "title": "Sampah pinggir jalan",
      "description": "Banyak sampah daun",
      "city": "Kota Jakarta Pusat",
      "pictures": "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716867932_ZgqWSBBozhZe23_1.jpg"
    }
  ]
}
```

### 2. GET DETAIL /trash

Retrieve detailed information about a specific trash report.

**Request:**
GET /trash/:id
: The ID of the trash report.

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET detail",
  "result": {
    "id": 1,
    "title": "Sampah",
    "description": "Banyak sampah plastik",
    "city_id": 1,
    "address": "Jl Ahmad Dahlan",
    "location_url": "maps.google.com",
    "uploader_id": 3,
    "uploader": "Seseorang",
    "pictures": [
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993077_LaTjfCiTisGo24_1.jpg",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993094_GLMMwClAMirH24_2.png",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993105_rTbUGGIONoWL24_3.png"
    ],
    "is_proofed": 1, // If anyone sending proof, it will be 1 (true)
    "is_finished": 1 // If proof sended by anyone and verified by admin, it will be 1 (true)
  }
}
```

### 3. POST /trash

Create a new trash report. NULL values are disallowed for all fields.

**Request:**
Headers:

```json
Content-Type: multipart/form-data,
Authorization: `Bearer ${token}`,
```

Body:

```json
title: (String) Title of the trash report.
description: (String) Description of the trash problem.
city_id: (Integer) ID of the city where the trash is located.
address: (String) Address of the trash location.
location_url: (String) URL to the location on a map.
gambar1: (File) Image file of the trash.
gambar2: (File) Image file of the trash.
gambar3: (File) Image file of the trash.
```

**notes:**
If user authorization is valid, the post trash have user_id data who upload. if invalid, set default anonymous uploader

```json
{
  "title": "Sampah di Jalan",
  "description": "Tumpukan sampah di trotoar",
  "city_id": 1, // ForeignKey city_id available from 1 - 48 in database
  "address": "Jl. Sudirman",
  "location_url": "https://maps.google.com?q=location",
  "gambar1": "file_image_1.jpg",
  "gambar2": "file_image_2.jpeg",
  "gambar3": "file_image_3.png"
}
```

**Response JSON:**

```json
{
  "status": "success",
  "message": "upload success!",
  "data": {
    "trash_id": 1
  }
}
```

### 4. POST TRASH PROOF /trash/proof/:id

Create a proof if trash is cleaned. NULL values are disallowed for all fields.

**Request:**
Headers:

```json
Content-Type: multipart/form-data,
Authorization: `Bearer ${token}`,
```

Body:

```json
user_message: (String) Message from user.
gambar1: (File) Image file of cleaned trash.
gambar2: (File) Image file of cleaned trash.
gambar3: (File) Image file of cleaned trash.
```

```json
{
  "user_message": "Sudah saya bersihkan",
  "gambar1": "file_image_1.jpg",
  "gambar2": "file_image_2.jpeg",
  "gambar3": "file_image_3.png"
}
```

**notes:**
If user authorization is valid, the post trash proof have user_id data who upload. if invalid, set default anonymous uploader

**Response JSON:**

```json
{
  "status": "success",
  "message": "upload proof success!",
  "data": {
    "trash_proof_id": 16,
    "trash_id": "24"
  }
}
```

### 5. POST USER REGISTER /register

Retrieve detailed information about a specific trash report.

**Request:**
POST /register

Body:

```json
full_name: (String) User full name.
date_of_birth: (Date) User date of birth.
email: (Email) Must unique and valid.
username: (String) Must unique.
password: (String) up to you.
```

```json
{
  "full_name": "User full name",
  "date_of_birth": "2002-08-05",
  "email": "user@email.com",
  "username": "user",
  "password": "user"
}
```

**Response JSON:**

```json
{
  "status": "success",
  "message": "register success!",
  "data": {
    "user_id": 19,
    "full_name": "User fullname",
    "username": "user"
  }
}
```

### 5. POST USER LOGIN /login

Login

**Request:**
POST /login

Body:

```json
username: (String) Must valid.
password: (String) Must valid.
```

**Response JSON:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjAsInVzZXJuYW1lIjoicmlhbmFiZDAxIiwiaWF0IjoxNzE3NzMwOTM0LCJleHAiOjE3MjAzMjI5MzR9.a3DAMqjssEoJGksFo05ahECLGf_c4QqRstPqT9asOxY",
  "full_name": "User full_name"
}
```

# Usage Examples

### Example 1: Get a list of trash reports in Jakarta

GET /trash?location=Jakarta&page=1

### Example 2: Get details of a specific trash report with ID 1

GET /trash/1

# Notes

- Ensure that the files (gambar1, gambar2, gambar3) are uploaded as multipart/form-data.
- The city_id should be a valid city ID from database.

- For successful data retrieval, use the correct endpoint and parameters.

**This documentation provides a comprehensive guide to the Trash Management API, facilitating effective integration and usage.**
