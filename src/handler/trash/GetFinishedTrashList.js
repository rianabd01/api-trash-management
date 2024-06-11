const { Op } = require('sequelize');
const dotenv = require('dotenv');
const {
  Trash,
  Cities,
  TrashProof,
  ProofPictures,
} = require('../../associations/index');

dotenv.config();
const getFinishedTrashList = async (request, h) => {
  const { location, page = 1, datesort = 'desc' } = request.query;

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
          model: TrashProof,
          attributes: ['user_message', 'is_verified'],
          where: {
            is_verified: 1,
          },
          include: [
            {
              model: ProofPictures,
              as: 'proof_pictures',
              attributes: ['image_path'],
            },
          ],
        },
      ],
      where: {
        is_verified: 1,
        user_finisher_id: {
          [Op.ne]: '0',
        },
        is_deleted: 0,
      },
      order: [['created_at', datesort]],

      limit,
      offset,
    });

    // Check if trash list not found
    if (!trashList || trashList.length === 0) {
      return h
        .response({
          status: 'fail',
          message: 'trash list is not found',
        })
        .code(404);
    }

    // Result if trash found
    let serverHostURL = `${process.env.SERVER_HOST}`;
    if (process.env.SERVER_HOST === 'localhost') {
      serverHostURL += `:${process.env.SERVER_PORT}`;
    }

    const results = trashList.map((trash) => ({
      id: trash.trash_id,
      title: trash.title,
      finisher_message: trash.TrashProofs[0].user_message,
      city: trash.cities.name,
      pictures:
        trash.TrashProofs[0].proof_pictures.length > 0
          ? serverHostURL + trash.TrashProofs[0].proof_pictures[0].image_path
          : null,
    }));

    return h
      .response({
        status: 'success',
        message: 'success GET trash list',
        results,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'something wrong',
        error: error.message,
      })
      .code(500);
  }
};

module.exports = getFinishedTrashList;
