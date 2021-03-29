const cloudinary = require("cloudinary").v2;
const getConfigs = require("../config/getConfigs");

// cloudinary config
(async () => {
  const configs = await getConfigs();
  cloudinary.config({
    cloud_name:
      process.env.NODE_ENV === "production"
      ? configs.production.images.cloud_name
      : configs.development.images.cloud_name,
    api_key:
      process.env.NODE_ENV === "production"
        ? configs.production.images.api_key
        : configs.development.images.api_key,
    api_secret:
      process.env.NODE_ENV === "production"
        ? configs.production.images.api_secret
        : configs.development.images.api_secret,
  });
})();

// req.files.file.path
exports.cloudinaryUpload = async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
    folder: req.body.folder
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

exports.cloudinaryRemove = (req, res) => {
  const image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok, image removed");
  });
};