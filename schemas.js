const Joi = require('joi');

module.exports.postSchema = new Joi.object({
    post: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
    }).required(),
    deleteImages: Joi.array(),
});

module.exports.commentSchema = new Joi.object({
    comment: Joi.object({
        body: Joi.string().required(),
    }).required(),
});