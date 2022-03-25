module.exports.nicerPermissions = function (permissionString) {
    return permissionString.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
  }