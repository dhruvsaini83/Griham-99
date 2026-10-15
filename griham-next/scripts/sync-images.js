const mongoose = require('mongoose');
const { PRODUCTS } = require('../data/products');

(async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/griham99');
    const Product = mongoose.models.Product || mongoose.model('Product', new mongoose.Schema({ productId: Number, image: String, images: [String] }, { strict: false }));
    for (const p of PRODUCTS) {
      await Product.updateOne({ productId: p.id }, { $set: { image: p.image, images: [p.image] } });
    }
    console.log('MongoDB products synced with working images!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Sync error:', err);
  }
})();
