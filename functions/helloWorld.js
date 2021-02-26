exports.handler = async (event, context, callback) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      msg: "Hello Everyone Jai Ram Ji KI",
    }),
  };
};
