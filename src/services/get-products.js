import Product from '../models/Product';
import { dbConnect } from '../lib/database';
import Category from '../models/Category';

export default async function getProducts() {
    await dbConnect();

    const products = await Product.find().populate('category');
    console.log(products);

    return products.map(({ id, description, name, category, price, tags }) => {
        return {
            id,
            description,
            name,
            category: category.name,
            price,
            tags,
        };
    });
}
