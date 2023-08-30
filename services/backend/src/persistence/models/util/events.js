const RestifyErrors = require('restify-errors');

/**
 * This function is supposed to be usedn with this event:
 * http://bookshelfjs.org/index.html#Model-event-saving
 */
const saving = (requiredFields, modelFields) => {
  const missing = requiredFields.filter((field) => !modelFields[field]);
  if (missing.length > 0) {
    throw new RestifyErrors.NotFoundError(
      `The following properties are missing a value: ${missing}`,
    );
  }
};

module.exports = { saving };
