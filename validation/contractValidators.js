'use strict';

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0)
    error.push({ message: message });
}

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length < min)
    error.push({ message: message });
}

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length > max)
    error.push({ message: message });
}

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (!value || value.length != len)
    error.push({ message: message });
}

ValidationContract.prototype.isEmail = (value, message) => {
  let reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
  if (!reg.test(value))
    error.push({ message: message });
}

ValidationContract.prototype.errors = () => {
  return errors;
}

ValidationContract.prototype.clear = () => {
  errors = [];
}

ValidationContract.prototype.isValid = () => {
  return errors.length == 0;
}

module.exports = ValidationContract;