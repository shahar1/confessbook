const Joi = require("Joi");
Joi.objectId = require("Joi-objectid")(Joi);

const messageScheme = Joi.object().keys({
  message: Joi.string()
    .min(10)
    .required()
});

const ConfessionScheme = Joi.object().keys({
  _id: Joi.objectId().required(),
  message: Joi.string()
    .min(10)
    .required(),
  archived: Joi.boolean().required(),
  updated_by: Joi.string().required(),
  create_date: Joi.date().required(),
  update_date: Joi.date(),
  serial: Joi.number().allow(null),
  __v: Joi.number(),
  comment: Joi.string().allow("")
});

module.exports = (req, res, next) => {
  if (req.method !== "GET" && req.method !== "DELETE" ) {
    Joi.validate(req.body, getScheme(req), err => {
      if (err) {
        res.status(400).send(err.details[0].message);
      } else {
        next();
      }
    });
  } else {
    next();
  }
};

function getScheme(req) {
  return (req.baseUrl === "/confessions" && req.method === 'POST') ? messageScheme : ConfessionScheme;
}