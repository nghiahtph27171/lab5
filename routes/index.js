const express = require('express');
const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const router = express.Router();

const carSchema = new Schema({
  maXe: String,
  mauXe: String,
  giaXe: Number
});

const Car = mongoose.model('Car', carSchema);

router.get('/', (req, res) => {
  res.render('index'); // Render file index.ejs trong thư mục views
});

router.post('/cars', (req, res) => {
  const { maXe, mauXe, giaXe } = req.body;

  const newCar = new Car({
    maXe: maXe,
    mauXe: mauXe,
    giaXe: giaXe
  });

  newCar.save()
      .then(() => res.redirect('/'))  // Sau khi lưu, quay lại trang nhập liệu
      .catch(err => res.status(400).send("Đã xảy ra lỗi: " + err));
});

router.get('/cars', (req, res) => {
  Car.find({})
      .then(cars => res.json(cars))
      .catch(err => res.status(500).send("Đã xảy ra lỗi: " + err));
});

module.exports = router;
