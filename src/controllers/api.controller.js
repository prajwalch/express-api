exports.v1 = (request, response) => {
  response.json([
    { success: true, data: { message: 'Hello World!', version: 1 } },
  ]);
};
