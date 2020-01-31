const Joi = require("@hapi/joi");

//Validation Register
const registerValidation = data => {
  const schema = Joi.object({
    full_name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required(),
    birthday: Joi.string().required(),
    phone_number: Joi.string().required(),
    country: Joi.string().required()
  });

  return schema.validate(data);
};

//Validation Login
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
