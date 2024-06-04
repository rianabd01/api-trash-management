# Trash Management API

This API provides endpoints for managing trash reports, including creating, listing, and viewing details of trash reports. Below is a detailed guide on how to use the API.

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

### 2. GET /trash/detail/

Retrieve detailed information about a specific trash report.

Request:

GET /trash/detail/:id
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
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/31/RENAmLfJrQZP1.png",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/31/ETeILNxFWfkM2.jpg",
      "http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/31/mPDarbeCikyi3.png"
    ]
  }
}
```

### 3. POST /trash

Create a new trash report. NULL values are disallowed for all fields.

Request:
POST /trash
title: (String) Title of the trash report.
description: (String) Description of the trash problem.
city_id: (Integer) ID of the city where the trash is located.
address: (String) Address of the trash location.
location_url: (String) URL to the location on a map.
gambar1: (File) Image file of the trash.
gambar2: (File) Image file of the trash.
gambar3: (File) Image file of the trash.

Example Request Body:

```json
{
  "title": "Sampah di Jalan",
  "description": "Tumpukan sampah di trotoar",
  "city_id": 1,
  "address": "Jl. Sudirman",
  "location_url": "https://maps.google.com?q=location",
  "gambar1": "file1.jpg",
  "gambar2": "file2.jpeg",
  "gambar3": "file3.png"
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

# Usage Examples

### Example 1: Get a list of trash reports in Jakarta

GET /trash?location=Jakarta&page=1

### Example 2: Get details of a specific trash report with ID 1

GET /trash/detail/1

### Example 3: Post a new trash report

POST /trash

```json
Content-Type: multipart/form-data

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

# Notes

- Ensure that the files (gambar1, gambar2, gambar3) are uploaded as multipart/form-data.
- The city_id should be a valid city ID from database.

- For successful data retrieval, use the correct endpoint and parameters.

**This documentation provides a comprehensive guide to the Trash Management API, facilitating effective integration and usage.**
