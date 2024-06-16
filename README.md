# **Trash Management API**

## **Overview**

This API provides endpoints for managing trash reports, including creating, listing, and viewing details of trash reports. Below is a detailed guide on how to use the API.

## **Features**

- Register, OTP Verification with nodemailer (add your gmail and setting app password), Login with JWT
- Flexible Usage: Can post as a logged-in user or post anonymously if not logged in
- Automatic Data Removal: If a user has not verified their account, data will be automatically removed from the database using 'node-cron' (every 02:00 AM)
- Post Trash Reports
- Find Trash Location
- Post Finished Cleaning Trash
- Show Trash That Was Finished Cleaning

## **Installation**

### Requirements

- Node v20.13.1
- MySQL Server
- Postman

### Steps

1. **Install All Requirements**
   - Install Node.js v20.13.1
   - Install MySQL Server
   - Install Postman
2. **Import Database**
   - Import `./db.sql` to your MySQL Database
3. **Set .env**
   - Set your environment variables as specified in `.env.example`.
   - The email service must use Gmail and require an app password.
4. **Run Node.js**
   - Open Terminal and run `npm install`
   - Run `npm start` or `npm run start-dev`

## API Base URL

```
https://sure-api.riandev.xyz/ or your localhost:port
```

## API Endpoints

### 1. GET TRASH LIST

Retrieve a list of trash reports.

**Request:**

```
GET /trash?location={location}&page={page}
```

- **location**: (Optional) Filter by location (e.g., "Jakarta").
- **page**: (Optional) Page number for pagination (default is 1).

**Response JSON:**

```json
{
  "status": "success",
  "message": "success GET trash list",
  "results": [
    {
      "id": 22,
      "title": "Sampah kali",
      "description": "Banyak sampah plastik",
      "city": "Kota Jakarta Timur",
      "pictures": "https://sure-api.riandev.xyz/uploads/trash/1717715898683_goDRWdIqadOU22_1.jpg"
    },
    {
      "id": 23,
      "title": "Sampah pinggir jalan",
      "description": "Banyak sampah daun",
      "city": "Kota Jakarta Pusat",
      "pictures": "https://sure-api.riandev.xyz/uploads/trash/1717716867932_ZgqWSBBozhZe23_1.jpg"
    }
  ]
}
```

### 2. GET TRASH REPORT DETAIL

Retrieve detailed information about a specific trash report.

**Request:**

```
GET /trash/:id
```

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
      "https://sure-api.riandev.xyz/uploads/trash/1717716993077_LaTjfCiTisGo24_1.jpg",
      "https://sure-api.riandev.xyz/uploads/trash/1717716993094_GLMMwClAMirH24_2.png",
      "https://sure-api.riandev.xyz/uploads/trash/1717716993105_rTbUGGIONoWL24_3.png"
    ]
  }
}
```

### 3. GET FINISHED TRASH LIST

Retrieve a list of cleaned trash.

**Request:**

```
GET /finished?location={location}&page={page}&datesort={asc}
```

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

```
GET /finished/:id
```

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
      "https://sure-api.riandev.xyz/uploads/proof/1718016066108_zZcogMKVpoek5_1.jpg",
      "https://sure-api.riandev.xyz/uploads/proof/1718016066120_juHvvfcGEYmj5_2.png",
      "https://sure-api.riandev.xyz/uploads/proof/1718016066127_epDDpNNxUGpn5_3.png"
    ]
  }
}
```

### 5. GET CITIES

Retrieve a list of cities.

**Request:**

```
GET /cities
```

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

### 6. POST TRASH

Create a new trash report. NULL values are disallowed for all fields.

**Request:**

```
POST /trash
```

Headers:

```json
Authorization: `Bearer ${token}`,
```

**Notes:** Authorization is optional. If authorization is not found, you will post the trash report as anonymous.

**Body:**

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

### 7. POST TRASH PROOF

Create proof that trash is cleaned. NULL values are disallowed for all fields.

**Request:**

```
POST /trash/proof/:id
```

Headers:

```json
Authorization: `Bearer ${token}`,
```

**Notes:** Authorization is optional. If authorization is not found, you will post trash proof as anonymous.

**Body:**

```json
{
  "user_message": "Message from user",
  "gambar1": "file_image_1.jpg",
  "gambar2": "file_image_2.jpeg",
  "gambar3": "file_image_3.png"
}
```

**Response JSON:**

```json
{
  "status": "success",
  "message": "upload proof success!",
  "results": {
    "id": 5
  }
}
```

### 8. POST USER REGISTER

Register a new user.

**Request:**

```
POST /register
```

**Body:**

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

Verify OTP before login.

**Request:**

```
POST /verify-otp
```

**Body:**

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

Login user.

**Request:**

```
POST /login
```

**Body:**

```json
{
  "username": "user",
  "password": "user"
}
```

**Response JSON:**

```json
{
  "token": "token_login",
  "full_name": "User full_name"
}
```

## POSTMAN TEST

**Import the POSTMAN Collections:**

```
./Sure API Deploy.postman_collection.json
```

**Register Account with Postman**

- Register an account with Postman
- Verify your OTP with the OTP endpoint
- If you want to create an admin account, set the level field in the users table to 100 (Integer)

## Notes

- The city_id should be a valid city ID from the database.
- For successful data retrieval, use the correct endpoint and parameters.

**This documentation provides a comprehensive guide to the Trash Management API, facilitating effective integration and usage.**
