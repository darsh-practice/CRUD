const Joi = require("joi");

const userValidatorSchema = Joi.object({
  name: Joi.string()
    .required(),
  age: Joi.number().max(99).min(1).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co", "gov"] },
    })
    .required(),
});

const addressValidatorSchema = Joi.object({
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.number().integer().min(100000).max(999999).required(),
  country: Joi.string().required(),
});

const userWithAddressValidatorSchema = Joi.object({
  user: userValidatorSchema.required(),
  address: addressValidatorSchema.required(),
});

module.exports = {
  userValidatorSchema,
  addressValidatorSchema,
  userWithAddressValidatorSchema,
};
