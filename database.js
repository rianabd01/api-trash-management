import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  })
  .promise();

// const getProvinces = async () => {
//   const [rows] = await pool.query(`
//   SELECT
//     *
//   FROM
//     province
//   `);

//   return rows;
// };

const getAllCity = async () => {
  const [rows] = await pool.query(
    `
  SELECT
    city.city_id, city.name AS city, province.name AS province
  FROM
    city
  INNER JOIN
    province ON city.province_id = province.province_id
  `
  );

  return rows;
};

const getAllTrash = async () => {
  const [rows] = await pool.query(
    `SELECT
      t.trash_id,
      t.title,
      t.description,
      c.name AS city_name,
      p.name AS province_name,
      JSON_ARRAYAGG(JSON_OBJECT('picture_id', pic.picture_id, 'path', pic.image_path)) AS pictures,
      u.full_name AS user_uploader
    FROM 
      trash t 
    JOIN 
      users u ON t.user_uploader_id = u.user_id
    JOIN 
      cities c ON t.city_id = c.city_id 
    JOIN 
      provinces p ON c.province_id = p.province_id 
    LEFT JOIN 
      trash_pictures pic ON t.trash_id = pic.trash_id
    WHERE 
      t.is_deleted = 0
    AND
      t.is_verified = 1 
    AND
      NOT EXISTS (
        SELECT 1
        FROM trash_proof tp
        WHERE tp.trash_id = t.trash_id
      )
    GROUP BY
      t.trash_id, t.title, t.description, c.name, p.name`
  );

  const stringifydata = rows;
  return stringifydata;
};
const getTrashUnderWorking = async () => {
  const [rows] = await pool.query(
    `SELECT
      t.trash_id,
      t.title,
      t.description,
      c.name AS city_name,
      p.name AS province_name,
      JSON_ARRAYAGG(JSON_OBJECT('picture_id', pic.picture_id, 'path', pic.image_path)) AS pictures,
      u.full_name AS user_uploader
    FROM 
      trash t 
    JOIN 
      users u ON t.user_uploader_id = u.user_id
    JOIN 
      cities c ON t.city_id = c.city_id 
    JOIN 
      provinces p ON c.province_id = p.province_id 
    LEFT JOIN 
      trash_pictures pic ON t.trash_id = pic.trash_id
    WHERE 
      t.is_deleted = 0
    AND
      t.is_verified = 1 
    AND
      EXISTS (
        SELECT 1
        FROM trash_proof tp
        WHERE tp.trash_id = t.trash_id
        AND tp.is_verified = 0
      )
    GROUP BY
      t.trash_id, t.title, t.description, c.name, p.name`
  );

  const stringifydata = rows;
  return stringifydata;
};
const getFinishedTrash = async () => {
  const [rows] = await pool.query(
    `SELECT
      t.trash_id,
      t.title,
      t.description,
      c.name AS city_name,
      p.name AS province_name,
      JSON_ARRAYAGG(JSON_OBJECT('picture_id', pic.picture_id, 'path', pic.image_path)) AS pictures,
      u.full_name AS user_uploader
    FROM 
      trash t 
    JOIN 
      users u ON t.user_uploader_id = u.user_id
    JOIN 
      cities c ON t.city_id = c.city_id 
    JOIN 
      provinces p ON c.province_id = p.province_id 
    LEFT JOIN 
      trash_pictures pic ON t.trash_id = pic.trash_id
    WHERE 
      t.is_deleted = 0
    AND
      t.is_verified = 1 
    AND
      EXISTS (
        SELECT 1
        FROM trash_proof tp
        WHERE tp.trash_id = t.trash_id
        AND tp.is_verified = 1
      )
    GROUP BY
      t.trash_id, t.title, t.description, c.name, p.name`
  );

  const stringifydata = rows;
  return stringifydata;
};

const getTrashDetail = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
    t.trash_id,
    t.title, 
    t.description, 
    c.name AS city_name, 
    p.name AS province_name,
    u.first_name AS user_uploader,
    t.location_url,
    t.address
  FROM 
    trash t 
  JOIN
    users u ON t.user_uploader_id = u.user_id
  JOIN 
    city c ON t.city_id = c.city_id 
  JOIN 
    province p ON c.province_id = p.province_id 
  WHERE 
    t.trash_id = ?
  AND
    t.is_deleted = 0
  AND
    t.is_accepted = 1 
  AND 
    t.is_finished = 0`,
    [id]
  );

  return rows[0];
};

const getUserUploadHistory = async (id) => {
  const [rows] = await pool.query(
    `SELECT 
    t.trash_id,
    t.title, 
    t.description, 
    c.name AS city_name, 
    p.name AS province_name,
    u.first_name AS user_uploader,
    t.location_url,
    t.address
  FROM 
    trash t 
  JOIN
    users u ON t.user_uploader_id = u.user_id
  JOIN 
    cities c ON t.city_id = c.city_id 
  JOIN 
    province p ON c.province_id = p.province_id 
  WHERE 
    t.user_uploader_id = ?
  AND
    t.is_deleted = 0
  AND
    t.is_accepted = 1 
  AND 
    t.is_finished = 0`,
    [id]
  );

  return rows;
};

// const dataProvince = await getProvinces();
// const searchCity = await getAllCity();
const dataTrash = getAllTrash();
const dataUnderWorking = await getTrashUnderWorking();
const datafinished = await getFinishedTrash();
// const detaildata = await getTrashDetail(1);
// const userUploadHistory = await getUserUploadHistory(1);

// console.log('dataProvince =', dataProvince);
// console.log('cityList =', searchCity);
console.log('sampah perlu dibersihkan =', dataTrash);
console.log('sedang dikerjakan =', dataUnderWorking);
console.log('sudah dikerjakan =', datafinished);
// console.log('detaildata =', detaildata);
// console.log('userUploadHistory =', userUploadHistory);
