/* eslint-disable camelcase */
const fs = require('fs');
const Path = require('path');
const randomstring = require('randomstring');
const sharp = require('sharp');
const sequelize = require('../sequelize');
const { Trash, Pictures } = require('../associations/index');

const postTrashHandler = async (request, h) => {
  const { payload } = request;
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

    // Simpan data trash
    const trash = await Trash.create(
      {
        title,
        description,
        city_id,
        address,
        location_url,
      },
      { transaction },
    );

    // Fungsi untuk menyimpan gambar
    const saveImage = async (image, trashId, index) => {
      const dirPath = Path.resolve(
        __dirname,
        '..',
        '..',
        'uploads',
        String(trashId),
      );

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const extension = image.hapi.filename.split('.').pop();
      const imageName = `${randomstring.generate({
        length: 12,
        charset: 'alphabetic',
      })}${index}.${extension}`;

      const imagePath = Path.resolve(dirPath, imageName);

      const fileBuffer = await new Promise((resolve, reject) => {
        const chunks = [];
        image.on('data', (chunk) => chunks.push(chunk));
        image.on('end', () => resolve(Buffer.concat(chunks)));
        image.on('error', reject);
      });

      const sharpInstance = sharp(fileBuffer);

      const metadata = await sharpInstance.metadata();
      if (fileBuffer.length > 300 * 1024) {
        if (metadata.format === 'jpeg' || metadata.format === 'jpg') {
          await sharpInstance.jpeg({ quality: 80 }).toFile(imagePath);
        } else if (metadata.format === 'png') {
          await sharpInstance.png({ compressionLevel: 8 }).toFile(imagePath);
        } else {
          await sharpInstance.toFile(imagePath); // Default behavior for other formats
        }
      } else {
        fs.writeFileSync(imagePath, fileBuffer);
      }

      const insertImagePath = `http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/${trashId}/${imageName}`;
      await Pictures.create(
        { image_path: insertImagePath, trash_id: trashId },
        { transaction },
      );
    };

    // Simpan gambar
    await saveImage(gambar1, trash.trash_id, 1);
    await saveImage(gambar2, trash.trash_id, 2);
    await saveImage(gambar3, trash.trash_id, 3);
    // Commit transaksi
    await transaction.commit();

    return h
      .response({
        status: 'success',
        message: 'upload success!',
        data: {
          trash_id: trash.trash_id,
        },
      })
      .code(201);
  } catch (error) {
    if (transaction) await transaction.rollback();
    return h
      .response({
        status: 'fail',
        message: 'upload failed!',
        error,
      })
      .code(500);
  }
};

module.exports = postTrashHandler;
