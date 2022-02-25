const Joi = require('joi');

function createItemSchema(req, res, next) {
  // define base schema rules
  const schemaRules = {
    label: Joi.string().required(),
  };

  // create schema object with rules
  const schema = Joi.object(schemaRules);

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}

module.exports = { createItemSchema };
