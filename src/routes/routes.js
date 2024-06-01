const getTrashDetail = require('../handler/getTrashDetail');
const postTrashHandler = require('../handler/postTrash');

const routes = [
  {
    method: 'POST',
    path: '/trash',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: true,
      },
      handler: postTrashHandler,
    },
  },
  {
    method: 'GET',
    path: '/trash/{id}',
    handler: getTrashDetail,
  },
];

module.exports = routes;
