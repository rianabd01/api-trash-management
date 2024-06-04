const sharp = require('sharp');

const compressImage = async (image) => {
  const imageMetadata = await sharp(image).metadata();

  let compressedImageBuffer;

  if (imageMetadata.format === 'jpeg') {
    compressedImageBuffer = await sharp(image)
      .resize({ width: 800 }) // Sesuaikan ukuran sesuai kebutuhan
      .jpeg({ quality: 80 }) // Sesuaikan kualitas sesuai kebutuhan
      .toBuffer();
  } else if (imageMetadata.format === 'png') {
    compressedImageBuffer = await sharp(image)
      .resize({ width: 800 }) // Sesuaikan ukuran sesuai kebutuhan
      .png({ quality: 80, compressionLevel: 9 }) // Sesuaikan kualitas dan tingkat kompresi
      .toBuffer();
  } else {
    // Jika format tidak didukung, kembalikan buffer asli
    compressedImageBuffer = await sharp(image).toBuffer();
  }

  return compressedImageBuffer;
};

module.exports = compressImage;
