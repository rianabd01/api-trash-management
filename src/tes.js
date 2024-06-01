require('dotenv').config();
const Hapi = require('@hapi/hapi');
const { Sequelize, DataTypes } = require('sequelize');
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Trash = sequelize.define('Trash', {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  city_id: DataTypes.INTEGER,
  address: DataTypes.STRING,
  location_url: DataTypes.STRING,
});

const Picture = sequelize.define('Picture', {
  image_path: DataTypes.STRING,
  trash_id: DataTypes.INTEGER,
});

Trash.hasMany(Picture, { foreignKey: 'trash_id', as: 'pictures' });
Picture.belongsTo(Trash, { foreignKey: 'trash_id', as: 'trash' });

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + '-' + file.originalname);
    },
  }),
}).fields([
  { name: 'gambar1', maxCount: 1 },
  { name: 'gambar2', maxCount: 1 },
  { name: 'gambar3', maxCount: 1 },
]);

const postTrashHandler = async (request, h) => {
  const { title, description, city_id, address, location_url } =
    request.payload;

  if (
    !title ||
    !description ||
    !city_id ||
    !address ||
    !location_url ||
    !request.files.gambar1 ||
    !request.files.gambar2 ||
    !request.files.gambar3
  ) {
    return h.response({ message: 'Semua field harus diisi!' }).code(400);
  }

  let transaction;
  try {
    // Mulai transaksi
    transaction = await sequelize.transaction();

    // Simpan data trash
    const trash = await Trash.create(
      { title, description, city_id, address, location_url },
      { transaction }
    );

    // Fungsi untuk menyimpan gambar
    const saveImage = async (file, trashId) => {
      await Picture.create(
        { image_path: file.location, trash_id: trashId },
        { transaction }
      );
    };

    // Simpan gambar
    await saveImage(request.files.gambar1[0], trash.trash_id);
    await saveImage(request.files.gambar2[0], trash.trash_id);
    await saveImage(request.files.gambar3[0], trash.trash_id);

    // Commit transaksi
    await transaction.commit();

    return h
      .response({ message: 'Upload berhasil!', trashId: trash.trash_id })
      .code(201);
  } catch (error) {
    // Rollback transaksi jika ada error
    if (transaction) await transaction.rollback();
    console.error(error);
    return h
      .response({ message: 'Upload gagal!', error: error.message })
      .code(500);
  }
};

const getTrashHandler = async (request, h) => {
  const { id } = request.params;

  try {
    const trash = await Trash.findByPk(id, {
      include: {
        model: Picture,
        as: 'pictures',
      },
    });

    if (!trash) {
      return h.response({ error: 'Trash not found' }).code(404);
    }

    const images = trash.pictures.map((picture) => picture.image_path);

    return h
      .response({
        trash_id: trash.trash_id,
        title: trash.title,
        description: trash.description,
        city_id: trash.city_id,
        address: trash.address,
        location_url: trash.location_url,
        images,
      })
      .code(200);
  } catch (error) {
    console.error(error);
    return h.response({ error: 'Failed to fetch trash data' }).code(500);
  }
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route({
    method: 'POST',
    path: '/upload',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 10 * 1024 * 1024, // Set maximum file size to 10 MB
      },
      pre: [
        {
          method: (request, h) => {
            return new Promise((resolve, reject) => {
              upload(request, request.raw.res, (err) => {
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          },
          assign: 'fileUploads',
        },
      ],
    },
    handler: postTrashHandler,
  });

  server.route({
    method: 'GET',
    path: '/trash/{id}',
    handler: getTrashHandler,
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
