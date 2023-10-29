const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const avjValidation = new Ajv({ allErrors: true });
const vertices = require('./refs/vertices.json');
avjValidation.addSchema(vertices,'vertices.json');
addFormats(avjValidation);

module.exports = avjValidation;
