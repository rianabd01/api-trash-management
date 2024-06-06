/* eslint-disable camelcase */
const fs = require('fs');
const Path = require('path');
const randomstring = require('randomstring');
const sharp = require('sharp');
const sequelize = require('../../sequelize');
const { ProofPictures, TrashProof } = require('../../associations/index');
const getUserIdFromToken = require('../UserJWTVerification');

const postTrashProofHandler = async (request, h) => {
  // eslint-disable-next-line object-curly-newline
  const { user_message, gambar1, gambar2, gambar3 } = request.payload;
  const { id } = request.params;

  // Check is user login
  const userId = await getUserIdFromToken(request);
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const trashProof = await TrashProof.create(
      {
        ...(userId && { user_id: userId }),
        trash_id: id,
        user_message,
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
        'proof',
      );

      // Compress Image
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      const extension = image.hapi.filename.split('.').pop();
      const imageName = `${Date.now()}_${randomstring.generate({
        length: 12,
        charset: 'alphabetic',
      })}${id}_${index}.${extension}`;

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
      // END COMPRESS

      const insertImagePath = `http://ec2-3-1-220-87.ap-southeast-1.compute.amazonaws.com/uploads/proof/${imageName}`;
      await ProofPictures.create(
        { image_path: insertImagePath, trash_proof_id: trashId },
        { transaction },
      );
    };

    // Using save image
    await saveImage(gambar1, trashProof.trash_proof_id, 1);
    await saveImage(gambar2, trashProof.trash_proof_id, 2);
    await saveImage(gambar3, trashProof.trash_proof_id, 3);

    await transaction.commit();

    return h
      .response({
        status: 'success',
        message: 'upload proof success!',
        data: {
          trash_proof_id: trashProof.trash_proof_id,
          trash_id: trashProof.trash_id,
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

module.exports = postTrashProofHandler;
