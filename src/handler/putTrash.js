const { Trash } = require('../associations');

const editTashById = async (request, h) => {
  const { id } = request.params;
  const { title, description } = request.payload;

  const trashItem = await Trash.findByPk(id);

  if (!trashItem) {
    h.response({
      status: 'fail',
      message: 'trash not found',
    }).code(404);
  }

  try {
    trashItem.title = title;
    trashItem.description = description;
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
      .code(404);
  }
};

module.exports = editTashById;
