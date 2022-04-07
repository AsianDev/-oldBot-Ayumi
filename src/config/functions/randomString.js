async function generateRandomString(length) {
    var characters =
      "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ()|/.@#!$%^&+><?;:~*";
    var Rstring = "";
    if (length > 0) {
      for (var i = 0; i < length; i++) {
        Rstring += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
    }
    return Rstring;
  }