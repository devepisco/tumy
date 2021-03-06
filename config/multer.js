const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, "public/uploads/images/");
  },
  filename: function (request, file, callback) {
    const date = new Date().toDateString().split(" ").join("_");
    callback(null, date + file.originalname.split(" ").join("_"));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldsize: 1024 * 1024,
  },
});

const uploadServicePictures = upload.fields([
  {
    name: "paymentCaptures",
    maxCount: 3,
  },
  {
    name: "serviceCaptures",
    maxCount: 3,
  },
]);

const uploadCancelationPictures = upload.fields([
  {
    name: "cancelationCaptures",
    maxCount: 3,
  },
]);

const uploadProfilePicture = upload.fields([
  {
    name: "profilePicture",
    maxCount: 1,
  },
]);

module.exports = { 
  upload, 
  uploadServicePictures, 
  uploadCancelationPictures,
  uploadProfilePicture
 };

