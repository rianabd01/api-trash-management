const pool = require('./db');

const uploadTrashHandler = async (request, h) => {
  const { title, description, city_id, address, location_url } =
    request.payload;

  try {
    const [result] = await pool.query(
      'INSERT INTO trash (title, description, city_id, address, location_url) VALUES (?, ?, ?, ?, ?)',
      [title, description, city_id, address, location_url]
    );

    if (result.affectedRows > 0) {
      const response = h.response({
        status: 'success',
        message: 'Sampah berhasil ditambahkan',
        data: {
          trashId: result.insertId,
        },
      });
      response.code(201);
      return response;
    }

    const response = h.response({
      status: 'fail',
      message: 'Sampah gagal ditambahkan',
    });
    response.code(500);
    return response;
  } catch (error) {
    const response = h.response({
      status: 'error',
      message: 'Terjadi kesalahan pada server',
    });
    response.code(500);
    console.error(error);
    return response;
  }
};

module.exports = { uploadTrashHandler };
