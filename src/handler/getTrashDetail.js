// eslint-disable-next-line object-curly-newline
const {
  Trash,
  Pictures,
  Cities,
  Users,
  TrashProof,
} = require('../associations/index');

const getTrashDetail = async (request, h) => {
  const { id } = request.params;

  try {
    // Check if anyone has send proof
    const proofExists = await TrashProof.findOne({
      where: {
        trash_id: id,
      },
    });
    if (proofExists) {
      return h
        .response({
          status: 'fail',
          message: 'Trash is pending',
        })
        .code(403);
    }

    // Find trash by id
    const trash = await Trash.findByPk(id, {
      include: [
        {
          model: Pictures,
          as: 'pictures',
          attributes: ['image_path'],
        },
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

    const result = {
      id: trash.trash_id,
      title: trash.title,
      description: trash.description,
      city: trash.cities.name,
      address: trash.address,
      location_url: trash.location_url,
      uploader_id: trash.users.user_id === 3 ? 'Publik' : trash.users.user_id,
      uploader: trash.users.full_name,
      pictures: trash.pictures.map((picture) => picture.image_path),
      is_verified: trash.is_verified,
      is_deleted: trash.is_deleted,
    };

    return h
      .response({
        status: 'success',
        message: 'success GET detail',
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

module.exports = getTrashDetail;
