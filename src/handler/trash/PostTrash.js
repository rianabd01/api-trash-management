/* eslint-disable camelcase */
const fs = require('fs');
const Path = require('path');
const randomstring = require('randomstring');
const sharp = require('sharp');
const sequelize = require('../../sequelize');
const { Trash, Pictures } = require('../../associations/index');
const getUserIdFromToken = require('../UserJWTVerification');

const postTrashHandler = async (request, h) => {
  const {
    title,
    description,
    city_id,
    address,
    location_url,
    gambar1,
    gambar2,
    gambar3,
  } = request.payload;

  // Check is user logged in
  const userId = await getUserIdFromToken(request);

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const trash = await Trash.create(
      {
        ...(userId && { user_uploader_id: userId }),
        title,
        description,
        city_id,
        address,
        location_url,
      },
      { transaction },
    );

    // Save image function
    const saveImage = async (image, trashId, index) => {
      const dirPath = Path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'uploads',
        'trash',
      );

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const extension = image.hapi.filename.split('.').pop();
      const imageName = `${Date.now()}_${randomstring.generate({
        length: 12,
        charset: 'alphabetic',
      })}${trashId}_${index}.${extension}`;

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
          await sharpInstance.toFile(imagePath);
        }
      } else {
        fs.writeFileSync(imagePath, fileBuffer);
      }

      const insertImagePath = `/uploads/trash/${imageName}`;
      await Pictures.create(
        { image_path: insertImagePath, trash_id: trashId },
        { transaction },
      );
    };

    // Save image usage
    await saveImage(gambar1, trash.trash_id, 1);
    await saveImage(gambar2, trash.trash_id, 2);
    await saveImage(gambar3, trash.trash_id, 3);

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
        error: error.message,
      })
      .code(500);
  }
};

module.exports = postTrashHandler;
