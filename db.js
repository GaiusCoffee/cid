var FirebaseProject = "ffrpg-helper",
    FirebaseURL = "https://" + FirebaseProject + ".firebaseio.com";
(function (db, fire, sha, undefined) {
  // User Authentication
  db.user = {};
  db.user.auth = function authF(email, password, callback){
    fire.authWithPassword({
      email: email,
      password: sha.hash(email + password)
    }, function(error, authData) {
      if (error) {
        console.log("Error authenticating user: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully authenticated. Details: ", authData);
        if(callback){callback(true, authData)};
      }
    });
  }
  db.user.register = function registerF(email, password, callback){
    fire.createUser({
      email: email,
      password: sha.hash(email + password)
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully created user account. Details: ", userData);
        if(callback){callback(true, userData)};
      }
    });
  }
  db.user.changeEmail = function changeEmailF(oldEmail, newEmail, password, callback){
    fire.changeEmail({
      oldEmail: oldEmail,
      newEmail: newEmail,
      password: sha.hash(oldEmail + password)
    }, function(error) {
      if (error) {
        console.log("Error changing email: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully changed.");
        if(callback){callback(true)};
      }
    });
  }
  db.user.changePassword = function changePasswordF(email, oldPassword, newPassword, callback){
    fire.changePassword({
      email: email,
      oldPassword: sha.hash(email + oldPassword),
      newPassword: sha.hash(email + newPassword)
    }, function(error) {
      if (error) {
        console.log("Error changing password: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully changed.");
        if(callback){callback(true)};
      }
    });
  }
  db.user.resetPassword = function resetPasswordF(email, callback){
    fire.resetPassword({
      email: email
    }, function(error) {
      if (error) {
        console.log("Error resetting password: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully sent password reset email.");
        if(callback){callback(true)};
      }
    });
  }
  db.user.removeUser = function removeUserF(email, password, callback){
    fire.removeUser({
      email: email,
      password: sha.hash(email + password)
    }, function(error) {
      if (error) {
        console.log("Error removing user: ", error);
        if(callback){callback(false, error)};
      } else {
        console.log("Successfully removed user.");
        if(callback){callback(true)};
      }
    });
  }
  // Data Storage
  db.store = {};
  db.store.set = function setF(key, value, callback){
    var fireKey = fire.child(key.replace('\\','/'));
    fireKey.update(value, function(error){
      if (error){
        console.log("Database update error. Details: ", error);
        callback(false, error);
      } else {
        console.log("Database update succeeded.");
        callback(true);
      }
    });
  }
  db.store.get = function getF(key, callback){
    var fireKey = fire.child(key.replace('\\','/'));
    fireKey.once("value", function(snapshot){
      console.log("Database retrieve success. Details: ", snapshot);
      callback(true, snapshot.val());
    },function(error){
      console.log("Database update error. Details: ", error);
      callback(false, error);
    });
  }
} (window.db = window.db || {}, new Firebase(FirebaseURL), Sha256));
