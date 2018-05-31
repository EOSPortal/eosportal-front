import * as ajv from "ajv";

const validator = ajv();
const schema = require("bp-info-standard/schema.json");

export const validateBpInfo = (bpInfo: any) =>
  validator.validate(schema, bpInfo) ? bpInfo : false;
