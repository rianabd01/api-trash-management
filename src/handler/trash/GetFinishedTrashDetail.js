const dotenv = require('dotenv');
const { Op } = require('sequelize');
const {
  Trash,
  Cities,
  Users,
  TrashProof,
  ProofPictures,
} = require('../../associations/index');

dotenv.config();
const getFinishedTrashDetail = async (request, h) => {
  const { id } = request.params;

  try {
    const trash = await Trash.findOne({
      where: {
        trash_id: id,
        is_verified: 1,
        user_finisher_id: {
          [Op.ne]: '0',
        },
        is_deleted: 0,
      },
      include: [
        {
          model: Cities,
          as: 'cities',
          attributes: ['name'],
        },
        {
          model: Users,
          as: 'users',
          attributes: ['full_name', 'user_id'],
        },
        {
          model: TrashProof,
          attributes: ['trash_proof_id', 'user_id', 'user_message'],
          include: [
            {
              model: Users,
              attributes: ['full_name'],
            },
            {
              model: ProofPictures,
              as: 'proof_pictures',
              attributes: ['image_path'],
            },
          ],
          where: {
            is_verified: 1,
          },
        },
      ],
    });

    // Check if trash not found
    if (!trash) {
      return h
        .response({
          status: 'fail',
          message: 'trash not found',
        })
        .code(404);
    }

    // Check if trash is deleted
    if (trash.is_deleted === 1) {
      return h.response({
        status: 'fail',
        message: 'trash is deleted',
      });
    }

    // Result if trash found
    let serverHostURL = `${process.env.SERVER_HOST}`;
    if (process.env.SERVER_HOST === 'localhost') {
      serverHostURL += `:${process.env.SERVER_PORT}`;
    }

    const results = {
      id: trash.trash_id,
      title: trash.title,
      finisher_message: trash.TrashProofs[0].user_message,
      city: trash.cities.name,
      address: trash.address,
      location_url: trash.location_url,
      finisher_id: trash.TrashProofs[0].user_id,
      finisher_name: trash.TrashProofs[0].User.full_name,
      pictures: trash.TrashProofs[0].proof_pictures.map(
        (picture) => `${serverHostURL}${picture.image_path}`,
      ),
    };

    return h
      .response({
        status: 'success',
        message: 'success GET detail',
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

module.exports = getFinishedTrashDetail;
