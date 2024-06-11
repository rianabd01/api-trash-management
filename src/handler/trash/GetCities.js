const { Cities, Provinces } = require('../../associations');

const getCitiesHandler = async (request, h) => {
  try {
    const provinces = await Provinces.findAll({
      include: {
        model: Cities,
      },
    });

    const results = {};
    provinces.forEach((province) => {
      results[province.name] = province.Cities.map((city) => ({
        id: city.city_id,
        name: city.name,
      }));
    });

    return h
      .response({
        status: 'success',
        message: 'success GET cities',

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

module.exports = getCitiesHandler;
