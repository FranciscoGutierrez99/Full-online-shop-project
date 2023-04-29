const db = require("../database/database");
const mongodb = require('mongodb')


class Product {
  constructor(productData) {
    this.title = productData.title
    this.summary = productData.summary
    this.price = +productData.price
    this.description = productData.description
    this.image = productData.image; //Name of the image
    this.updateImage();
    if (productData._id) {
      this.id = productData._id.toString();
    }
  }

  

  async save() {
    const productData = {
      title:this.title,
      summary:this.summary,
      price:this.price,
      description:this.description,
      image:this.image,
      
    }

    if (this.id) { //If this is true means that we are saving for the first time 

      const productId = new mongodb.ObjectId(this.id);

      if (!this.image) { //En caso de que se actualice el producto pero no se introduzca una nueva imagen necesitamos borrar el undefined del productData por que sino se actualizaria en la base de datos y el valor seria undefined
        delete productData.image;
      }


      await db.getDb().collection('products').updateOne(
        {_id:productId},
        {
        $set: productData
        }
      );
    }else { //we are updating a product
      await db.getDb().collection('products').insertOne(productData)
    }
  }

  updateImage() {
    this.imagePath = `products-data/images/${this.image}`;
    this.imageUrl = `/products/assets/images/${this.image}`;
  }

  async replaceImage(newImage) {
    this.image = newImage;
    this.updateImage();
  }


  static async findAll() {
    const result = await db.getDb().collection('products').find().toArray();
    return result.map((productDocument) => {
      return new Product(productDocument);
    })

  }

  static async findOne(id) {
    let productId
    try {
      productId = new mongodb.ObjectId(id);
    }
    catch (error) {
      error.code = 404;
      throw error;
    }
   
    const result = await db.getDb().collection('products').findOne({_id:productId});
 
    if(!result) {
      const error = new Error('No se pudo encontrar el producto');
      throw error;
    }
    return result;
  }

  static async findOneById(id) {
    let productId
    try {
      productId = new mongodb.ObjectId(id);
    }
    catch (error) {
      error.code = 404;
      throw error;
    }
   
    const result = await db.getDb().collection('products').findOne({_id:productId});
 
    if(!result) {
      const error = new Error('No se pudo encontrar el producto');
      throw error;
    }
    return new Product(result);
  }

  static async remove(id){
    const productId = new mongodb.ObjectId(id)
    await db.getDb().collection('products').deleteOne({_id:productId});
  }

  static async findMultiple(ids) {
    const productIds = ids.map(function(id) {
      return new mongodb.ObjectId(id);
    })
    
    const products = await db
      .getDb()
      .collection('products')
      .find({ _id: { $in: productIds } })
      .toArray();
    return products.map(function (productDocument) {
      return new Product(productDocument);
    });
  }



}


module.exports = Product