const multer = require('multer')
const uuid = require('uuid').v4

const upload = multer({
  storage: multer.diskStorage({
    destination: 'products-data/images',
    filename: (req,file,cb) => {
      cb(null, uuid() + '-' + file.originalname);
    }
  })
});

const configuredMiddleware =  upload.single('image')

module.exports = configuredMiddleware



