const Joi = require('joi');
const getTrashDetail = require('../handler/getTrashDetail');
const getTrashList = require('../handler/getTrashList');
const postTrashHandler = require('../handler/postTrash');
const loginHandler = require('../handler/login');
const registerHandler = require('../handler/register');
const editTashById = require('../handler/putTrash');
const postTrashProofHandler = require('../handler/postTrashProof');

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
    path: '/trash/detail/{id}',
    handler: getTrashDetail,
  },
  {
    method: 'GET',
    path: '/trash',
    handler: getTrashList,
  },
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
  {
    method: 'POST',
    path: '/trash/detail/{id}',
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
  // Admin function
  {
    method: 'PUT',
    path: '/trash/edit/{id}',
    handler: editTashById,
  },
];

module.exports = routes;
