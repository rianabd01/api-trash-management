# Trash Management API

This API provides endpoints for managing trash reports, including creating, listing, and viewing details of trash reports. Below is a detailed guide on how to use the API.

## Requirements

Node.js Version: v20.13.1
Database Import: root folder ./db_sure.sql

**ENV**

```json
MYSQL_HOST='your_mysql_host'
MYSQL_USER='your_mysql_username'
MYSQL_PASSWORD='your_mysql_password'
MYSQL_DB='your_mysql_database'
JWT_KEY='your_jwt_key'
SERVER_HOST_URL='your_server_host'
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
      "trash_id": 1,
      "title": "Sampah Jalan",
      "description": "Menyumbat saluran pembuangan air",
      "city": "Jakarta Pusat"
    },
    {
      "trash_id": 2,
      "title": "Sampah Kali",
      "description": "Menyumbat irigasi",
      "city": "Kota Bogor"
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

Example Request Body:

```json
{
  "title": "Sampah di Jalan",
  "description": "Tumpukan sampah di trotoar",
  "city_id": 1,
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

Example Request Body:

```json
{
  "user_message": "Sudah saya bersihkan",
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
  "data": {
    "trash_proof_id": 16,
    "trash_id": "24"
  }
}
```

# Usage Examples

### Example 1: Get a list of trash reports in Jakarta

GET /trash?location=Jakarta&page=1

### Example 2: Get details of a specific trash report with ID 1

GET /trash/1

### Example 3: Post a new trash report

POST /trash

```json
Content-Type: multipart/form-data,
Authorization: `Bearer ${token}`, // Included token JWT in headers Authorization

{
    "title": "Sampah di Kali",
    "description": "Sampah menumpuk di kali",
    "city_id": 2,
    "address": "Jl. Kali Pasir",
    "location_url": "https://maps.google.com?q=location",
    "gambar1": "sampah1.jpg",
    "gambar2": "sampah2.jpg",
    "gambar3": "sampah3.jpg"
}
```

### Example 4: Post a cleaned proof

POST /trash/proof/:id

```json
Content-Type: multipart/form-data,
Authorization: `Bearer ${token}`, // Included token JWT in headers Authorization

{
    "user_message": "sudah dibersihkan",
    "gambar1": "sampah1.jpg",
    "gambar2": "sampah2.jpg",
    "gambar3": "sampah3.jpg"
}
```

# Notes

- Ensure that the files (gambar1, gambar2, gambar3) are uploaded as multipart/form-data.
- The city_id should be a valid city ID from database.

- For successful data retrieval, use the correct endpoint and parameters.

**This documentation provides a comprehensive guide to the Trash Management API, facilitating effective integration and usage.**
