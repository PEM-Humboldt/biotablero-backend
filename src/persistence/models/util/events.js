/**
 * This function is supposed to be usedn with this event:
 * http://bookshelfjs.org/index.html#Model-event-saving
 */
const saving = (requiredFields, modelFields) => {
  const missing = requiredFields.filter(field => !modelFields[field]);
  if (missing.length > 0) {
    const error = new Error(`The following properties are missing a value: ${missing}`);
    error.code = 400;
    throw error;
  }
};

module.exports = { saving };
