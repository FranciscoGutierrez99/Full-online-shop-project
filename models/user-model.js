const bcrypt = require('bcryptjs');
const mongodb = require('mongodb')

const db = require("../database/database");

class User {
  constructor(email,password,username,street,postalCode,city) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.address = {
      street:street,
      postalCode: postalCode,
      city:city
    }
  }

  async insertUser() {
    const hashedPassword = await bcrypt.hash(this.password,12);



    const result = await db.getDb().collection('users').insertOne({
      email:this.email,
      password:hashedPassword,
      name: this.username,
      address: this.address
    })

    return result
  }

  async getUser() {
    const result = await db.getDb().collection('users').findOne({email:this.email});

    return result
  }

  static async getUserById(id) {
    const userId = new mongodb.ObjectId(id);
    const user = await db.getDb().collection('users').findOne({_id:userId}, {projection:{password:0}});
    return user; 
  }

  async comparePassword(hashedPassword) {
    const result = await bcrypt.compare(this.password,hashedPassword);
    return result;
  }

}


module.exports = User;