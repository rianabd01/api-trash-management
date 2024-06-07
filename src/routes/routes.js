const Joi = require('joi');
const getTrashDetail = require('../handler/trash/GetTrashDetail');
const getTrashList = require('../handler/trash/GetTrashList');
const postTrashHandler = require('../handler/trash/PostTrash');
const loginHandler = require('../handler/auth/LoginHandler');
const registerHandler = require('../handler/auth/RegisterHandler');
const postTrashProofHandler = require('../handler/trash/PostTrashProof');

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
    path: '/trash',
    handler: getTrashList,
  },
  {
    method: 'GET',
    path: '/trash/{id}',
    handler: getTrashDetail,
  },

  // Proof cleaned trash
  {
    method: 'POST',
    path: '/trash/proof/{id}',
    options: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        multipart: true,
      },
      handler: postTrashProofHandler,
    },
  },

  // User auth
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    options: {
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
];

module.exports = routes;
