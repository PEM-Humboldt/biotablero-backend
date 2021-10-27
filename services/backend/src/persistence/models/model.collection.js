module.exports = (bookshelf, model) =>
  bookshelf.Collection.extend({
    model,
  });
