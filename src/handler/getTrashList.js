const { Op } = require('sequelize');
const { Trash, Pictures, Cities } = require('../associations/index');

const getTrashList = async (request, h) => {
  const { location, page = 1 } = request.query;

  // Menghitung offset
  const limit = 20;
  const offset = (page - 1) * limit;

  try {
    const trashList = await Trash.findAll({
      include: [
        {
          model: Cities,
          as: 'cities',
          attributes: ['name'],
          where: location ? { name: { [Op.like]: `%${location}%` } } : {},
        },
        {
          model: Pictures,
          as: 'pictures',
          attributes: ['image_path'],
        },
      ],
      where: {
        is_verified: 1,
        is_deleted: 0,
      },

      limit, // Menetapkan limit
      offset, // Menetapkan offset
    });

    if (!trashList || trashList.length === 0) {
      return h
        .response({
          status: 'fail',
          message: 'trash list is not found',
        })
        .code(404);
    }

    const result = trashList.map((trash) => ({
      trash_id: trash.trash_id,
      title: trash.title,
      description: trash.description,
      city: trash.cities.name,
      pictures: trash.pictures.length > 0 ? trash.pictures[0].image_path : null,
    }));

    return h
      .response({
        status: 'success',
        message: 'success GET trash list',
        result,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'something wrong',
        error,
      })
      .code(500);
  }
};

module.exports = getTrashList;