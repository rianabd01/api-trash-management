# Trash Management API

This API provides endpoints for managing trash reports, including creating, listing, and viewing details of trash reports. Below is a detailed guide on how to use the API.

## Requirements

Node.js Version: v20.13.1
Database Import: root folder ./db_sure.sql

## Usage Steps

- Make sure you have a correct node version
- Import the database ./db_sure.sql into your MySql Server
- Create .env like .env.examples (Fill all fields and view notes)
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
EMAIL_SERVICE='email@gmail.com'
SERVICE_EMAIL_PASSWORD='your_app_password'
```

**notes:** Setting your APP Pasword in your Google Email

## Base URL

http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/

## Endpoints

### 1. GET TRASH LIST

Retrieve a list of trash reports.

**Request:**
GET /trash?location={location}&page={page}$datesort={asc}

- **location**: (Optional) Filter by location (e.g., "Jakarta").
- **page**: (Optional) Page number for pagination (default is 1).
- **datesort**: (Optional) asc or desc (default is desc).

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET trash list",
  "resulst": [
    {
      "id": 22,
      "title": "Sampah kali",
      "description": "Banyak sampah plastik",
      "city": "Kota Jakarta Timur",
      "pictures": "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717715898683_goDRWdIqadOU22_1.jpg"
    },
    {
      "id": 23,
      "title": "Sampah pinggir jalan",
      "description": "Banyak sampah daun",
      "city": "Kota Jakarta Pusat",
      "pictures": "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716867932_ZgqWSBBozhZe23_1.jpg"
    }
  ]
}
```

### 2. GET TRASH REPORT DETAIL

Retrieve detailed information about a specific trash report.

**Request:**
GET /trash/:id
: The ID of the trash report.

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET detail",
  "results": {
    "id": 3,
    "title": "Sampah di gang",
    "description": "Sungainya penuh sampah, airnya sangat keruh. Plastik, botol, dan sisa makanan mengapung, mencemari air. Tercium bau tak sedap, dan mengganggu suasana. Pemandangan ini bikin saya prihatin, butuh perhatian dan aksi nyata agar kali kembali bersih.",
    "city": "Kota Jakarta Timur",
    "address": "Jl Ahmad Dahlan",
    "location_url": "maps.google.com",
    "uploader_id": 20,
    "uploader_name": "Rian Abd",
    "pictures": [
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993077_LaTjfCiTisGo24_1.jpg",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993094_GLMMwClAMirH24_2.png",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/trash/1717716993105_rTbUGGIONoWL24_3.png"
    ]
  }
}
```

### 3. GET FINISHED TRASH LIST

Retrieve a list of cleaned trash.

**Request:**
GET /finished?location={location}&page={page}$datesort={asc}

- **location**: (Optional) Filter by location (e.g., "Jakarta").
- **page**: (Optional) Page number for pagination (default is 1).
- **datesort**: (Optional) asc or desc (default is desc).

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET trash list",
  "results": [
    {
      "id": 4,
      "title": "Sampah menyumbat got",
      "finisher_message": "Sudah kami bersihkan bersama kawan-kawan komuniatas PeduliSampah. Kami harap kita semua lebih peduli untuk menjaga kebersihan. Jangan buang sampah sembarangan, mari kita rawat lingkungan bersama-sama. Jika kita semua berkontribusi, kali ini bisa tetap bersih dan indah.",
      "city": "Kecamatan Bekasi Timur",
      "pictures": "localhost:9000/uploads/proof/1717929579979_aEWDNVQfQaEV4_1.jpg"
    },
    {
      "id": 5,
      "title": "Sampah Jalan",
      "finisher_message": "Setelah melihat website sure, saya langsung bergegas dan membersihkan sampah yang ada dijalan. Sekarang sudah bersih dan juga sudah saya kasih tempat sampah sementara",
      "city": "Kecamatan Karangtengah",
      "pictures": "localhost:9000/uploads/proof/1718016066108_zZcogMKVpoek5_1.jpg"
    }
  ]
}
```

### 4. GET FINISHED TRASH DETAIL

Retrieve detailed information about a specific cleaned trash.

**Request:**
GET /finished/:id
: The ID of the trash report.

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET detail",
  "results": {
    "id": 5,
    "title": "Sampah Jalan",
    "finisher_message": "Setelah melihat website sure, saya langsung bergegas dan membersihkan sampah yang ada dijalan. Sekarang sudah bersih dan juga sudah saya kasih tempat sampah sementara",
    "city": "Kecamatan Karangtengah",
    "address": "Jl Sumatera",
    "location_url": "https://maps.app.goo.gl/FD5oPzubTZZv3nbf9",
    "finisher_id": 3,
    "finisher_name": "Seseorang",
    "pictures": [
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1718016066108_zZcogMKVpoek5_1.jpg",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1718016066120_juHvvfcGEYmj5_2.png",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/1718016066127_epDDpNNxUGpn5_3.png"
    ]
  }
}
```

### 5. GET CITIES

City List

**Request:**
GET /cities

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET cities",
  "results": {
    "Jakarta": [
      {
        "id": 1,
        "name": "Kota Jakarta Timur"
      }
    ],
    "Bogor": [
      {
        "id": 7,
        "name": "Kecamatan Bogor Timur"
      }
    ]
  }
}
```

### 6. POST /trash

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
  "results": {
    "id": 1
  }
}
```

### 7. POST TRASH PROOF /trash/proof/:id

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
  "status": "success",
  "message": "upload proof success!",
  "results": {
    "id": 5
  }
}
```

**notes:**
If user authorization is valid, the post trash proof have user_id data who upload. if invalid, set default anonymous uploader

**Response JSON:**

### 8. POST USER REGISTER

Register new user

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
  "message": "register success! Please check your email for OTP verification.",
  "results": {
    "id": 1
  }
}
```

### 9. POST USER OTP VERIFY

Verify otp before login

**Request:**
POST /verify-otp

Body:

```json
email: (Email) Must unique and valid.
otp: (INTEGER) Must valid from user email inbox.
```

```json
{
  "email": "useremail@email.com",
  "otp": "123456"
}
```

**Response JSON:**

```json
{
  "status": "success",
  "message": "OTP verified successfully"
}
```

### 10. POST USER LOGIN

Login user

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
  "token": "token_login",
  "full_name": "User full_name"
}
```

# POSTMAN TEST

**_Import the POSTMAN Collections :_** ./Sure API Test.postman_collection.json

# Notes

- Ensure that the files (gambar1, gambar2, gambar3) are uploaded as multipart/form-data.
- The city_id should be a valid city ID from database.

- For successful data retrieval, use the correct endpoint and parameters.

**This documentation provides a comprehensive guide to the Trash Management API, facilitating effective integration and usage.**
