import mongoose from 'mongoose';
import Category from './Category';

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    tags: Array,
    price: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
});
const Product =
    mongoose.models?.Product ?? mongoose.model('Product', productSchema);

export default Product;
