const userService = require('../services/user-service');
const multer = require('multer');

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + '-' + req.params.id + '-' + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImg = multer({ storage: storageConfig, fileFilter: fileFilter }).single('image');

module.exports = {
  async getUser(req, res) {
    try {
      const user = await userService.getUser(req.params.id);
      res.status(200).json(user);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  async updateUser(req, res) {
    try {
      const image = req.file;
      const data = req.body;

      if (image) {
        data.imgPath = image.path;
      }

      const user = await userService.updateUser(req.params.id, data);

      res.status(200).json(user);
    } catch (er) {
      console.log(er);
      return res.status(er.status || 500).json({ message: er.message });
    }
  },

  uploadImg,
};
