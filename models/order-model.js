const db = require("../database/database");
const mongodb = require('mongodb')



class Order {
  //status = pending, fullfilled, cancelled 
  //date = 2023-04-24
  constructor(cart, userData, status = 'pending', date, orderId) {
    this.cart = cart;
    this.userData = userData;
    this.status = status;
    this.date = new Date(date);
    if (this.date) {
      this.formattedDate = this.date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    this.orderId = orderId
  }


  static transformOrderDocument(orderDoc) {
    return new Order(
      orderDoc.productData,
      orderDoc.userData,
      orderDoc.status,
      orderDoc.date,
      orderDoc._id
    );
  }

  static transformOrderDocuments(orderDocs) {
    return orderDocs.map(this.transformOrderDocument);
  }

  static async findAll() {
    const orders = await db
      .getDb()
      .collection('orders')
      .find()
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findAllForUser(userId) {
    const uid = new mongodb.ObjectId(userId);

    const orders = await db
      .getDb()
      .collection('orders')
      .find({ 'userData._id': uid })
      .sort({ _id: -1 })
      .toArray();

    return this.transformOrderDocuments(orders);
  }

  static async findById(orderId) {
    const order = await db
      .getDb()
      .collection('orders')
      .findOne({ _id: new mongodb.ObjectId(orderId) });

    return this.transformOrderDocument(order);
  }

  async save() {
    let orderDocument
    if (this.orderId) {
      const orderId = new mongodb.ObjectId(this.orderId);
      orderDocument = await db.getDb().collection('orders').updateOne({ _id: orderId }, { $set: { status: this.status } });
      return orderDocument;
    }
    else {
      orderDocument = {
        userData:this.userData,
        productData: this.cart,
        date: new Date(),
        status: this.status
      }
    }
    await db.getDb().collection('orders').insertOne(orderDocument);
  }
  
}


module.exports = Order