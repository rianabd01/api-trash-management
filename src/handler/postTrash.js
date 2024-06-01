/* eslint-disable camelcase */
/* eslint-disable comma-dangle */
const fs = require('fs');
const Path = require('path');
const sequelize = require('../sequelize');
const { Trash, Pictures } = require('../models/model');

const postTrashHandler = async (request, h) => {
  const { payload } = request;
  // eslint-disable-next-line object-curly-newline
  const {
    title,
    description,
    city_id,
    address,
    location_url,
    gambar1,
    gambar2,
    gambar3,
  } = payload;

  let transaction;
  try {
    // Mulai transaksi
    transaction = await sequelize.transaction();

    // Simpan data film
    const trash = await Trash.create(
      // eslint-disable-next-line object-curly-newline
      { title, description, city_id, address, location_url },
      { transaction }
    );

    // Fungsi untuk menyimpan gambar
    const saveImage = async (image, trashId, index) => {
      const dirPath = Path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        String(trashId)
      );
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      const imageName = `image-${index}.${image.hapi.filename
        .split('.')
        .pop()}`;
      const imagePath = Path.resolve(dirPath, imageName);
      const fileStream = image.pipe(fs.createWriteStream(imagePath));
      await new Promise((resolve, reject) => {
        fileStream.on('finish', resolve);
        fileStream.on('error', reject);
      });
      await Pictures.create(
        { image_path: imagePath, trash_id: trashId },
        { transaction }
      );
    };

    // Simpan gambar
    await saveImage(gambar1, trash.trash_id, 1);
    await saveImage(gambar2, trash.trash_id, 2);
    await saveImage(gambar3, trash.trash_id, 3);

    // Commit transaksi
    await transaction.commit();

    return h.response({ message: 'Upload berhasil!' }).code(201);
  } catch (error) {
    // Rollback transaksi jika ada error
    if (transaction) await transaction.rollback();
    console.error(error);
    return h.response({ message: 'Upload gagal!', error }).code(500);
  }
};

module.exports = postTrashHandler;
