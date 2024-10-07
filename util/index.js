const Util = {};

Util.handleErrors = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

Util.invalidObjectId = (ID) =>{
    return !ObjectID.isValid(ID);
}

module.exports = Util;
