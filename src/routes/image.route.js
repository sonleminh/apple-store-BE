const { cloudinary } = require('../configs/cloudinary.config');

const imageRoute = require('express').Router();

imageRoute.post('/upload', async (req, res) => {
  try {
    const file = req.body.file;
    // const uploadedResponse = await cloudinary.uploader.upload(file, {
    //   upload_preset: 'apple_store',
    // });
    // console.log(uploadedResponse);
    console.log(file);

    res.json({ msg: 'ngu' });
  } catch (error) {
    console.log(req.body.file);
    res.status(500).json({ err: 'Something went wrong' });
  }
});

module.exports = imageRoute;
