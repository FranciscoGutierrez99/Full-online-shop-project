const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);



function mongoSession() {
  return new MongoDBStore (
    {
      uri: 'mongodb://127.0.0.1:27017',
      databaseName: 'online-shop',
      collection: 'mySessions'
    }
  )
}

function sessionSettings(mongoSession) {
  return {
    secret: 'This is a secret',
    cookie: {
      sameSite:true,
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave: false,
    saveUninitialized: false,
    store: mongoSession()
  }
}

module.exports = {
  sessionSettings:sessionSettings,
  mongoSession:mongoSession
}