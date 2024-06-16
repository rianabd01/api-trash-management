const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const cron = require('node-cron');
const routes = require('./routes/routes');
const sequelize = require('./sequelize');
const cleanUpExpiredData = require('./cleanUpExpiredData');

const init = async () => {
  const server = Hapi.server({
    port: process.env.SERVER_PORT,
    host: '0.0.0.0', // Change to more specific IP if needed
  });

  await server.register(Inert);

  server.route(routes);

  await sequelize.sync();
  await server.start();

  // Clean up expired data every day at 2 AM
  cron.schedule('0 2 * * *', async () => {
    try {
      await cleanUpExpiredData();
      console.log('cleaning data is done.');
    } catch (error) {
      console.error('Failed cleaning data:', error);
    }
  });

  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
