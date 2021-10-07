// Create an object type UserException
function SettingException (message){
  this.message=message;
  this.name="SettingException";
}

// Make the exception convert to a pretty string when used as a string
// (e.g. by the error console)
SettingException.prototype.toString = function () {
  return this.name + ': "' + this.message + '"';
}
