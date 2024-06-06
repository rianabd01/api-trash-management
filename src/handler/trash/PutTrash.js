/* eslint-disable camelcase */
const { Trash } = require('../../associations');

const editTrashById = async (request, h) => {
  const { id } = request.params;
  const { title, description, is_verified } = request.payload;

  const trashItem = await Trash.findByPk(id);

  if (!trashItem) {
    h.response({
      status: 'fail',
      message: 'trash not found',
    }).code(404);
  }
  try {
    if (title !== undefined) {
      trashItem.title = title;
    }
    if (description !== undefined) {
      trashItem.description = description;
    }
    if (is_verified !== undefined) {
      trashItem.is_verified = is_verified;
    }

    await trashItem.save();

    return h
      .response({
        status: 'success',
        message: 'edit data success',
        data: trashItem,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'something wrong',
        error: error.message,
      })
      .code(500); // Mengubah kode status menjadi 500 untuk error server
  }
  // try {
  //   trashItem.title = title;
  //   trashItem.description = description;
  //   trashItem.is_verified = is_verified;
  //   await trashItem.save();

  //   return h
  //     .response({
  //       status: 'success',
  //       message: 'edit data success',
  //       data: trashItem,
  //     })
  //     .code(200);
  // } catch (error) {
  //   return h
  //     .response({
  //       status: 'fail',
  //       message: 'something wrong',
  //       error: error.message,
  //     })
  //     .code(404);
  // }
};

module.exports = editTrashById;
