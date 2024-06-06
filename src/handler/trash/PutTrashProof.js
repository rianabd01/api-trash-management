/* eslint-disable camelcase */
const { TrashProof } = require('../../associations');

const editTrashProofById = async (request, h) => {
  const { id } = request.params;
  const { feedback, is_verified } = request.payload;

  const trashProofItem = await TrashProof.findByPk(Number(id));

  console.log(trashProofItem);
  if (!trashProofItem) {
    h.response({
      status: 'fail',
      message: 'trash proof not found',
    }).code(404);
  }
  try {
    if (feedback !== undefined) {
      trashProofItem.feedback = feedback;
    }
    if (is_verified !== undefined) {
      trashProofItem.is_verified = is_verified;
    }

    await trashProofItem.save();

    return h
      .response({
        status: 'success',
        message: 'edit proof data success',
        data: trashProofItem,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: 'fail',
        message: 'something wrong fm',
        error: error.message,
      })
      .code(500);
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

module.exports = editTrashProofById;
