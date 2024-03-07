const Joi = require('joi');

module.exports.postSchema = new Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
    }).required(),
});