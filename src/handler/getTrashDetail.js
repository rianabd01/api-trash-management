// const Pictures = require('../models/pictures');
// const Trash = require('../models/trash');
const { Trash, Pictures } = require('../models/model');

const getTrashDetail = async (request, h) => {
  const { id } = request.params;
  try {
    const trash = await Trash.findByPk(id, {
      include: [
        {
          model: Pictures,
          as: 'pictures',
          attributes: ['image_path'],
        },
      ],
    });

    if (!trash) {
      return h.response({ message: 'Sampah tidak ditemukan' }).code(404);
    }

    const result = {
      id: trash.trash_id,
      title: trash.title,
      description: trash.description,
      city_id: trash.city_id,
      address: trash.address,
      location_url: trash.location_url,
      pictures: trash.pictures.map((picture) => picture.image_path),
    };

    return h.response(result).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: 'Terjadi kesalahan', error }).code(500);
  }
};

module.exports = getTrashDetail;
